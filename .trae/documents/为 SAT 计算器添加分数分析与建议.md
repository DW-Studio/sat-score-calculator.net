## 目标
- 在现有结果区域下方新增“分数分析与建议”模块，基于 RW/Math 标化分与总分生成级别分档与定向学习建议。
- 纯前端实现，不引入新依赖，保持现有 HTML/CSS/JS 风格与结构。

## 受影响文件
- `index.html`：在 `#resultsSection` 内追加一个分析卡片容器 `#analysisSection`（或在现有网格中新增一列/一行）。
- `style.css`：新增分析卡片、徽章、两栏分析网格与建议列表的样式（复用既有变量/色板/阴影/动画）。
- `script.js`：新增 `generateAnalysis(scores)` 与 `renderAnalysis(analysis)`，并在 `displayResults` 内调用。

## 前端结构调整
- 在 `#resultsSection` 末尾插入：
  - 标题：`<h3>分数分析与建议>`（与现有标题层级一致）
  - 容器：`<div id="analysisSection" class="card analysis-card">`，内部包含：
    - 级别徽章：`#levelBadge`
    - 分析网格：`#analysisGrid`（两列：RW 与 Math）
    - 建议列表：`#adviceList`（要点列表）

## 样式要点（`style.css`）
- `.analysis-card`：沿用 `.card` 风格，增加顶部色条或徽章区域；支持淡入动画。
- `.badge`：圆角胶囊，按分档设置色阶（基础/进阶/强化/冲刺）。
- `.analysis-grid`：`grid-template-columns: 1fr 1fr;`，移动端单列堆叠。
- `.advice-list li`：左边细分点标识（使用现有色板），行距与段前间距与 `.results-grid` 保持一致。

## 计算与分档（`script.js`）
- 新增函数：
  - `generateAnalysis({ rwScaled, mathScaled, total })`：
    - 依据阈值给出：`level`、`rwAnalysis`（3–5 条）、`mathAnalysis`（3–5 条）、`adviceList`（3–6 条）。
  - `renderAnalysis(analysis)`：将分析结果写入 `#analysisSection` DOM。
  - 在 `displayResults(scores)` 中，`scores = { rwScaled, mathScaled, total, rwRaw, mathRaw }` 后调用上述函数。
- 分档阈值：
  - 总分 `total`：
    - `< 900` → 基础；`900–1190` → 进阶；`1200–1390` → 强化；`≥ 1400` → 冲刺
  - 分项 `rwScaled` / `mathScaled`：
    - `< 450` 基础；`450–599` 进阶；`600–699` 强化；`≥ 700` 冲刺

## 分析与建议内容（示例逻辑）
- RW 分析：
  - 基础：高频错误在词汇/句法/主旨题；建议先做字面信息定位与句间逻辑。
  - 进阶：长难句断句、图表题读图、修辞/逻辑一致性。
  - 强化：时间分配（先易后难）、排除法、同义替换陷阱归纳。
  - 冲刺：风格一致性、语法边界题、细微语义差异与替换容忍度。
- Math 分析：
  - 基础：代数基础、比例单位换算、算术失误复查清单。
  - 进阶：二次函数/方程组、指数与根式、基础概率统计。
  - 强化：函数变换与图像、建模列式、多步应用题。
  - 冲刺：复杂函数性质、参数联立、快速检验与估算策略。
- 综合建议（按总分分档组合生成 3–6 条）：
  - 基础：错题本模板、分项每日 30–45 分钟、每周一次整卷 65/70 分钟节奏训练。
  - 进阶：精炼易错题型清单（各 10 题）、提升读图/单位换算速度。
  - 强化：模拟题 2 天 1 套，严格计时；答题顺序与跳题策略固定化。
  - 冲刺：针对 2–3 个丢分点做针对性 20 题微型训练，考前 7 天维持节奏。

## 接口与可维护性
- 仅依赖现有 `displayResults` 的 `scores`，不侵入 `convertRawToScaled` 等基础函数。
- 所有新 DOM 查询限定在 `#analysisSection` 内，避免影响其它区域。
- 所有文案中文呈现，遵循现有字体与色板。

## 可见性与回退
- `#analysisSection` 默认隐藏，仅在计算完成后淡入显示。
- 若计算异常或字段缺失，分析模块不渲染/清空并不阻塞原有结果。

## 验收标准
- 输入任意合法原始分，结果区除原分与标化分外，出现分档徽章、RW/Math 两列分析与 3–6 条具体建议。
- 移动端单列布局，无溢出；桌面端两列排版，风格与现有卡片一致。
- 不新增依赖，不改变原有计算逻辑与结果数值。