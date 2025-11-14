## 目标
- 规范化并更新站点 `sitemap.xml`，提升收录质量。

## 修改内容
- 保留主页唯一条目：`<loc>https://www.sat-score-calculator.net/</loc>`。
- 更新 `<lastmod>` 为当前 UTC 日期时间（ISO 8601）。
- 新增 `<changefreq>weekly</changefreq>` 和 `<priority>1.0</priority>`。
- 保留现有 `urlset` 命名空间与 schema，移除冗余生成器注释。

## 不做的事
- 不加入静态资源（如 `favicon.svg`）或重复 URL（如 `/index.html`），避免重复收录。

## 验收标准
- XML 结构有效、通过 sitemap XSD 校验；主页 URL 正确；包含 `lastmod/changefreq/priority` 三字段。