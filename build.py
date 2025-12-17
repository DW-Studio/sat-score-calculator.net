import os
import json
import re

# 1. 既然你的 script.js 里已经有了详细数据，我们可以直接在这里定义，
#    或者你可以读取 colleges.json。为了稳妥，我把 script.js 里的数据放这里作为源。
SCHOOL_DATA = [
  {"name": "Princeton University", "country": "US", "state": "NJ", "type": "Private", "sat25": 1500, "sat75": 1580, "admitRate": 6, "url": "https://www.princeton.edu/"},
  {"name": "Massachusetts Institute of Technology", "country": "US", "state": "MA", "type": "Private", "sat25": 1520, "sat75": 1580, "admitRate": 4, "url": "https://www.mit.edu/"},
  {"name": "Harvard University", "country": "US", "state": "MA", "type": "Private", "sat25": 1490, "sat75": 1580, "admitRate": 3, "url": "https://www.harvard.edu/"},
  {"name": "Stanford University", "country": "US", "state": "CA", "type": "Private", "sat25": 1500, "sat75": 1570, "admitRate": 4, "url": "https://www.stanford.edu/"},
  {"name": "Yale University", "country": "US", "state": "CT", "type": "Private", "sat25": 1480, "sat75": 1580, "admitRate": 5, "url": "https://www.yale.edu/"},
  {"name": "University of Pennsylvania", "country": "US", "state": "PA", "type": "Private", "sat25": 1500, "sat75": 1570, "admitRate": 6, "url": "https://www.upenn.edu/"},
  {"name": "California Institute of Technology", "country": "US", "state": "CA", "type": "Private", "sat25": 1530, "sat75": 1580, "admitRate": 3, "url": "https://www.caltech.edu/"},
  {"name": "Duke University", "country": "US", "state": "NC", "type": "Private", "sat25": 1480, "sat75": 1570, "admitRate": 6, "url": "https://www.duke.edu/"},
  {"name": "Brown University", "country": "US", "state": "RI", "type": "Private", "sat25": 1470, "sat75": 1570, "admitRate": 5, "url": "https://www.brown.edu/"},
  {"name": "Johns Hopkins University", "country": "US", "state": "MD", "type": "Private", "sat25": 1520, "sat75": 1560, "admitRate": 7, "url": "https://www.jhu.edu/"},
  {"name": "Northwestern University", "country": "US", "state": "IL", "type": "Private", "sat25": 1460, "sat75": 1560, "admitRate": 7, "url": "https://www.northwestern.edu/"},
  {"name": "Columbia University", "country": "US", "state": "NY", "type": "Private", "sat25": 1470, "sat75": 1570, "admitRate": 4, "url": "https://www.columbia.edu/"},
  {"name": "Cornell University", "country": "US", "state": "NY", "type": "Private", "sat25": 1470, "sat75": 1550, "admitRate": 7, "url": "https://www.cornell.edu/"},
  {"name": "University of Chicago", "country": "US", "state": "IL", "type": "Private", "sat25": 1510, "sat75": 1560, "admitRate": 5, "url": "https://www.uchicago.edu/"},
  {"name": "University of California, Berkeley", "country": "US", "state": "CA", "type": "Public", "sat25": 1340, "sat75": 1540, "admitRate": 11, "url": "https://www.berkeley.edu/"},
  {"name": "University of California, Los Angeles", "country": "US", "state": "CA", "type": "Public", "sat25": 1350, "sat75": 1550, "admitRate": 9, "url": "https://www.ucla.edu/"},
  {"name": "Rice University", "country": "US", "state": "TX", "type": "Private", "sat25": 1490, "sat75": 1570, "admitRate": 8, "url": "https://www.rice.edu/"},
  {"name": "Dartmouth College", "country": "US", "state": "NH", "type": "Private", "sat25": 1440, "sat75": 1560, "admitRate": 6, "url": "https://home.dartmouth.edu/"},
  {"name": "Vanderbilt University", "country": "US", "state": "TN", "type": "Private", "sat25": 1480, "sat75": 1570, "admitRate": 6, "url": "https://www.vanderbilt.edu/"},
  {"name": "University of Notre Dame", "country": "US", "state": "IN", "type": "Private", "sat25": 1420, "sat75": 1560, "admitRate": 12, "url": "https://www.nd.edu/"},
  {"name": "University of Michigan-Ann Arbor", "country": "US", "state": "MI", "type": "Public", "sat25": 1360, "sat75": 1530, "admitRate": 18, "url": "https://umich.edu/"},
  {"name": "Georgetown University", "country": "US", "state": "DC", "type": "Private", "sat25": 1410, "sat75": 1550, "admitRate": 12, "url": "https://www.georgetown.edu/"},
  {"name": "University of North Carolina at Chapel Hill", "country": "US", "state": "NC", "type": "Public", "sat25": 1370, "sat75": 1500, "admitRate": 17, "url": "https://www.unc.edu/"},
  {"name": "Carnegie Mellon University", "country": "US", "state": "PA", "type": "Private", "sat25": 1490, "sat75": 1570, "admitRate": 11, "url": "https://www.cmu.edu/"},
  {"name": "Emory University", "country": "US", "state": "GA", "type": "Private", "sat25": 1430, "sat75": 1540, "admitRate": 11, "url": "https://www.emory.edu/"},
  {"name": "University of Virginia", "country": "US", "state": "VA", "type": "Public", "sat25": 1390, "sat75": 1530, "admitRate": 19, "url": "https://www.virginia.edu/"},
  {"name": "Washington University in St Louis", "country": "US", "state": "MO", "type": "Private", "sat25": 1500, "sat75": 1570, "admitRate": 11, "url": "https://wustl.edu/"},
  {"name": "University of California, Davis", "country": "US", "state": "CA", "type": "Public", "sat25": 1160, "sat75": 1400, "admitRate": 37, "url": "https://www.ucdavis.edu/"},
  {"name": "University of California, San Diego", "country": "US", "state": "CA", "type": "Public", "sat25": 1270, "sat75": 1480, "admitRate": 24, "url": "https://ucsd.edu/"},
  {"name": "University of Florida", "country": "US", "state": "FL", "type": "Public", "sat25": 1350, "sat75": 1490, "admitRate": 23, "url": "https://www.ufl.edu/"},
  {"name": "University of Southern California", "country": "US", "state": "CA", "type": "Private", "sat25": 1410, "sat75": 1540, "admitRate": 12, "url": "https://www.usc.edu/"},
  {"name": "University of Texas at Austin", "country": "US", "state": "TX", "type": "Public", "sat25": 1240, "sat75": 1470, "admitRate": 31, "url": "https://www.utexas.edu/"},
  {"name": "Georgia Institute of Technology", "country": "US", "state": "GA", "type": "Public", "sat25": 1370, "sat75": 1530, "admitRate": 17, "url": "https://www.gatech.edu/"},
  {"name": "University of California, Irvine", "country": "US", "state": "CA", "type": "Public", "sat25": 1230, "sat75": 1430, "admitRate": 21, "url": "https://uci.edu/"},
  {"name": "New York University", "country": "US", "state": "NY", "type": "Private", "sat25": 1450, "sat75": 1570, "admitRate": 12, "url": "https://www.nyu.edu/"},
  {"name": "University of California, Santa Barbara", "country": "US", "state": "CA", "type": "Public", "sat25": 1230, "sat75": 1460, "admitRate": 26, "url": "https://www.ucsb.edu/"},
  {"name": "University of Illinois Urbana-Champaign", "country": "US", "state": "IL", "type": "Public", "sat25": 1340, "sat75": 1510, "admitRate": 45, "url": "https://illinois.edu/"},
  {"name": "University of Wisconsin-Madison", "country": "US", "state": "WI", "type": "Public", "sat25": 1340, "sat75": 1500, "admitRate": 49, "url": "https://www.wisc.edu/"},
  {"name": "Boston College", "country": "US", "state": "MA", "type": "Private", "sat25": 1420, "sat75": 1530, "admitRate": 17, "url": "https://www.bc.edu/"},
  {"name": "Tufts University", "country": "US", "state": "MA", "type": "Private", "sat25": 1440, "sat75": 1550, "admitRate": 10, "url": "https://www.tufts.edu/"},
  {"name": "University of Washington", "country": "US", "state": "WA", "type": "Public", "sat25": 1220, "sat75": 1470, "admitRate": 48, "url": "https://www.washington.edu/"},
  {"name": "Boston University", "country": "US", "state": "MA", "type": "Private", "sat25": 1360, "sat75": 1520, "admitRate": 14, "url": "https://www.bu.edu/"},
  {"name": "Northeastern University", "country": "US", "state": "MA", "type": "Private", "sat25": 1430, "sat75": 1550, "admitRate": 7, "url": "https://www.northeastern.edu/"},
  {"name": "Purdue University", "country": "US", "state": "IN", "type": "Public", "sat25": 1200, "sat75": 1470, "admitRate": 53, "url": "https://www.purdue.edu/"},
  {"name": "Ohio State University", "country": "US", "state": "OH", "type": "Public", "sat25": 1250, "sat75": 1460, "admitRate": 53, "url": "https://www.osu.edu/"},
  {"name": "University of Maryland-College Park", "country": "US", "state": "MD", "type": "Public", "sat25": 1370, "sat75": 1510, "admitRate": 44, "url": "https://umd.edu/"},
  {"name": "University of Georgia", "country": "US", "state": "GA", "type": "Public", "sat25": 1270, "sat75": 1450, "admitRate": 43, "url": "https://www.uga.edu/"},
  {"name": "Texas A&M University", "country": "US", "state": "TX", "type": "Public", "sat25": 1160, "sat75": 1380, "admitRate": 63, "url": "https://www.tamu.edu/"},
  {"name": "Virginia Tech", "country": "US", "state": "VA", "type": "Public", "sat25": 1220, "sat75": 1420, "admitRate": 57, "url": "https://vt.edu/"},
  {"name": "Florida State University", "country": "US", "state": "FL", "type": "Public", "sat25": 1200, "sat75": 1350, "admitRate": 25, "url": "https://www.fsu.edu/"},
  {"name": "University of Minnesota-Twin Cities", "country": "US", "state": "MN", "type": "Public", "sat25": 1260, "sat75": 1480, "admitRate": 73, "url": "https://twin-cities.umn.edu/"},
  {"name": "Michigan State University", "country": "US", "state": "MI", "type": "Public", "sat25": 1130, "sat75": 1350, "admitRate": 83, "url": "https://msu.edu/"},
  {"name": "North Carolina State University", "country": "US", "state": "NC", "type": "Public", "sat25": 1270, "sat75": 1440, "admitRate": 47, "url": "https://www.ncsu.edu/"},
  {"name": "Pennsylvania State University", "country": "US", "state": "PA", "type": "Public", "sat25": 1200, "sat75": 1400, "admitRate": 55, "url": "https://www.psu.edu/"},
  {"name": "Rutgers University", "country": "US", "state": "NJ", "type": "Public", "sat25": 1240, "sat75": 1470, "admitRate": 66, "url": "https://www.rutgers.edu/"},
  {"name": "University of Massachusetts-Amherst", "country": "US", "state": "MA", "type": "Public", "sat25": 1260, "sat75": 1450, "admitRate": 64, "url": "https://www.umass.edu/"},
  {"name": "Indiana University-Bloomington", "country": "US", "state": "IN", "type": "Public", "sat25": 1180, "sat75": 1400, "admitRate": 82, "url": "https://www.indiana.edu/"},
  {"name": "University of Arizona", "country": "US", "state": "AZ", "type": "Public", "sat25": 1120, "sat75": 1370, "admitRate": 87, "url": "https://www.arizona.edu/"},
  {"name": "Arizona State University", "country": "US", "state": "AZ", "type": "Public", "sat25": 1130, "sat75": 1360, "admitRate": 88, "url": "https://www.asu.edu/"},
  {"name": "University of Colorado Boulder", "country": "US", "state": "CO", "type": "Public", "sat25": 1180, "sat75": 1380, "admitRate": 80, "url": "https://www.colorado.edu/"},
  {"name": "University of Connecticut", "country": "US", "state": "CT", "type": "Public", "sat25": 1230, "sat75": 1430, "admitRate": 55, "url": "https://uconn.edu/"},
  {"name": "University of Pittsburgh", "country": "US", "state": "PA", "type": "Public", "sat25": 1280, "sat75": 1470, "admitRate": 49, "url": "https://www.pitt.edu/"},
  {"name": "Syracuse University", "country": "US", "state": "NY", "type": "Private", "sat25": 1220, "sat75": 1400, "admitRate": 52, "url": "https://www.syracuse.edu/"},
  {"name": "University of Miami", "country": "US", "state": "FL", "type": "Private", "sat25": 1330, "sat75": 1490, "admitRate": 19, "url": "https://welcome.miami.edu/"},
  {"name": "Clemson University", "country": "US", "state": "SC", "type": "Public", "sat25": 1240, "sat75": 1400, "admitRate": 43, "url": "https://www.clemson.edu/"},
  {"name": "University of Utah", "country": "US", "state": "UT", "type": "Public", "sat25": 1190, "sat75": 1390, "admitRate": 89, "url": "https://www.utah.edu/"},
  {"name": "Iowa State University", "country": "US", "state": "IA", "type": "Public", "sat25": 1080, "sat75": 1320, "admitRate": 90, "url": "https://www.iastate.edu/"},
  {"name": "University of Central Florida", "country": "US", "state": "FL", "type": "Public", "sat25": 1190, "sat75": 1360, "admitRate": 41, "url": "https://www.ucf.edu/"},
  {"name": "University of Oregon", "country": "US", "state": "OR", "type": "Public", "sat25": 1110, "sat75": 1330, "admitRate": 86, "url": "https://www.uoregon.edu/"},
  {"name": "Oregon State University", "country": "US", "state": "OR", "type": "Public", "sat25": 1080, "sat75": 1320, "admitRate": 83, "url": "https://oregonstate.edu/"},
  {"name": "University of South Florida", "country": "US", "state": "FL", "type": "Public", "sat25": 1230, "sat75": 1390, "admitRate": 44, "url": "https://www.usf.edu/"},
  {"name": "University of Alabama", "country": "US", "state": "AL", "type": "Public", "sat25": 1110, "sat75": 1370, "admitRate": 80, "url": "https://www.ua.edu/"},
  {"name": "Auburn University", "country": "US", "state": "AL", "type": "Public", "sat25": 1170, "sat75": 1350, "admitRate": 44, "url": "https://www.auburn.edu/"},
  {"name": "University of Tennessee-Knoxville", "country": "US", "state": "TN", "type": "Public", "sat25": 1180, "sat75": 1350, "admitRate": 68, "url": "https://www.utk.edu/"},
  {"name": "University of Kentucky", "country": "US", "state": "KY", "type": "Public", "sat25": 1080, "sat75": 1310, "admitRate": 94, "url": "https://www.uky.edu/"},
  {"name": "University of South Carolina", "country": "US", "state": "SC", "type": "Public", "sat25": 1180, "sat75": 1380, "admitRate": 64, "url": "https://www.sc.edu/"},
  {"name": "University of Missouri", "country": "US", "state": "MO", "type": "Public", "sat25": 1130, "sat75": 1330, "admitRate": 79, "url": "https://missouri.edu/"},
  {"name": "University of Kansas", "country": "US", "state": "KS", "type": "Public", "sat25": 1070, "sat75": 1330, "admitRate": 88, "url": "https://ku.edu/"},
  {"name": "University of Oklahoma", "country": "US", "state": "OK", "type": "Public", "sat25": 1110, "sat75": 1310, "admitRate": 72, "url": "https://www.ou.edu/"},
  {"name": "Oklahoma State University", "country": "US", "state": "OK", "type": "Public", "sat25": 1040, "sat75": 1260, "admitRate": 71, "url": "https://go.okstate.edu/"},
  {"name": "Kansas State University", "country": "US", "state": "KS", "type": "Public", "sat25": 1050, "sat75": 1290, "admitRate": 95, "url": "https://www.k-state.edu/"},
  {"name": "Texas Tech University", "country": "US", "state": "TX", "type": "Public", "sat25": 1070, "sat75": 1250, "admitRate": 67, "url": "https://www.ttu.edu/"},
  {"name": "Baylor University", "country": "US", "state": "TX", "type": "Private", "sat25": 1190, "sat75": 1370, "admitRate": 46, "url": "https://www.baylor.edu/"}
]

