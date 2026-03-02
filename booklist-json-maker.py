import re, json

with open("bookdata.h") as f:
    content = f.read()

entries = re.findall(r'BOOKDATA_ENTRY\("(.+?)"\)', content)
books = []
for entry in entries:
    parts = entry.split("|")
    book = {"title": parts[3], "author": parts[0]}
    if parts[1]: book["series"] = parts[1]
    if parts[2]: book["flags"] = parts[2]
    books.append(book)

with open("bookdata.json", "w") as f:
    json.dump(books, f, indent=2, ensure_ascii=False)
