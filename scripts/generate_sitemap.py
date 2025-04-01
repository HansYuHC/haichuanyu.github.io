import os
from datetime import datetime
from urllib.parse import urljoin

# 配置（无需修改）
base_url = "https://hansyuhc.github.io/haichuanyu.github.io/"
output_file = "sitemap.xml"
ignore_files = {'CNAME', 'README.md', 'LICENSE', 'sitemap.xml'}


def get_site_files():
    files = []
    for item in os.listdir('.'):
        if item.endswith('.html') and item not in ignore_files:
            files.append(item)
        elif os.path.isdir(item) and item.lower() != 'scripts':
            for sub_item in os.listdir(item):
                if sub_item.endswith(('.html', '.jpg', '.png')):
                    files.append(f"{item}/{sub_item}")
    return files


def generate_xml(files):
    xml = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
"""
    today = datetime.now().strftime("%Y-%m-%d")

    for file in files:
        url = urljoin(base_url, file)
        if file == 'index.html':
            url = url[:-10]  # 移除index.html

        xml += f"""  <url>
    <loc>{url}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>{1.0 if file == 'index.html' else 0.8}</priority>
  </url>
"""
    xml += "</urlset>"
    return xml


if __name__ == "__main__":
    site_files = sorted(get_site_files())
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(generate_xml(site_files))
    print(f"✅ 已生成包含 {len(site_files)} 个URL的sitemap.xml")