def get_slug(text):
    """
    仿照 script.js 里的 getSlug 逻辑：
    1. 小写
    2. & -> and
    3. 移除标点
    4. 空格变横杠
    """
    text = text.lower()
    text = text.replace('&', 'and')
    text = re.sub(r'[’,\.]', '', text) # 移除 ' , .
    text = re.sub(r'\s+', '-', text)   # 空格变 -
    return text

def build_pages():
    # 1. 确保 template.html 存在
    if not os.path.exists('template.html'):
        print("Error: template.html not found!")
        return

    # 2. 读取模板内容
    with open('template.html', 'r', encoding='utf-8') as f:
        template_content = f.read()

    # 3. 确保 college 文件夹存在
    if not os.path.exists('college'):
        os.makedirs('college')

    print(f"Start building {len(SCHOOL_DATA)} college pages...")

    # 4. 遍历每个学校生成页面
    for school in SCHOOL_DATA:
        slug = get_slug(school['name'])
        
        # 创建子目录: college/harvard-university/
        school_dir = os.path.join('college', slug)
        if not os.path.exists(school_dir):
            os.makedirs(school_dir)

        # 替换模板变量
        # {{name}}, {{sat25}}, {{sat75}}, {{admitRate}}, {{type}}, {{url}}
        # 还有 {{slug}} 用于 canonical URL
        page_content = template_content
        page_content = page_content.replace('{{name}}', school['name'])
        page_content = page_content.replace('{{slug}}', slug)
        page_content = page_content.replace('{{sat25}}', str(school['sat25']))
        page_content = page_content.replace('{{sat75}}', str(school['sat75']))
        page_content = page_content.replace('{{admitRate}}', str(school['admitRate']))
        page_content = page_content.replace('{{type}}', school['type'])
        page_content = page_content.replace('{{url}}', school['url'])
        page_content = page_content.replace('{{location}}', f"{school['state']}, {school['country']}")

        # 写入 index.html
        output_path = os.path.join(school_dir, 'index.html')
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(page_content)
        
        print(f"Generated: {output_path}")

    print("Done! All pages generated.")
def generate_sitemap():
    base_url = "https://www.sat-score-calculator.net"
    sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    # 1. 添加主页
    sitemap_content += f"""  <url>
    <loc>{base_url}/</loc>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
  </url>\n"""

    # 2. 添加所有学校页面
    print("Generating sitemap entries...")
    for school in SCHOOL_DATA:
        slug = get_slug(school['name'])
        # 注意：这里我们加上 index.html 或者直接用目录名（取决于你最终部署的方式）
        # 标准做法是链接到目录（如果你部署在 Netlify/Vercel）
        url = f"{base_url}/college/{slug}/" 
        
        sitemap_content += f"""  <url>
    <loc>{url}</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>\n"""

    sitemap_content += '</urlset>'

    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(sitemap_content)
    
    print("Success: sitemap.xml updated with all schools.")

# === 修改执行入口 ===
if __name__ == "__main__":
    build_pages()       # 1. 生成网页
    generate_sitemap()  # 2. 生成站点地图 (新增)