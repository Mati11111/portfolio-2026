import json

file_path = "./src/i18n/es.json"


def delete_section(items):
    if not items:
        print("No hay elementos para eliminar.")
        return

    print("\nListado:\n")

    for i, item in enumerate(items):
        title = item.get("company_name", item.get("title", "-"))
        role = item.get("role", "")
        print(f"{i + 1}. {title} {('- ' + role) if role else ''}")

    try:
        index = int(input("\nIngrese el número a eliminar:\n> ")) - 1
    except ValueError:
        print("Entrada inválida.")
        return

    if not (0 <= index < len(items)):
        print("Número inválido.")
        return

    confirm = input("¿Seguro que deseas eliminarlo? (s/n):\n> ")

    if confirm.lower() == "s":
        deleted = items.pop(index)
        print(f"\nEliminado: {deleted.get('company_name', '-')}")
    else:
        print("Cancelado.")


def create_section(items, section_type):
    print("\nCreando nueva sección...\n")

    new_item = {}

    if section_type == "jobs":
        new_item = {
            "text": ".txt",
            "company_name": input("Empresa:\n> "),
            "role": input("Rol:\n> "),
            "description": input("Descripción (máx 200 caracteres):\n> ")[:200],
            "date": input("Fecha (ej: Ene 2025 – Mar 2025):\n> "),
            "duration": input("Duración (ej: 3 meses):\n> "),
            "frameworks": [],
        }

    elif section_type == "careers":
        new_item = {
            "text": ".txt",
            "company_name": input("Institución:\n> "),
            "role": input("Título:\n> "),
            "description": input("Descripción:\n> "),
            "date": input("Fecha:\n> "),
            "duration": input("Duración:\n> "),
            "frameworks": [],
        }

    elif section_type == "projects":
        new_item = {
            "text": ".txt",
            "company_name": input("Nombre del proyecto:\n> "),
            "description": input("Descripción:\n> "),
            "status": input("Estado (Ej: Finalizado):\n> "),
            "frameworks": [],
        }

    fw_input = input("Frameworks (separados por comas, opcional):\n> ")
    if fw_input:
        frameworks_list = [x.strip() for x in fw_input.split(",")]
        new_item["frameworks"] = frameworks_list

        about_frameworks = data["body"]["ranger"]["projects"][0]["about_frameworks"]
        existing = {fw["framework"] for fw in about_frameworks}

        for fw_name in frameworks_list:
            if fw_name not in existing:
                about_frameworks.append(
                    {
                        "framework": fw_name,
                        "area": "-",
                        "language": "-",
                        "experience_time": "-",
                    }
                )

    items.append(new_item)
    print("\nSección creada correctamente.\n")


def save_data(data):
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=2, ensure_ascii=False)
    print("\nGuardado\n")


def edit_section(items, section_type):
    if not items:
        print("Sin cambios.")
        return

    for i, item in enumerate(items, start=1):
        title = item.get("company_name", item.get("title", "-"))
        role = item.get("role", "")
        print(f"{i}. {title} {('- ' + role) if role else ''}")

    edit_option = input("\nEditar (s) / Nueva (n) / Borrar (b):\n> ")

    match edit_option.lower():
        case "s":
            try:
                index = int(input("\nEditar número:\n> ")) - 1
            except ValueError:
                print("Número inválido.")
                return
            if not (0 <= index < len(items)):
                print("Número no válido.")
                return
            item = items[index]
            print("\nDeje vacío para mantener el valor actual.\n")

            for key, value in item.items():
                if key in ["framework-headers", "about_frameworks", "text"]:
                    continue
                if key == "frameworks":
                    print(f"\n{key}:")
                    print(", ".join(value) if value else "-")
                    new_list = input("\nNuevo valor (separado por comas):\n> ")
                    if new_list:
                        frameworks_list = [x.strip() for x in new_list.split(",")]
                        item[key] = frameworks_list
                        about_frameworks = data["body"]["ranger"]["projects"][0][
                            "about_frameworks"
                        ]
                        existing = {fw["framework"] for fw in about_frameworks}
                        for fw_name in frameworks_list:
                            if fw_name not in existing:
                                about_frameworks.append(
                                    {
                                        "framework": fw_name,
                                        "area": "-",
                                        "language": "-",
                                        "experience_time": "-",
                                    }
                                )
                else:
                    print(f"\n{key} actual:")
                    print(value)
                    if key == "description":
                        while True:
                            new_value = input(
                                "\nNuevo valor (máximo 500 caracteres):\n> "
                            )
                            if not new_value:
                                break
                            if len(new_value) <= 500:
                                print(f"Caracteres usados: {len(new_value)}/500")
                                item[key] = new_value
                                break
                            else:
                                print(
                                    f"({len(new_value)}/500) caracteres. Intenta nuevamente.\n"
                                )
                    else:
                        new_value = input("\nNuevo valor:\n> ")
                        if new_value:
                            item[key] = new_value

        case "n":
            create_section(items, section_type)
        case "b":
            delete_section(items)
        case _:
            print("Opción no válida.")

    save_data(data)


with open(file_path, "r", encoding="utf-8") as file:
    data = json.load(file)

print("Opciones disponibles:")

for i, option in enumerate(data["body"]["ranger"]["options"], start=1):
    print(f"{i}. {option}")

option = input("\nIngrese una opción:\n> ")

match option:
    case "1":
        print("\nExperiencias laborales")
        edit_section(data["body"]["ranger"]["job_experiences"], "jobs")

    case "2":
        print("\nFormación")
        edit_section(data["body"]["ranger"]["careers"], "careers")

    case "3":
        print("\nProyectos personales")
        edit_section(data["body"]["ranger"]["projects"], "projects")

    case _:
        print("Opción no válida")
