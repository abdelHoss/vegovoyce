import json

filename = "content/email_list.json"


def email_stored(email):
    email_exist = False
    with open(filename, "r") as object:
        data = json.load(object)
        for element in data:
            if element["email"] == email:
                email_exist = True
        object.close()
    return email_exist


def add_email(email):
    with open(filename, "r+") as object:
        data = json.load(object)
        index = len(data)
        new_object = { "id": index, "email": email}
        data.append(new_object)
        object.seek(0)
        json.dump(data, object, indent=index)
        return data
