import json

file_path = "./src/i18n/es.json"


def delete_section(items):
    if not items:
        print("No elements to delete.")
        return

    print("\nList:\n")

    for i, item in enumerate(items):
        title = item.get("company_name", item.get("title", "-"))
        role = item.get("role", "")
        print(f"{i + 1}. {title} {('- ' + role) if role else ''}")

    try:
        index = int(input("\nEnter the number to delete:\n> ")) - 1
    except ValueError:
        print("Invalid input.")
        return

    if not (0 <= index < len(items)):
        print("Invalid number.")
        return

    confirm = input("Delete? (s/n):\n> ")

    if confirm.lower() == "s":
        deleted = items.pop(index)
        print(f"\nDeleted: {deleted.get('company_name', '-')}")
    else:
        print("Canceled.")


def create_section(items, section_type):

    new_item = {}

    if section_type == "jobs":
        new_item = {
            "text": ".txt",
            "company_name": input("Company:\n> "),
            "role": input("Role:\n> "),
            "description": input("Description (max 200 chars):\n> ")[:200],
            "date": input("Date (e.g. Ene 2025 – Mar 2025):\n> "),
            "duration": input("Duration (e.g. 3 months):\n> "),
            "frameworks": [],
        }

    elif section_type == "careers":
        new_item = {
            "text": ".txt",
            "company_name": input("Institution:\n> "),
            "role": input("Title:\n> "),
            "description": input("Description:\n> "),
            "date": input("Date:\n> "),
            "duration": input("Duration:\n> "),
            "frameworks": [],
        }

    elif section_type == "projects":
        new_item = {
            "text": ".txt",
            "company_name": input("Project name:\n> "),
            "description": input("Description:\n> "),
            "status": input("Status (e.g. Finished):\n> "),
            "frameworks": [],
        }

    fw_input = input("Frameworks (separated by commas, optional):\n> ")
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
    print("\nSection created successfully.\n")


def save_data(data):
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=2, ensure_ascii=False)
    print("\nSaved.\n")


def edit_section(items, section_type):
    if not items:
        print("No changes.")
        return

    for i, item in enumerate(items, start=1):
        title = item.get("company_name", item.get("title", "-"))
        role = item.get("role", "")
        print(f"{i}. {title} {('- ' + role) if role else ''}")

    edit_option = input("\nEdit (s) / New (n) / Delete (b):\n> ")

    match edit_option.lower():
        case "s":
            try:
                index = int(input("\nEdit number:\n> ")) - 1
            except ValueError:
                print("Invalid number.")
                return
            if not (0 <= index < len(items)):
                print("Invalid number.")
                return
            item = items[index]
            print("\nLeave blank to keep the current value.\n")

            for key, value in item.items():
                if key in ["framework-headers", "about_frameworks", "text"]:
                    continue
                if key == "frameworks":
                    print(f"\n{key}:")
                    print(", ".join(value) if value else "-")
                    new_list = input("\nNew value (comma-separated):\n> ")
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
                            new_value = input("\nNew value (max 500 chars):\n> ")
                            if not new_value:
                                break
                            if len(new_value) <= 500:
                                print(f"Chars used: {len(new_value)}/500")
                                item[key] = new_value
                                break
                            else:
                                print(f"({len(new_value)}/500) chars. Try again.\n")
                    else:
                        new_value = input("\nNew value:\n> ")
                        if new_value:
                            item[key] = new_value

        case "n":
            create_section(items, section_type)
        case "b":
            delete_section(items)
        case _:
            print("Invalid option.")

    save_data(data)


with open(file_path, "r", encoding="utf-8") as file:
    data = json.load(file)

print("Options available:")

for i, option in enumerate(data["body"]["ranger"]["options"], start=1):
    print(f"{i}. {option}")

option = input("\nIngrese una opción:\n> ")

match option:
    case "1":
        print("\nJob experiences")
        edit_section(data["body"]["ranger"]["job_experiences"], "jobs")

    case "2":
        print("\nCareers")
        edit_section(data["body"]["ranger"]["careers"], "careers")

    case "3":
        print("\nProjects")
        edit_section(data["body"]["ranger"]["projects"], "projects")

    case _:
        print("Invalid option")
