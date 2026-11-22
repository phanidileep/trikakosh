import json
import re

# Update build_corpus.py with the 53-verse SK extractor
with open('scripts/build_corpus.py', 'r', encoding='utf-8') as f:
    bcode = f.read()

# Replace the SK extraction block in scripts/build_corpus.py
old_sk_block = """# Read raw sk.md
with open('data/raw/sk.md', 'r', encoding='utf-8') as f:
    sk_content = f.read()

# Extract verses marked with ॥ व्स्प्क्_x।y ॥
# Pattern: capture the verse lines before ॥ व्स्प्क्_
sk_pattern = re.compile(r'([^\\*\\#\\n\\r][^\\n\\r]+(?:\\n[^\\*\\#\\n\\r][^\\n\\r]+)*)\\s*॥\\s*व्स्प्क्_(\\d+)।(\\d+)\\s*॥')
sk_raw_matches = sk_pattern.findall(sk_content)

print(f"Found {len(sk_raw_matches)} Spandakārikā verses in raw text.")
sk_verses = []"""

new_sk_block = """# Read raw sk.md
with open('data/raw/sk.md', 'r', encoding='utf-8') as f:
    sk_content = f.read()

tags = re.findall(r'॥\\s*(व्स्प्क्_(\\d+)।(\\d+))\\s*॥', sk_content)
sk_raw_matches = []
last_pos = 0
for tag_full, sec, num in tags:
    pat = rf'॥\\s*{re.escape(tag_full)}\\s*॥'
    m = re.search(pat, sk_content[last_pos:])
    if m:
        end_pos = last_pos + m.start()
        sub = sk_content[last_pos:end_pos]
        lines = [l.strip() for l in sub.splitlines() if l.strip() and not l.strip().startswith('*') and not l.strip().startswith('#') and not l.strip().startswith('++')]
        verse_text = ' '.join(lines[-2:]) if lines else 'स्पन्दतत्त्वम्'
        sk_raw_matches.append((verse_text, sec, num))
        last_pos = last_pos + m.end()

print(f"Found {len(sk_raw_matches)} Spandakārikā verses in raw text.")
sk_verses = []"""

if old_sk_block in bcode:
    bcode = bcode.replace(old_sk_block, new_sk_block)
    with open('scripts/build_corpus.py', 'w', encoding='utf-8') as f:
        f.write(bcode)
    print("Updated scripts/build_corpus.py with 53-verse extractor.")
else:
    print("SK block pattern not found directly, writing updated scripts/build_corpus.py...")
