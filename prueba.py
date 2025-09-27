# rprueba.py
from transformers import AutoTokenizer, AutoModelForCausalLM, TextStreamer
import torch

def main():
    model_name = "alpha-ai/Medical-Diagnosis-COT-Gemma3-270M"

    print("⏳ Cargando tokenizer y modelo...")
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        device_map="auto",
        torch_dtype=torch.float32
    )
    print("✅ Modelo cargado correctamente.\n")

    # 📝 Mensaje de prueba (puedes cambiarlo)
    messages = [
        {"role": "user", "content": "I have a headache and a fever. What could be the diagnosis?"}
    ]

    # ✍️ Convertimos el chat en tokens
    inputs = tokenizer.apply_chat_template(
        messages,
        add_generation_prompt=True,
        tokenize=True,
        return_dict=True,
        return_tensors="pt",
    ).to(model.device)

    # 🪄 Mostrar el prompt real que se envía al modelo
    print("=== 📜 PROMPT REAL ENVIADO AL MODELO ===")
    print(tokenizer.decode(inputs["input_ids"][0]))
    print("========================================\n")

    # 🧠 Streamer para ver la generación token por token
    streamer = TextStreamer(tokenizer, skip_prompt=True, skip_special_tokens=True)

    print("🤖 Generando respuesta paso a paso...\n")
    outputs = model.generate(
        **inputs,
        max_new_tokens=150,
        temperature=0.4,   # 🔥 más bajo = más coherente
        top_p=0.9,
        streamer=streamer
    )

    # 📝 Decodificar la respuesta final
    generated_text = tokenizer.decode(
        outputs[0][inputs["input_ids"].shape[-1]:],
        skip_special_tokens=True
    )

    print("\n=== ✅ RESPUESTA FINAL DEL MODELO ===")
    print(generated_text)
    print("=====================================")


if __name__ == "__main__":
    main()
