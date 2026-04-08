import json
import os

from deep_translator import GoogleTranslator

INPUT_FILE = "./src/i18n/es.json"
OUTPUT_FILE = "./src/i18n/en.json"

translator = GoogleTranslator(source="auto", target="en")


def translate_text(text):
    try:
        return translator.translate(text)
    except:
        return text


def translate_obj(obj, parent_key=None):
    if isinstance(obj, dict):
        new_obj = {}
        for k, v in obj.items():
            if k == "company_name":
                new_obj[k] = v
            else:
                new_obj[k] = translate_obj(v, k)
        return new_obj

    elif isinstance(obj, list):
        return [translate_obj(v, parent_key) for v in obj]

    elif isinstance(obj, str):
        if parent_key == "company_name":
            return obj
        return translate_text(obj)

    else:
        return obj


def main():
    if not os.path.exists(INPUT_FILE):
        print(f"No se encontró {INPUT_FILE}")
        return

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    translated = translate_obj(data)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(translated, f, ensure_ascii=False, indent=2)

    print(f"File translated {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
