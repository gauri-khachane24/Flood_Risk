"""
ml/model.py
-----------
Person 3 - Machine Learning Developer

Inference module that loads the trained best model artifact (best_model.pkl)
and provides a clean, standardized prediction function: predict_flood(inputs: dict).

Risk Thresholds Rationale based on FloodProbability Quartiles:
-------------------------------------------------------------
The empirical distribution of target 'FloodProbability' across 50,000 samples has:
  - 25th Percentile (Q1)     : 0.465  (46.50%)
  - 50th Percentile (Median) : 0.500  (50.00%)
  - 75th Percentile (Q3)     : 0.535  (53.50%)

We establish the three-tier flood risk classification based on these quartiles:
  - "LOW" Risk: FloodProbability < 46.5% (< Q1)
    Conditions are safer than 75% of recorded scenarios.
  - "MEDIUM" Risk: 46.5% <= FloodProbability < 53.5% ([Q1, Q3))
    Moderate risk falling within the central 50% interquartile range.
  - "HIGH" Risk: FloodProbability >= 53.5% (>= Q3)
    Elevated or critical flood danger exceeding the 75th percentile of observed events.
"""

import os
import json
import joblib
import pandas as pd
from typing import Dict, Any, Union

_MODEL_DIR = os.path.dirname(os.path.abspath(__file__))
_MODEL_PATH = os.path.join(_MODEL_DIR, "best_model.pkl")
_RESULTS_PATH = os.path.join(_MODEL_DIR, "model_results.json")

# Default 20 features in canonical dataset order
DEFAULT_FEATURES = [
    "MonsoonIntensity",
    "TopographyDrainage",
    "RiverManagement",
    "Deforestation",
    "Urbanization",
    "ClimateChange",
    "DamsQuality",
    "Siltation",
    "AgriculturalPractices",
    "Encroachments",
    "IneffectiveDisasterPreparedness",
    "DrainageSystems",
    "CoastalVulnerability",
    "Landslides",
    "Watersheds",
    "DeterioratingInfrastructure",
    "PopulationScore",
    "WetlandLoss",
    "InadequatePlanning",
    "PoliticalFactors"
]

# Quartile-derived risk thresholds (in percentage terms)
THRESHOLD_LOW_UPPER = 46.50   # 25th percentile (Q1)
THRESHOLD_HIGH_LOWER = 53.50  # 75th percentile (Q3)

_model = None
_ordered_features = None


def _load_artifacts():
    """Lazy loader for model artifact and metadata."""
    global _model, _ordered_features

    if _model is None:
        if not os.path.exists(_MODEL_PATH):
            raise FileNotFoundError(
                f"Model artifact not found at '{_MODEL_PATH}'. "
                "Please run `python ml/train_model.py` first to train and persist the best model."
            )
        _model = joblib.load(_MODEL_PATH)

    if _ordered_features is None:
        if os.path.exists(_RESULTS_PATH):
            try:
                with open(_RESULTS_PATH, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    _ordered_features = data.get("ordered_features", DEFAULT_FEATURES)
            except Exception:
                _ordered_features = DEFAULT_FEATURES
        else:
            _ordered_features = DEFAULT_FEATURES

    return _model, _ordered_features


def predict_flood(inputs: Dict[str, Union[int, float]]) -> Dict[str, Any]:
    """
    Predict flood probability and categorical risk classification.

    Parameters:
    -----------
    inputs : dict
        Dictionary of feature names and numeric values. Example:
        {
            "MonsoonIntensity": 7.0,
            "TopographyDrainage": 8.0,
            "RiverManagement": 5.0,
            ...
        }

    Returns:
    --------
    dict
        {
            "probability": float (percent, e.g. 54.2),
            "risk": str ("LOW", "MEDIUM", or "HIGH")
        }
    """
    model, feature_names = _load_artifacts()

    # Case-insensitive mapping for user-provided input keys
    normalized_inputs = {str(k).strip().lower(): float(v) for k, v in inputs.items()}

    # Construct input vector in the exact order expected by the model
    row_values = []
    for feature in feature_names:
        key_lower = feature.lower()
        if key_lower in normalized_inputs:
            row_values.append(normalized_inputs[key_lower])
        else:
            # Fall back to typical median value (5.0) if a feature is missing
            row_values.append(5.0)

    # Use a DataFrame with feature names to ensure compatibility with sklearn models
    X_input = pd.DataFrame([row_values], columns=feature_names)

    # Model inference
    raw_pred = float(model.predict(X_input)[0])

    # Convert to percent and clamp between 0.0% and 100.0%
    probability_pct = round(max(0.0, min(100.0, raw_pred * 100.0)), 2)

    # Assign risk tier based on FloodProbability quartiles:
    # LOW: < 46.50% (Q1)
    # MEDIUM: 46.50% <= prob < 53.50% (Q1 to Q3)
    # HIGH: >= 53.50% (Q3)
    if probability_pct < THRESHOLD_LOW_UPPER:
        risk_level = "LOW"
    elif probability_pct >= THRESHOLD_HIGH_LOWER:
        risk_level = "HIGH"
    else:
        risk_level = "MEDIUM"

    return {
        "probability": probability_pct,
        "risk": risk_level
    }


if __name__ == "__main__":
    print("Testing ml/model.py inference...")
    sample_low = {feat: 2.0 for feat in DEFAULT_FEATURES}
    sample_avg = {feat: 5.0 for feat in DEFAULT_FEATURES}
    sample_high = {feat: 9.0 for feat in DEFAULT_FEATURES}

    res_low = predict_flood(sample_low)
    res_avg = predict_flood(sample_avg)
    res_high = predict_flood(sample_high)

    print(f"Low input sample  -> {res_low}")
    print(f"Avg input sample  -> {res_avg}")
    print(f"High input sample -> {res_high}")
