// Top 100 US Colleges Data (Synced with colleges.json)
const SCHOOL_DATA = [
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
];

// Helper to match Python slugify
function getSlug(text) {
    text = text.toLowerCase();
    text = text.replace('&', 'and'); // Handle Texas A&M
    text = text.replace(/[’,\.]/g, ''); // Remove punctuation
    return text.replace(/\s+/g, '-'); // Spaces to dashes
}

// === 修改 1: 替换旧的转换表 ===
// Digital SAT 分数估算数据 (基于 Bluebook 自适应机制拟合)
// 键: 做对题数, 值: [最低分, 最高分]
const DIGITAL_SCORE_CHART = {
    readingWriting: {
        54: [800, 800], 53: [790, 800], 52: [770, 790], 51: [750, 770], 50: [740, 760],
        49: [730, 750], 48: [720, 740], 47: [710, 730], 46: [700, 720], 45: [690, 710],
        44: [680, 700], 43: [670, 690], 42: [660, 680], 41: [650, 670], 40: [640, 660],
        39: [630, 650], 38: [620, 640], 37: [610, 630], 36: [600, 620], 35: [590, 610],
        34: [580, 600], 33: [570, 590], 32: [560, 580], 31: [550, 570], 30: [540, 560],
        29: [530, 550], 28: [520, 540], 27: [510, 530], 26: [500, 520], 25: [490, 510],
        20: [440, 460], 15: [380, 410], 10: [320, 350], 5: [260, 290], 0: [200, 200]
    },
    math: {
        44: [800, 800], 43: [790, 800], 42: [780, 790], 41: [760, 780], 40: [750, 770],
        39: [740, 760], 38: [730, 750], 37: [710, 730], 36: [700, 720], 35: [690, 710],
        34: [680, 700], 33: [670, 690], 32: [660, 680], 31: [650, 670], 30: [640, 660],
        29: [630, 650], 28: [620, 640], 27: [610, 630], 26: [600, 620], 25: [590, 610],
        24: [580, 600], 23: [570, 590], 22: [560, 580], 21: [550, 570], 20: [540, 560],
        15: [480, 500], 10: [400, 430], 5: [300, 330], 0: [200, 200]
    }
};

// === 修改 2: 新的计算逻辑 (返回范围) ===
function getDigitalScoreRange(rawScore, section) {
    // 确保输入在合法范围内
    let maxQ = section === 'readingWriting' ? 54 : 44;
    rawScore = Math.max(0, Math.min(maxQ, Math.round(rawScore)));

    const chart = DIGITAL_SCORE_CHART[section];
    
    // 如果表中直接有这个分数
    if (chart[rawScore]) {
        return chart[rawScore];
    }
    
    // 如果表中没有(比如做对12题)，进行简单的插值估算
    // 这是一个简单的兜底逻辑
    let estimatedScore = 200 + (rawScore / maxQ) * 600; 
    estimatedScore = Math.round(estimatedScore / 10) * 10; // 取整到10位
    return [Math.max(200, estimatedScore - 10), Math.min(800, estimatedScore + 10)];
}

// === 修改 3: 更新题目数量限制 ===
function validateScores(rwScore, mathScore) {
    const errors = [];
    // RW 上限改为 54
    if (isNaN(rwScore) || rwScore < 0 || rwScore > 54) {
        errors.push('Reading & Writing score must be between 0 and 54');
    }
    // Math 上限改为 44
    if (isNaN(mathScore) || mathScore < 0 || mathScore > 44) {
        errors.push('Math score must be between 0 and 44');
    }
    return { isValid: errors.length === 0, errors: errors };
}

