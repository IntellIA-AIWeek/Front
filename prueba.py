import numpy as np
import joblib
from huggingface_hub import hf_hub_download

# Cargar el modelo
model = joblib.load(
    hf_hub_download("AWeirdDev/human-disease-prediction", "sklearn_model.joblib")
)

# Generar un array aleatorio (1,132)
x = np.random.rand(132)
x = np.expand_dims(x, axis=0)

# Obtener probabilidades
probs = model.predict_proba(x)[0]  # [0] porque es un solo ejemplo

# Obtener los índices de las top 5 probabilidades
top5_idx = np.argsort(probs)[-5:][::-1]  # orden descendente

# Mostrar Top-5 clases con sus probabilidades
print("Top 5 predictions:")
for i in top5_idx:
    print(f"Clase {model.classes_[i]}: {probs[i]:.4f}")
