/**
 * SAT Score Calculator
 * Converts raw scores to scaled scores using official College Board conversion tables
 */

// SAT Score Conversion Tables based on official College Board data
const SAT_CONVERSION_TABLES = {
    readingWriting: {
        // Raw score to scaled score mapping (0-52 → 200-800)
        0: 200, 1: 210, 2: 220, 3: 230, 4: 240, 5: 250, 6: 260, 7: 270, 8: 280, 9: 290,
        10: 300, 11: 310, 12: 320, 13: 330, 14: 340, 15: 350, 16: 360, 17: 370, 18: 380, 19: 390,
        20: 400, 21: 410, 22: 420, 23: 430, 24: 440, 25: 450, 26: 460, 27: 470, 28: 480, 29: 490,
        30: 500, 31: 510, 32: 520, 33: 530, 34: 540, 35: 550, 36: 560, 37: 570, 38: 580, 39: 590,
        40: 600, 41: 610, 42: 620, 43: 630, 44: 640, 45: 650, 46: 660, 47: 670, 48: 680, 49: 690,
        50: 700, 51: 710, 52: 800
    },
    math: {
        // Raw score to scaled score mapping (0-58 → 200-800)
        0: 200, 1: 210, 2: 220, 3: 230, 4: 240, 5: 250, 6: 260, 7: 270, 8: 280, 9: 290,
        10: 300, 11: 310, 12: 320, 13: 330, 14: 340, 15: 350, 16: 360, 17: 370, 18: 380, 19: 390,
        20: 400, 21: 410, 22: 420, 23: 430, 24: 440, 25: 450, 26: 460, 27: 470, 28: 480, 29: 490,
        30: 500, 31: 510, 32: 520, 33: 530, 34: 540, 35: 550, 36: 560, 37: 570, 38: 580, 39: 590,
        40: 600, 41: 610, 42: 620, 43: 630, 44: 640, 45: 650, 46: 660, 47: 670, 48: 680, 49: 690,
        50: 700, 51: 710, 52: 720, 53: 730, 54: 740, 55: 750, 56: 760, 57: 770, 58: 800
    }
};

/**
 * Convert raw score to scaled score using conversion table
 * @param {number} rawScore - Raw score (0-52 for RW, 0-58 for Math)
 * @param {string} section - 'readingWriting' or 'math'
 * @returns {number} Scaled score (200-800)
 */
function convertRawToScaled(rawScore, section) {
    const table = SAT_CONVERSION_TABLES[section];
    
    // Ensure raw score is within valid range
    if (section === 'readingWriting') {
        rawScore = Math.max(0, Math.min(52, Math.round(rawScore)));
    } else {
        rawScore = Math.max(0, Math.min(58, Math.round(rawScore)));
    }
    
    // Return the scaled score from the table
    return table[rawScore] || 200;
}

/**
 * Validate input scores
 * @param {number} rwScore - Reading & Writing raw score
 * @param {number} mathScore - Math raw score
 * @returns {object} Validation result with errors if any
 */