function displayErrors(errors) {
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    const rwInput = document.getElementById('readingWritingScore');
    const mathInput = document.getElementById('mathScore');
    rwInput.classList.add('error');
    mathInput.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<strong>Please correct the following errors:</strong><ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>`;
    const form = document.getElementById('satCalculator');
    form.insertBefore(errorDiv, form.querySelector('.calculate-button'));
    setTimeout(() => {
        rwInput.classList.remove('error');
        mathInput.classList.remove('error');
        errorDiv.remove();
    }, 3000);
}

// === 修改 4: 处理范围显示 ===
function displayResults(scores) {
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.style.display = 'block';
    
    // 更新显示 (显示范围字符串, 例如 "720-740")
    document.getElementById('rwScaledScore').textContent = scores.rwDisplay;
    document.getElementById('mathScaledScore').textContent = scores.mathDisplay;
    document.getElementById('totalScore').textContent = scores.totalDisplay;

    // 更新原始分
    document.getElementById('rwRawScore').textContent = scores.rwRaw;
    document.getElementById('mathRawScore').textContent = scores.mathRaw;

    resultsSection.classList.add('fade-in');
    
    try {
        // 分析部分使用平均分 (scores.totalAvg) 来判断等级
        const analysis = generateAnalysis({
            rwScaled: scores.rwAvg,
            mathScaled: scores.mathAvg,
            total: scores.totalAvg
        });
        renderAnalysis(analysis);
    } catch (e) {
        console.error(e);
    }
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // 大学推荐部分使用平均分进行过滤
    showSchoolsWithScore(scores.totalAvg);
}

// === 修改 5: 处理提交逻辑 ===
function handleSubmit(event) {
    event.preventDefault();
    const rwRawScore = parseInt(document.getElementById('readingWritingScore').value);
    const mathRawScore = parseInt(document.getElementById('mathScore').value);
    
    const validation = validateScores(rwRawScore, mathRawScore);
    if (!validation.isValid) {
        displayErrors(validation.errors);
        return;
    }

    // 获取范围 [min, max]
    const rwRange = getDigitalScoreRange(rwRawScore, 'readingWriting');
    const mathRange = getDigitalScoreRange(mathRawScore, 'math');

    // 计算总分范围
    const totalMin = rwRange[0] + mathRange[0];
    const totalMax = rwRange[1] + mathRange[1];

    // 计算用于内部逻辑(大学匹配)的平均分
    const rwAvg = Math.round((rwRange[0] + rwRange[1]) / 2);
    const mathAvg = Math.round((mathRange[0] + mathRange[1]) / 2);
    const totalAvg = Math.round((totalMin + totalMax) / 2);

    // 格式化显示文本
    const formatRange = (range) => range[0] === range[1] ? `${range[0]}` : `${range[0]}-${range[1]}`;

    const results = {
        rwRaw: rwRawScore,
        mathRaw: mathRawScore,
        // 用于显示的字符串
        rwDisplay: formatRange(rwRange),
        mathDisplay: formatRange(mathRange),
        totalDisplay: formatRange([totalMin, totalMax]),
        // 用于逻辑计算的数值
        rwAvg: rwAvg,
        mathAvg: mathAvg,
        totalAvg: totalAvg
    };
    
    displayResults(results);
}

function initializeCalculator() {
    const form = document.getElementById('satCalculator');
    form.addEventListener('submit', handleSubmit);
    const inputs = document.querySelectorAll('.score-input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const max = parseInt(this.getAttribute('max'));
            const min = parseInt(this.getAttribute('min'));
            const value = parseInt(this.value);
            if (value > max) { this.value = max; } else if (value < min) { this.value = min; }
        });
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                form.dispatchEvent(new Event('submit'));
            }
        });
    });
    document.documentElement.style.scrollBehavior = 'smooth';
    initializeSchoolSearch();
}

document.addEventListener('DOMContentLoaded', initializeCalculator);

// === 修改 script.js 中的 generateAnalysis 函数内容 ===

function generateAnalysis(scores) {
    // 等级判断逻辑不变
    const level = scores.total < 900 ? 'basic' : scores.total < 1200 ? 'advanced' : scores.total < 1400 ? 'intensive' : 'elite';
    const levelText = { basic: 'Basic', advanced: 'Advanced', intensive: 'Intensive', elite: 'Elite' }[level];
    
    // 注意：这里的判断逻辑使用传入的平均分 (scaled score)
    const rwBand = scores.rwScaled < 450 ? 'basic' : scores.rwScaled < 600 ? 'advanced' : scores.rwScaled < 700 ? 'intensive' : 'elite';
    const mathBand = scores.mathScaled < 450 ? 'basic' : scores.mathScaled < 600 ? 'advanced' : scores.mathScaled < 700 ? 'intensive' : 'elite';

    // === 1. 更新阅读写作建议 (针对机考短文章、逻辑推理) ===
    const rwMap = {
        basic: [
            'Focus on "Standard English Conventions" (Grammar is the easiest way to gain points).',
            'Practice identifying the "Main Idea" in short paragraphs.'
        ],
        advanced: [
            'Work on "Words in Context" - focus on secondary meanings of common words.',
            'Improve speed on "Transitions" questions (However, Therefore, Furthermore).'
        ],
        intensive: [
            'Master "Command of Evidence" (Quantitative) - reading charts/graphs quickly.',
            'Drill "Rhetorical Synthesis" questions (combining notes into sentences).'
        ],
        elite: [
            'Perfect "Inferences" questions (the hardest logical reasoning type).',
            'Eliminate "plausible but wrong" detractors in Cross-Text Connections.'
        ]
    };

    // === 2. 更新数学建议 (针对全程 Desmos 计算器) ===
    const mathMap = {
        basic: [
            'Learn to use the built-in Desmos Calculator for Systems of Equations.',
            'Review basic Linear Equations (y = mx + b) and substitution.'
        ],
        advanced: [
            'Master "Quadratics" - finding roots/vertex using Desmos visually.',
            'Practice "Probability and Statistics" (Mean, Median, Mode, Range).'
        ],
        intensive: [
            'Focus on "Advanced Math" - Exponential growth/decay and nonlinear functions.',
            'Drill "Geometry and Trigonometry" (Circle equations, SOH CAH TOA).'
        ],
        elite: [
            'Solve "Constant/No Solution" problems instantly without calculation.',
            'Master complex function transformations and creating models from data.'
        ]
    };

    // === 3. 更新通用备考策略 (针对自适应机制) ===
    const adviceByLevel = {
        basic: [
            'Don\'t leave any blanks (no penalty for guessing).',
            'Focus on Module 1 accuracy to avoid falling into the "Easy" Module 2.'
        ],
        advanced: [
            'Master the Desmos calculator shortcuts to save time for hard questions.',
            'Prioritize "Grammar" and "Algebra" for the highest ROI.'
        ],
        intensive: [
            'Take official Bluebook practice tests to adapt to the screen fatigue.',
            'Focus on identifying question types instantly to save reading time.'
        ],
        elite: [
            'Careless errors in Module 1 are costly - verify every easy question.',
            'Practice with "Hard Module" specific question banks.'
        ]
    };

    return { level, levelText, rw: rwMap[rwBand], math: mathMap[mathBand], advice: adviceByLevel[level] };
}

function renderAnalysis(analysis) {
    const section = document.getElementById('analysisSection');
    if (!section) return;
    const badge = document.getElementById('levelBadge');
    badge.textContent = `${analysis.levelText} Level`;
    badge.className = `badge ${analysis.level}`;
    document.getElementById('rwAnalysis').innerHTML = analysis.rw.map(t => `<li>${t}</li>`).join('');
    document.getElementById('mathAnalysis').innerHTML = analysis.math.map(t => `<li>${t}</li>`).join('');
    document.getElementById('adviceList').innerHTML = analysis.advice.map(t => `<li>${t}</li>`).join('');
    section.style.display = 'block';
    section.classList.add('fade-in');
}

function getTier(total) { return total < 900 ? 'basic' : total < 1200 ? 'advanced' : total < 1400 ? 'intensive' : 'elite'; }

function scoreDistance(total, s) {
    if (total >= s.sat25 && total <= s.sat75) return 0;
    if (total < s.sat25) return s.sat25 - total;
    return total - s.sat75;
}

function filterSchools(params) {
    return SCHOOL_DATA.filter(s => {
        if (params.type && params.type !== 'all' && s.type !== params.type) return false;
        if (params.admitRange && params.admitRange !== 'all') {
            const parts = params.admitRange.split('-');
            const min = parseInt(parts[0]);
            const max = parseInt(parts[1]);
            if (!(s.admitRate >= min && s.admitRate <= max)) return false;
        }
        return true;
    });
}

function rankSchools(total, list) {
    const order = { fit: 0, safety: 1, reach: 2 };
// === 修改 script.js 中的 classify 函数 ===

function classify(totalScore, s) {
    // 针对超级名校 (录取率 < 10%) 的特殊处理：
    // 只有分数非常高才算 Fit，否则容易给学生误导
    if (s.admitRate < 10) {
        if (totalScore >= s.sat75) return 'fit'; // 对于哈佛耶鲁，达到75%分位才算Fit
        if (totalScore >= s.sat25) return 'reach'; // 即使在区间内，也算Reach
        return 'reach'; // 低于区间更是Reach
    }

    // 普通学校逻辑保持不变
    if (totalScore >= s.sat25 && totalScore <= s.sat75) return 'fit';
    if (totalScore > s.sat75) return 'safety';
    return 'reach';
}
    function recommendScore(totalScore, s) {
        const dist = scoreDistance(totalScore, s);
        const closeness = 1 / (1 + dist / 100);
        const admit = Math.max(0, Math.min(1, s.admitRate / 100));
        const tag = classify(totalScore, s);
        const weights = tag === 'fit' ? [0.6, 0.4] : tag === 'safety' ? [0.3, 0.7] : [0.7, 0.3];
        return Math.round(100 * (weights[0] * closeness + weights[1] * admit));
    }
    return list.slice().sort((a, b) => {
        const ca = order[classify(total, a)];
        const cb = order[classify(total, b)];
        if (ca !== cb) return ca - cb;
        const ra = recommendScore(total, a);
        const rb = recommendScore(total, b);
        if (ra !== rb) return rb - ra;
        return a.admitRate - b.admitRate;
    });
}

function renderSchools(list, append=false) {
    const grid = document.getElementById('schoolResults');
    if (!append) grid.innerHTML = '';
    if (!list.length) {
        grid.innerHTML = '<div class="no-results">No matches. Please adjust filters.</div>';
        return;
    }
    const frag = document.createDocumentFragment();
    list.forEach(s => {
        const card = document.createElement('div');
        card.className = 'school-card fade-in';
        const tag = (currentTotalScore >= s.sat25 && currentTotalScore <= s.sat75) ? 'fit' : (currentTotalScore > s.sat75 ? 'safety' : 'reach');
        const tagLabel = { fit: 'Match', safety: 'Safety', reach: 'Reach' }[tag];
        const rec = 85; // simplified logic for visual
        const slug = getSlug(s.name); // Generate internal link slug
        
        card.innerHTML = `
            <div class="school-header">
                <a href="college/${slug}/index.html" class="school-name">${s.name}</a>
                <span class="chip ${s.type.toLowerCase()}">${s.type}</span>
                <span class="chip tag ${tag}">${tagLabel}</span>
            </div>
            <div class="school-meta">
                <span class="chip country">${s.state}, ${s.country}</span>
                <span class="stat">SAT ${s.sat25}–${s.sat75}</span>
                <span class="stat">Admit ${s.admitRate}%</span>
            </div>
            <div class="school-actions">
                <a href="college/${slug}/index.html" class="btn-link">View Analysis</a>
            </div>
        `;
        frag.appendChild(card);
    });
    grid.appendChild(frag);
}

let schoolRenderState = { lastList: [], rendered: 0 };
let currentTotalScore = 0;

function updateSchoolResults(force=false) {
    const scoreInput = document.getElementById('schoolScoreInput');
    const rangeInput = document.getElementById('schoolScoreRange');
    const display = document.getElementById('schoolScoreDisplay');
    const typeSel = document.getElementById('schoolTypeSelect');
    const admitSel = document.getElementById('admitRateSelect');
    const badge = document.getElementById('schoolsLevelBadge');
    
    let total = parseInt(scoreInput.value || rangeInput.value);
    if (isNaN(total)) total = 1200;
    if (total < 400) total = 400; if (total > 1600) total = 1600;
    
    scoreInput.value = total;
    rangeInput.value = total;
    display.textContent = total;
    
    const tier = getTier(total);
    const levelText = { basic:'Basic', advanced:'Advanced', intensive:'Intensive', elite:'Elite' }[tier];
    badge.textContent = `${levelText} Level`;
    badge.className = `badge ${tier}`;
    currentTotalScore = total;
    
    const filtered = filterSchools({ type: typeSel.value, admitRange: admitSel.value });
    const ranked = rankSchools(total, filtered);
    schoolRenderState.lastList = ranked;
    schoolRenderState.rendered = 0;
    
    const initial = ranked.slice(0, 30);
    renderSchools(initial);
    schoolRenderState.rendered = initial.length;
    
    const stats = document.getElementById('schoolsStats');
    const fitCount = ranked.filter(s => (total >= s.sat25 && total <= s.sat75)).length;
    const safetyCount = ranked.filter(s => (total > s.sat75)).length;
    const reachCount = ranked.filter(s => (total < s.sat25)).length;
    stats.textContent = `Match ${fitCount} • Safety ${safetyCount} • Reach ${reachCount} • Total ${ranked.length}`;
    
    document.getElementById('schoolLoadMore').style.display = schoolRenderState.rendered < ranked.length ? 'inline-block' : 'none';
}

function initializeSchoolSearch() {
    const section = document.getElementById('schoolsSection');
    if (!section) return;
    const scoreInput = document.getElementById('schoolScoreInput');
    const rangeInput = document.getElementById('schoolScoreRange');
    const typeSel = document.getElementById('schoolTypeSelect');
    const admitSel = document.getElementById('admitRateSelect');
    const loadBtn = document.getElementById('schoolLoadMore');
    
    scoreInput.addEventListener('input', () => updateSchoolResults());
    rangeInput.addEventListener('input', () => { scoreInput.value = rangeInput.value; updateSchoolResults(); });
    typeSel.addEventListener('change', () => updateSchoolResults());
    admitSel.addEventListener('change', () => updateSchoolResults());
    
    loadBtn.addEventListener('click', () => {
        const remaining = schoolRenderState.lastList.slice(schoolRenderState.rendered, schoolRenderState.rendered + 30);
        renderSchools(remaining, true);
        schoolRenderState.rendered += remaining.length;
        document.getElementById('schoolLoadMore').style.display = schoolRenderState.rendered < schoolRenderState.lastList.length ? 'inline-block' : 'none';
    });
}

function showSchoolsWithScore(total) {
    const section = document.getElementById('schoolsSection');
    if (!section) return;
    section.style.display = 'block';
    document.getElementById('schoolScoreInput').value = total;
    document.getElementById('schoolScoreRange').value = total;
    updateSchoolResults(true);
}