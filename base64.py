#!/usr/bin/python3

import base64


username = "Carey99"

password =  "@careFour4"

credentials =  f"{username}:{password}"

encoded =  base64.b64encode(credentials.encode('utf-8')).decode('utf-8')

print(f"Basic {encoded}")