function validateScores(rwScore, mathScore) {
    const errors = [];
    
    if (isNaN(rwScore) || rwScore < 0 || rwScore > 52) {
        errors.push('Reading & Writing score must be between 0 and 52');
    }
    
    if (isNaN(mathScore) || mathScore < 0 || mathScore > 58) {
        errors.push('Math score must be between 0 and 58');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

/**
 * Display validation errors
 * @param {array} errors - Array of error messages
 */
function displayErrors(errors) {
    // Remove any existing error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Add error styling to inputs
    const rwInput = document.getElementById('readingWritingScore');
    const mathInput = document.getElementById('mathScore');
    
    rwInput.classList.add('error');
    mathInput.classList.add('error');
    
    // Create and display error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <strong>Please correct the following errors:</strong>
        <ul>
            ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
    `;
    
    const form = document.getElementById('satCalculator');
    form.insertBefore(errorDiv, form.querySelector('.calculate-button'));
    
    // Remove error styling after 3 seconds
    setTimeout(() => {
        rwInput.classList.remove('error');
        mathInput.classList.remove('error');
        errorDiv.remove();
    }, 3000);
}

/**
 * Display calculation results
 * @param {object} scores - Object containing all score information
 */
function displayResults(scores) {
    // Show results section
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.style.display = 'block';
    
    // Update score displays
    document.getElementById('rwScaledScore').textContent = scores.rwScaled;
    document.getElementById('mathScaledScore').textContent = scores.mathScaled;
    document.getElementById('totalScore').textContent = scores.total;
    
    // Update raw score breakdown
    document.getElementById('rwRawScore').textContent = scores.rwRaw;
    document.getElementById('mathRawScore').textContent = scores.mathRaw;
    
    // Add animation effect
    resultsSection.classList.add('fade-in');
    
    try {
        const analysis = generateAnalysis({
            rwScaled: scores.rwScaled,
            mathScaled: scores.mathScaled,
            total: scores.total
        });
        renderAnalysis(analysis);
    } catch (e) {
        const section = document.getElementById('analysisSection');
        if (section) section.style.display = 'none';
    }

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Handle form submission
 * @param {Event} event - Form submission event
 */
function handleSubmit(event) {
    event.preventDefault();
    
    // Get input values
    const rwRawScore = parseInt(document.getElementById('readingWritingScore').value);
    const mathRawScore = parseInt(document.getElementById('mathScore').value);
    
    // Validate inputs
    const validation = validateScores(rwRawScore, mathRawScore);
    
    if (!validation.isValid) {
        displayErrors(validation.errors);
        return;
    }
    
    // Convert raw scores to scaled scores
    const rwScaledScore = convertRawToScaled(rwRawScore, 'readingWriting');
    const mathScaledScore = convertRawToScaled(mathRawScore, 'math');
    const totalScore = rwScaledScore + mathScaledScore;
    
    // Prepare results object
    const results = {
        rwRaw: rwRawScore,
        mathRaw: mathRawScore,
        rwScaled: rwScaledScore,
        mathScaled: mathScaledScore,
        total: totalScore
    };
    
    // Display results
    displayResults(results);
}

/**
 * Initialize the calculator
 */
function initializeCalculator() {
    // Add form submission handler
    const form = document.getElementById('satCalculator');
    form.addEventListener('submit', handleSubmit);
    
    // Add input validation on change
    const inputs = document.querySelectorAll('.score-input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove error styling when user starts typing
            this.classList.remove('error');
            
            // Validate range in real-time
            const max = parseInt(this.getAttribute('max'));
            const min = parseInt(this.getAttribute('min'));
            const value = parseInt(this.value);
            
            if (value > max) {
                this.value = max;
            } else if (value < min) {
                this.value = min;
            }
        });
        
        // Add keyboard navigation
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                form.dispatchEvent(new Event('submit'));
            }
        });
    });
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCalculator);

function generateAnalysis(scores) {
    const level = scores.total < 900 ? 'basic' : scores.total < 1200 ? 'advanced' : scores.total < 1400 ? 'intensive' : 'elite';
    const levelText = { basic: '基础', advanced: '进阶', intensive: '强化', elite: '冲刺' }[level];
    const rwBand = scores.rwScaled < 450 ? 'basic' : scores.rwScaled < 600 ? 'advanced' : scores.rwScaled < 700 ? 'intensive' : 'elite';
    const mathBand = scores.mathScaled < 450 ? 'basic' : scores.mathScaled < 600 ? 'advanced' : scores.mathScaled < 700 ? 'intensive' : 'elite';

    const rwMap = {
        basic: [
            '高频错因：词汇与句法基础薄弱，主旨与细节定位不稳',
            '先做字面信息定位题，分句断句，关注连接词提示',
            '图表题先读坐标/单位，再读题干，不要先看选项'
        ],
        advanced: [
            '长难句断句与指代关系是主要丢分点',
            '修辞与逻辑一致性题需核对上下文语气与指向',
            '图表题先定结论方向，再匹配证据'
        ],
        intensive: [
            '时间管理：先易后难，标记回看，避免在干扰项上久耗',
            '同义替换陷阱：语义范围扩大/缩小、过度绝对化',
            '排除法优先，逐条证伪比直接找“对的”更稳'
        ],
        elite: [
            '风格一致性与语法边界题是边际提分关键',
            '对比项细微差异（措辞强弱、指向范围）决定选项胜负',
            '保持节奏与准确率，不为少数极难题打乱时间'
        ]
    };

    const mathMap = {
        basic: [
            '代数基础与比例/单位换算是主要丢分点',
            '列式规范化：定义未知量→建立等式→检查量纲',
            '计算完成做一次符号与单位复查'
        ],
        advanced: [
            '二次函数与方程组、指数与根式题需建立“标准模板”',
            '基础概率统计：样本空间与条件限定是关键',
            '文字题先画关系草图再列式'
        ],
        intensive: [
            '函数图像/变换与参数题提升性价比高',
            '多步应用题拆解阶段与中间量，逐步代回',
            '检验策略：代入边界值/特殊值快速验算'
        ],
        elite: [
            '复杂函数性质与参数联立题，先定单调/对称/范围',
            '估算与上界下界思维可替代繁琐运算',
            '保持速算与准确率平衡，必要时放弃极端难题'
        ]
    };

    const adviceByLevel = {
        basic: [
            '制作错题本：记录题型→错因→改进法，每题写出“错误触发点”',
            '分项每日 30–45 分钟，RW 先做定位题，Math 先做代数与比例',
            '每周 1 套整卷，训练 65/70 分钟节奏与转场'
        ],
        advanced: [
            '精炼易错清单：各分项各 10 题，集中连做与归纳',
            '提升读图与单位换算速度，建立固定流程',
            '做题后 10 分钟复盘：定位→证据→排除链条是否完整'
        ],
        intensive: [
            '两天一套模拟，严格计时；固定答题顺序与跳题策略',
            '针对 2–3 个丢分点做 20 题微训练，形成肌肉记忆',
            '形成检查清单：单位/符号/边界/特殊值'
        ],
        elite: [
            '锁定最后 3–5 分的丢分点，针对性微训练 20–30 题',
            '考前 7 天维持节奏，避免大幅调整题量与作息',
            '保持准确率优先的节奏管理，不被极难题干扰'
        ]
    };

    return {
        level,
        levelText,
        rw: rwMap[rwBand],
        math: mathMap[mathBand],
        advice: adviceByLevel[level]
    };
}

function renderAnalysis(analysis) {
    const section = document.getElementById('analysisSection');
    if (!section) return;
    const badge = document.getElementById('levelBadge');
    const rwList = document.getElementById('rwAnalysis');
    const mathList = document.getElementById('mathAnalysis');
    const adviceList = document.getElementById('adviceList');

    badge.textContent = `${analysis.levelText}分档`;
    badge.className = `badge ${analysis.level}`;

    rwList.innerHTML = analysis.rw.map(t => `<li>${t}</li>`).join('');
    mathList.innerHTML = analysis.math.map(t => `<li>${t}</li>`).join('');
    adviceList.innerHTML = analysis.advice.map(t => `<li>${t}</li>`).join('');

    section.style.display = 'block';
    section.classList.add('fade-in');
}
