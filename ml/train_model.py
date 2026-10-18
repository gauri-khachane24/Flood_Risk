"""
ml/train_model.py
-----------------
Person 3 - Machine Learning Developer

Workflow:
1. Load dataset from data/flood.csv (20 features + FloodProbability target).
2. 80/20 train/test split with random_state=42.
3. Train Linear Regression, Random Forest Regressor, and Gradient Boosting Regressor.
4. Compute MAE, RMSE, and R2 on the test set, plus 5-fold Cross-Validation R2 on the training set.
5. Identify the best model based on R2 and persist it to ml/best_model.pkl with joblib.
6. Save comprehensive evaluation metrics, ordered feature list, and target quantiles
   to ml/model_results.json.
"""

import os
import json
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, KFold, cross_val_score
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


def get_dataset_path() -> str:
    """Locate data/flood.csv with fallback to data/cleaned_flood_data.csv."""
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(current_dir, ".."))

    primary_path = os.path.join(project_root, "data", "flood.csv")
    if os.path.exists(primary_path):
        return primary_path

    fallback_path = os.path.join(project_root, "data", "cleaned_flood_data.csv")
    if os.path.exists(fallback_path):
        return fallback_path

    raise FileNotFoundError(
        f"Could not find dataset at {primary_path} or {fallback_path}"
    )


def train_and_evaluate():
    data_path = get_dataset_path()
    print(f"[1/5] Loading dataset from: {data_path}")
    df = pd.read_csv(data_path)

    target_col = "FloodProbability"
    if target_col not in df.columns:
        raise ValueError(f"Target column '{target_col}' not found in dataset columns: {df.columns.tolist()}")

    X = df.drop(columns=[target_col])
    y = df[target_col]
    feature_names = list(X.columns)

    print(f"      Loaded {X.shape[0]} samples with {X.shape[1]} features.")

    # Calculate target distribution quartiles
    quantiles = {
        "25%": float(round(y.quantile(0.25), 4)),
        "50%": float(round(y.quantile(0.50), 4)),
        "75%": float(round(y.quantile(0.75), 4)),
        "min": float(round(y.min(), 4)),
        "max": float(round(y.max(), 4))
    }
    print(f"      Target Quantiles -> Q1 (25%): {quantiles['25%']}, Median (50%): {quantiles['50%']}, Q3 (75%): {quantiles['75%']}")

    # 80/20 train/test split with random_state=42
    print("[2/5] Performing 80/20 Train/Test split (random_state=42)...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42
    )
    print(f"      Train samples: {len(X_train)}, Test samples: {len(X_test)}")

    # Candidate models
    models = {
        "Linear Regression": LinearRegression(),
        "Random Forest": RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1),
        "Gradient Boosting": GradientBoostingRegressor(n_estimators=100, random_state=42)
    }

    results = {}
    fitted_models = {}
    cv = KFold(n_splits=5, shuffle=True, random_state=42)

    print("\n[3/5] Training candidate models and computing 5-fold CV & Test metrics...")
    for name, model in models.items():
        print(f"      --> Training and evaluating '{name}'...")
        # 5-fold cross-validation R2 on training set
        cv_scores = cross_val_score(model, X_train, y_train, cv=cv, scoring="r2", n_jobs=-1)
        cv_mean = float(cv_scores.mean())
        cv_std = float(cv_scores.std())

        # Fit on entire training set
        model.fit(X_train, y_train)
        fitted_models[name] = model

        # Predict on test set
        y_pred = model.predict(X_test)

        mae = float(mean_absolute_error(y_test, y_pred))
        rmse = float(np.sqrt(mean_squared_error(y_test, y_pred)))
        r2 = float(r2_score(y_test, y_pred))

        results[name] = {
            "MAE": round(mae, 6),
            "RMSE": round(rmse, 6),
            "R2": round(r2, 6),
            "CV_R2_5fold_mean": round(cv_mean, 6),
            "CV_R2_5fold_std": round(cv_std, 6)
        }
        print(f"          Test R2: {r2:.5f} | Test RMSE: {rmse:.5f} | Test MAE: {mae:.5f} | 5-Fold CV R2: {cv_mean:.5f} (+/- {cv_std:.5f})")

    # Pick the best model by test R2
    best_model_name = max(results, key=lambda k: results[k]["R2"])
    best_model = fitted_models[best_model_name]
    print(f"\n[4/5] Best Model selected: '{best_model_name}' (Test R2: {results[best_model_name]['R2']:.5f})")

    # Persist best model to ml/best_model.pkl
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_pkl_path = os.path.join(current_dir, "best_model.pkl")
    joblib.dump(best_model, model_pkl_path)
    print(f"      Persisted best model artifact to: {model_pkl_path}")

    # Prepare model_results.json
    results_payload = {
        "best_model_name": best_model_name,
        "ordered_features": feature_names,
        "metrics": results,
        "quantiles": quantiles
    }

    results_json_path = os.path.join(current_dir, "model_results.json")
    with open(results_json_path, "w", encoding="utf-8") as f:
        json.dump(results_payload, f, indent=4)
    print(f"      Saved metrics and metadata to: {results_json_path}")

    # Display comparison table
    print("\n" + "=" * 80)
    print("                     MODEL PERFORMANCE COMPARISON TABLE")
    print("=" * 80)
    header = f"{'Model':<22} | {'Test MAE':<10} | {'Test RMSE':<10} | {'Test R2':<10} | {'5-Fold CV R2':<16}"
    print(header)
    print("-" * 80)
    for name, m in results.items():
        cv_str = f"{m['CV_R2_5fold_mean']:.5f} +/- {m['CV_R2_5fold_std']:.4f}"
        print(f"{name:<22} | {m['MAE']:<10.5f} | {m['RMSE']:<10.5f} | {m['R2']:<10.5f} | {cv_str:<16}")
    print("=" * 80)
    print(f"WINNER: {best_model_name} with highest R2 score of {results[best_model_name]['R2']:.5f}")
    print("=" * 80 + "\n")

    return results_payload


if __name__ == "__main__":
    train_and_evaluate()
