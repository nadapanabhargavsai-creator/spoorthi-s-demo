import os
import re

root_dir = r"c:\Users\nadap\OneDrive\Desktop\spoorthis-demo\spoorthi-s-demo\app\playschool"

for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith((".ts", ".tsx", ".css", ".md")):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
            if "branches" in content.lower():
                print(f"Found in {path}")
