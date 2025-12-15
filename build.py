import os
import shutil
import json

DATA_FILE = 'colleges.json'
TEMPLATE_FILE = 'template.html'
OUTPUT_DIR = 'college'
SITE_DOMAIN = "https://www.sat-score-calculator.net"

def slugify(text):
    text = text.lower()
    text = text.replace('&', 'and') # Fix for Texas A&M
    text = text.replace('’', '').replace(',', '').replace('.', '')
    return text.replace(' ', '-')

def main():
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            schools = json.load(f)
    except FileNotFoundError:
        print(f"Error: {DATA_FILE} not found!")
        return

    with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
        template = f.read()
    
    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)
    os.makedirs(OUTPUT_DIR)
    
    # Generate Directory Index
    index_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>All Colleges - SAT Score Requirements Directory</title>
        <meta name="description" content="Browse SAT score requirements for top US colleges and universities.">
        <link rel="stylesheet" href="../style.css">
        <style>
            .list-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; margin-top: 2rem; }
            .school-link { text-decoration: none; color: #1e293b; display: block; padding: 1rem; background: white; border: 1px solid #e2e8f0; border-radius: 0.5rem; transition: transform 0.2s; }
            .school-link:hover { transform: translateY(-2px); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border-color: #2563eb; }
            .school-link strong { display: block; color: #2563eb; margin-bottom: 0.5rem; }
        </style>
    </head>
    <body>
        <div class="container">
            <header class="header">
                <h1 class="title">All Colleges</h1>
                <p class="subtitle"><a href="../index.html" style="color:white; text-decoration:underline;">&larr; Back to Calculator</a></p>
            </header>
            <main class="main-content">
                <div class="list-grid">
    """
    
    sitemap_urls = []
    print(f"🚀 Generating pages for {len(schools)} schools...")
    
    for school in schools:
        slug = slugify(school['name'])
        html = template
        html = html.replace('{{name}}', school['name'])
        html = html.replace('{{sat25}}', str(school['sat25']))
        html = html.replace('{{sat75}}', str(school['sat75']))
        html = html.replace('{{admitRate}}', str(school['admitRate']))
        html = html.replace('{{type}}', school['type'])
        html = html.replace('{{url}}', school['url'])
        html = html.replace('{{slug}}', slug)
        html = html.replace('{{location}}', f"{school['state']}, {school['country']}")
        
        school_dir = os.path.join(OUTPUT_DIR, slug)
        os.makedirs(school_dir, exist_ok=True)
        
        with open(os.path.join(school_dir, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(html)
            
        index_content += f'<a href="{slug}/" class="school-link"><strong>{school["name"]}</strong><span>SAT: {school["sat25"]}-{school["sat75"]}</span></a>\n'
        sitemap_urls.append(f"{SITE_DOMAIN}/college/{slug}/")
        
    index_content += "</div></main></div></body></html>"
    
    with open(os.path.join(OUTPUT_DIR, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(index_content)
        
    # Generate Sitemap
    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    sitemap += f'  <url><loc>{SITE_DOMAIN}/</loc><priority>1.0</priority></url>\n'
    for url in sitemap_urls:
        sitemap += f'  <url><loc>{url}</loc><priority>0.8</priority></url>\n'
    sitemap += '</urlset>'
    
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(sitemap)
        
    print("✅ Done! Site generated.")

if __name__ == "__main__":
    main()