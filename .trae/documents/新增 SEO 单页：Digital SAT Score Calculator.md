## 目标
- 创建 `digital-sat-score-calculator.html` 单页，包含关键词“Digital SAT Score Calculator”，加入同域的 Google Analytics 代码，并在主页添加入口链接，更新 sitemap。

## 页面内容
- 标题与描述：
  - `<title>Digital SAT Score Calculator – Accurate Raw-to-Scaled Conversion</title>`
  - `<meta name="description" content="Digital SAT score calculator: convert raw scores to scaled scores (200–800; 400–1600 total) and explore college recommendations by region, type, and admission rate.">`
- 结构：复用现有 `style.css` 和 `favicon.svg`，整洁的单屏说明与回到主页按钮。
- Canonical 与社交：
  - `canonical` 指向 `https://www.sat-score-calculator.net/digital-sat-score-calculator.html`
  - Open Graph/Twitter 与主页保持一致风格（url 指向新页）。
- Google Analytics：复用现有 GA（`G-YNBCGGYCCG`）。

## 链接与 sitemap
- 在主页 `index.html` 的 footer 增加到新页的链接。
- 更新 `sitemap.xml`，增加新页 `<url>`，`lastmod` 使用当前日期。

## 技术实现
- 新增文件：`digital-sat-score-calculator.html`（英文文案、无多余注释）。
- 修改文件：`index.html`（添加链接）、`sitemap.xml`（添加新条目）。
- 不引入第三方库，不修改现有脚本逻辑。

## 验证
- 打开新页检查标题、描述、OG/Twitter、canonical、GA 正常加载。
- 主页底部链接可访问新页。
- sitemap 包含两条 URL，`lastmod` 正确。