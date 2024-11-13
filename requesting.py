#!/usr/bin/python3

import requests

url  = "https://jsonplaceholder.typicode.com/posts"

data  = {
        "userId": 2,
        "title": "Snake eyes",
        "body": "GI joe Origins"
}

response =  requests.post(url, json=data)


if response.status_code == 201:
    data =  response.json()
    print("Data posted is --> ", data)
else:
    print(f"Not sent but this code returned: {response.status_code}")
