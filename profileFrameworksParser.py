import json

file_path = "./src/i18n/es.json"


def save_data(data):
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=2, ensure_ascii=False)
    print("\nChanges saved.\n")


def show_frameworks(frameworks):
    if not frameworks:
        print("No frameworks registered.")
        return

    print("\nFrameworks:\n")

    for i, fw in enumerate(frameworks):
        print(
            f"{i + 1}. {fw['framework']} | "
            f"{fw['area']} | "
            f"{fw['language']} | "
            f"{fw['experience_time']}"
        )


def edit_framework(frameworks):
    try:
        index = int(input("\nNumber to edit:\n> ")) - 1
    except ValueError:
        print("Invalid input.")
        return

    if not (0 <= index < len(frameworks)):
        print("Invalid number.")
        return

    fw = frameworks[index]

    print("\nLeave empty to keep the current value.\n")

    for key, value in fw.items():
        print(f"{key} current value: {value}")
        new_value = input(f"New {key}:\n> ")
        if new_value:
            fw[key] = new_value

    print("\nFramework updated.\n")


def delete_framework(frameworks):
    try:
        index = int(input("\nNumber to delete:\n> ")) - 1
    except ValueError:
        print("Invalid input.")
        return

    if not (0 <= index < len(frameworks)):
        print("Invalid number.")
        return

    confirm = input(f"¿Delete {frameworks[index]['framework']}? (s/n):\n> ")

    if confirm.lower() == "s":
        deleted = frameworks.pop(index)
        print(f"\nDeleted: {deleted['framework']}\n")
    else:
        print("Canceled.\n")


with open(file_path, "r", encoding="utf-8") as file:
    data = json.load(file)

frameworks = data["body"]["ranger"]["projects"][0]["about_frameworks"]

while True:
    show_frameworks(frameworks)

    print("\nOptions:")
    print("1. Edit  ")
    print("2. Delete")
    print("3. Exit")

    option = input("\nSelect an option:\n> ")

    if option == "1":
        edit_framework(frameworks)
        save_data(data)

    elif option == "2":
        delete_framework(frameworks)
        save_data(data)

    elif option == "3":
        print("Exiting...")
        break

    else:
        print("Invalid option.\n")
