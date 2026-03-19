import json

file_path = "./src/i18n/es.json"


def save_data(data):
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=2, ensure_ascii=False)
    print("\nCambios guardados.\n")


def show_frameworks(frameworks):
    if not frameworks:
        print("No hay frameworks registrados.")
        return

    print("\nListado de Frameworks:\n")

    for i, fw in enumerate(frameworks):
        print(
            f"{i + 1}. {fw['framework']} | "
            f"{fw['area']} | "
            f"{fw['language']} | "
            f"{fw['experience_time']}"
        )


def edit_framework(frameworks):
    try:
        index = int(input("\nIngrese el número a editar:\n> ")) - 1
    except ValueError:
        print("Entrada inválida.")
        return

    if not (0 <= index < len(frameworks)):
        print("Número inválido.")
        return

    fw = frameworks[index]

    print("\nDeje vacío para mantener el valor actual.\n")

    for key, value in fw.items():
        print(f"{key} actual: {value}")
        new_value = input(f"Nuevo {key}:\n> ")
        if new_value:
            fw[key] = new_value

    print("\nFramework actualizado.\n")


def delete_framework(frameworks):
    try:
        index = int(input("\nIngrese el número a eliminar:\n> ")) - 1
    except ValueError:
        print("Entrada inválida.")
        return

    if not (0 <= index < len(frameworks)):
        print("Número inválido.")
        return

    confirm = input(
        f"¿Seguro que deseas eliminar {frameworks[index]['framework']}? (s/n):\n> "
    )

    if confirm.lower() == "s":
        deleted = frameworks.pop(index)
        print(f"\nEliminado: {deleted['framework']}\n")
    else:
        print("Cancelado.\n")


# ---- MAIN ----

with open(file_path, "r", encoding="utf-8") as file:
    data = json.load(file)

frameworks = data["body"]["ranger"]["projects"][0]["about_frameworks"]

while True:
    show_frameworks(frameworks)

    print("\nOpciones:")
    print("1. Editar")
    print("2. Eliminar")
    print("3. Salir")

    option = input("\nSeleccione una opción:\n> ")

    if option == "1":
        edit_framework(frameworks)
        save_data(data)

    elif option == "2":
        delete_framework(frameworks)
        save_data(data)

    elif option == "3":
        print("Saliendo...")
        break

    else:
        print("Opción no válida.\n")
