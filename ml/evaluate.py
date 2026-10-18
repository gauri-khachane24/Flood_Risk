"""
ml/evaluate.py
--------------
Person 3 - Machine Learning Developer

Evaluation script that loads the persisted best model and generates
diagnostic evaluation visualizations saved into graphs/:
1. graphs/actual_vs_predicted.png
2. graphs/residuals_plot.png
3. graphs/feature_importance.png
"""

import os
import json
import joblib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error


def get_paths():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(current_dir, ".."))

    primary_data = os.path.join(project_root, "data", "flood.csv")
    fallback_data = os.path.join(project_root, "data", "cleaned_flood_data.csv")
    data_path = primary_data if os.path.exists(primary_data) else fallback_data

    model_path = os.path.join(current_dir, "best_model.pkl")
    results_path = os.path.join(current_dir, "model_results.json")
    graphs_dir = os.path.join(project_root, "graphs")
    os.makedirs(graphs_dir, exist_ok=True)

    return data_path, model_path, results_path, graphs_dir


def evaluate_and_plot():
    data_path, model_path, results_path, graphs_dir = get_paths()

    if not os.path.exists(model_path):
        raise FileNotFoundError(
            f"Trained model not found at '{model_path}'. Please run ml/train_model.py first."
        )

    print(f"[1/4] Loading dataset from: {data_path}")
    df = pd.read_csv(data_path)
    X = df.drop(columns=["FloodProbability"])
    y = df["FloodProbability"]

    print("[2/4] Loading best model artifact...")
    model = joblib.load(model_path)

    best_model_name = "Best Model"
    if os.path.exists(results_path):
        with open(results_path, "r", encoding="utf-8") as f:
            metadata = json.load(f)
            best_model_name = metadata.get("best_model_name", "Best Model")

    # 80/20 train/test split matching training configuration
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42
    )

    y_pred = model.predict(X_test)
    residuals = y_test - y_pred

    r2 = r2_score(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    mae = mean_absolute_error(y_test, y_pred)

    print(f"      Evaluation Metrics on Test Set:")
    print(f"      - R2 Score : {r2:.5f}")
    print(f"      - RMSE     : {rmse:.5f}")
    print(f"      - MAE      : {mae:.5f}")

    # Set aesthetic style
    sns.set_theme(style="whitegrid", font="sans-serif")
    palette = sns.color_palette("mako")

    # ----------------------------------------------------
    # Plot 1: Actual vs Predicted
    # ----------------------------------------------------
    print("\n[3/4] Generating evaluation plots...")
    fig, ax = plt.subplots(figsize=(8, 6), dpi=300)

    # Subsample points for crisp, non-overplotted rendering if large
    if len(y_test) > 2500:
        sample_indices = np.random.RandomState(42).choice(len(y_test), size=2500, replace=False)
        y_test_plot = y_test.iloc[sample_indices]
        y_pred_plot = y_pred[sample_indices]
    else:
        y_test_plot = y_test
        y_pred_plot = y_pred

    ax.scatter(
        y_test_plot,
        y_pred_plot,
        color="#1f77b4",
        alpha=0.35,
        edgecolors="none",
        s=25,
        label="Test Data Points"
    )

    # Ideal identity line (y = x)
    min_val = min(y_test.min(), y_pred.min()) - 0.02
    max_val = max(y_test.max(), y_pred.max()) + 0.02
    ax.plot([min_val, max_val], [min_val, max_val], color="#e74c3c", linestyle="--", linewidth=2, label="Ideal Fit (y = x)")

    metrics_text = f"$R^2$ = {r2:.4f}\nRMSE = {rmse:.4f}\nMAE = {mae:.4f}"
    ax.text(
        0.05, 0.92,
        metrics_text,
        transform=ax.transAxes,
        fontsize=11,
        verticalalignment="top",
        bbox=dict(boxstyle="round,pad=0.5", facecolor="#ffffff", edgecolor="#cccccc", alpha=0.9)
    )

    ax.set_title(f"Actual vs. Predicted Flood Probability ({best_model_name})", fontsize=13, fontweight="bold", pad=12)
    ax.set_xlabel("Actual Flood Probability", fontsize=11)
    ax.set_ylabel("Predicted Flood Probability", fontsize=11)
    ax.set_xlim(min_val, max_val)
    ax.set_ylim(min_val, max_val)
    ax.legend(loc="lower right", frameon=True)
    plt.tight_layout()

    actual_pred_path = os.path.join(graphs_dir, "actual_vs_predicted.png")
    plt.savefig(actual_pred_path, dpi=300)
    plt.close()
    print(f"      Saved: {actual_pred_path}")

    # ----------------------------------------------------
    # Plot 2: Residuals Plot (Scatter + Histogram)
    # ----------------------------------------------------
    fig, (ax_res, ax_hist) = plt.subplots(1, 2, figsize=(14, 5.5), dpi=300, gridspec_kw={"width_ratios": [2, 1]})

    ax_res.scatter(
        y_pred_plot,
        residuals.iloc[sample_indices] if len(y_test) > 2500 else residuals,
        color="#2ecc71",
        alpha=0.35,
        edgecolors="none",
        s=25
    )
    ax_res.axhline(0, color="#e74c3c", linestyle="--", linewidth=2, label="Zero Error Line")
    ax_res.set_title("Residuals vs. Predicted Values", fontsize=12, fontweight="bold")
    ax_res.set_xlabel("Predicted Flood Probability", fontsize=11)
    ax_res.set_ylabel("Residuals (Actual - Predicted)", fontsize=11)
    ax_res.legend(loc="upper right")

    sns.histplot(residuals, bins=35, kde=True, color="#3498db", ax=ax_hist)
    ax_hist.axvline(0, color="#e74c3c", linestyle="--", linewidth=1.5)
    ax_hist.set_title("Residuals Distribution", fontsize=12, fontweight="bold")
    ax_hist.set_xlabel("Residual Error", fontsize=11)
    ax_hist.set_ylabel("Frequency", fontsize=11)

    fig.suptitle(f"Residual Analysis ({best_model_name})", fontsize=14, fontweight="bold", y=1.02)
    plt.tight_layout()

    residuals_path = os.path.join(graphs_dir, "residuals_plot.png")
    plt.savefig(residuals_path, dpi=300)
    plt.close()
    print(f"      Saved: {residuals_path}")

    # ----------------------------------------------------
    # Plot 3: Feature Importance / Coefficients
    # ----------------------------------------------------
    fig, ax_feat = plt.subplots(figsize=(10, 7), dpi=300)

    if hasattr(model, "coef_"):
        importances = model.coef_
        metric_label = "Regression Coefficient"
        plot_title = f"Feature Coefficients ({best_model_name})"
    elif hasattr(model, "feature_importances_"):
        importances = model.feature_importances_
        metric_label = "Feature Importance"
        plot_title = f"Feature Importance ({best_model_name})"
    else:
        importances = np.ones(X.shape[1])
        metric_label = "Weight"
        plot_title = "Feature Weights"

    feat_df = pd.DataFrame({
        "Feature": X.columns,
        "Importance": importances
    }).sort_values(by="Importance", ascending=True)

    colors = sns.color_palette("Blues_r", len(feat_df))
    bars = ax_feat.barh(feat_df["Feature"], feat_df["Importance"], color=colors, edgecolor="#2980b9", height=0.7)

    # Label values on bars
    for bar in bars:
        width = bar.get_width()
        x_pos = width + (0.0005 if width >= 0 else -0.003)
        ax_feat.text(
            x_pos,
            bar.get_y() + bar.get_height() / 2,
            f"{width:.4f}",
            va="center",
            ha="left" if width >= 0 else "right",
            fontsize=9
        )

    ax_feat.set_title(plot_title, fontsize=13, fontweight="bold", pad=12)
    ax_feat.set_xlabel(metric_label, fontsize=11)
    ax_feat.set_ylabel("Feature", fontsize=11)
    plt.tight_layout()

    feat_path = os.path.join(graphs_dir, "feature_importance.png")
    plt.savefig(feat_path, dpi=300)
    plt.close()
    print(f"      Saved: {feat_path}")

    print("\n[4/4] All 3 evaluation graphs generated successfully!")


if __name__ == "__main__":
    evaluate_and_plot()
