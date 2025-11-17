## 目标
- 面向英文用户完善 SEO：统一英文标题/描述，增加结构化数据、社交分享标签、规范 canonical/hreflang/robots。
- 更新 sitemap 为最新时间戳，与站点 URL 保持一致。

## 具体改动
- index.html（<head> 内）
  - 更新标题：`SAT Score Calculator & College Finder – Convert Raw to Scaled`。
  - 更新描述：覆盖计算与院校推荐，如“Accurately convert SAT raw scores to scaled scores (200–800; 400–1600 total) and get college recommendations by score, region, type, and admission rate”。
  - 增加 canonical：`https://www.sat-score-calculator.net/`。
  - 增加 hreflang：`<link rel="alternate" hreflang="en" href="https://www.sat-score-calculator.net/">`。
  - 增加 robots：`<meta name="robots" content="index,follow">`。
  - 增加 Open Graph：`og:title/og:description/og:url/og:type=website/og:image=/favicon.svg`（用绝对 URL）。
  - 增加 Twitter Card：`summary_large_image` + 同步 title/description/image。
  - 增加 JSON‑LD（WebSite + Organization）：包含 `@id/name/url/description/publisher`，不引入外部依赖。
- sitemap.xml
  - 保持现有 URL：`https://www.sat-score-calculator.net/`。
  - 更新 `lastmod` 为当前日期（UTC ISO8601）。
  - 保持 `changefreq=weekly`、`priority=1.0`。
- robots.txt（新增）
  - 内容：
    - `User-agent: *`
    - `Allow: /`
    - `Sitemap: https://www.sat-score-calculator.net/sitemap.xml`

## 验证
- 打开主页查看 `<head>` 标签是否完整渲染；OG/Twitter 校验基本格式正确。
- sitemap 打开可见最新 `lastmod`。
- robots.txt 可被访问，且搜索引擎可发现 sitemap。

## 交付
- 修改 `index.html`、`sitemap.xml`；新增 `robots.txt`。一次性完成，保持风格与现有实现一致，不添加多余注释。