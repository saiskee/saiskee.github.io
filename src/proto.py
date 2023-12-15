import json

def infer_protobuf_type(value):
    """ Infer the protobuf type from a Python data type. """
    if isinstance(value, int):
        return 'int32'
    elif isinstance(value, float):
        return 'float'
    elif isinstance(value, bool):
        return 'bool'
    elif isinstance(value, str):
        return 'string'
    elif isinstance(value, list):
        return 'repeated'
    elif isinstance(value, dict):
        return 'message'
    else:
        return 'unknown'

def analyze_json_structure(json_data, level=0):
    """ Analyze the JSON structure and print out the inferred protobuf fields. """
    for key, value in json_data.items():
        if isinstance(value, dict):
            print(' ' * level * 4 + f'message {key} {{')
            analyze_json_structure(value, level + 1)
            print(' ' * level * 4 + '}')
        else:
            protobuf_type = infer_protobuf_type(value)
            print(' ' * level * 4 + f'{protobuf_type} {key};')

# Load the JSON file
with open('bhajans.json', 'r') as file:
    data = json.load(file)

# Assuming the JSON file is a list of objects, analyze the first object
if isinstance(data, list) and data:
    analyze_json_structure(data[0])
else:
    print("JSON data is not in the expected format.")
