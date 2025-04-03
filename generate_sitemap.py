import os
from datetime import datetime
from urllib.parse import urljoin
from typing import List, Set

# 配置
BASE_URL = "https://hansyuhc.github.io/haichuanyu.github.io/"  # 注意：建议去掉重复的路径
OUTPUT_FILE = "sitemap.xml"
IGNORE_FILES = {'CNAME', 'README.md', 'LICENSE', 'sitemap.xml', '.DS_Store'}
IGNORE_DIRS = {'scripts', 'assets', 'images'}  # 通常不需要收录的目录
PRIORITY_MAP = {
    'index.html': 1.0,
    'about.html': 0.9,
    'projects.html': 0.9,
    'contact.html': 0.8
}


def get_site_files() -> List[str]:
    """获取需要收录的文件列表"""
    files = []
    for item in os.listdir('.'):
        if item in IGNORE_FILES:
            continue
        if item.endswith('.html'):
            files.append(item)
        elif os.path.isdir(item) and item not in IGNORE_DIRS:
            for root, _, filenames in os.walk(item):
                for filename in filenames:
                    if filename.endswith('.html'):
                        rel_path = os.path.join(root, filename)
                        files.append(rel_path)
    return files


def should_include(url: str) -> bool:
    """判断URL是否需要收录"""
    # 可以在这里添加更多过滤逻辑
    return not any(ignore in url for ignore in IGNORE_FILES)


def generate_xml(files: List[str]) -> str:
    """生成XML内容"""
    xml = ['<?xml version="1.0" encoding="UTF-8"?>']
    xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

    today = datetime.now().strftime("%Y-%m-%d")

    for file in files:
        if not should_include(file):
            continue

        url = urljoin(BASE_URL, file)
        if file.endswith('index.html'):
            url = url[:-10]  # 移除index.html

        priority = PRIORITY_MAP.get(file, 0.8)

        xml.append(f"""  <url>
    <loc>{url}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>{priority}</priority>
  </url>""")

    xml.append("</urlset>")
    return '\n'.join(xml)


if __name__ == "__main__":
    try:
        site_files = sorted(get_site_files())
        xml_content = generate_xml(site_files)

        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            f.write(xml_content)

        print(f"✅ 成功生成包含 {len(site_files)} 个URL的 {OUTPUT_FILE}")
        print(f"🔗 站点地图URL: {urljoin(BASE_URL, OUTPUT_FILE)}")
    except Exception as e:
        print(f"❌ 生成站点地图时出错: {str(e)}")