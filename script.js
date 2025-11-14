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
    const levelText = { basic: 'Basic', advanced: 'Advanced', intensive: 'Intensive', elite: 'Elite' }[level];
    const rwBand = scores.rwScaled < 450 ? 'basic' : scores.rwScaled < 600 ? 'advanced' : scores.rwScaled < 700 ? 'intensive' : 'elite';
    const mathBand = scores.mathScaled < 450 ? 'basic' : scores.mathScaled < 600 ? 'advanced' : scores.mathScaled < 700 ? 'intensive' : 'elite';

    const rwMap = {
        basic: [
            'Common misses: vocabulary, syntax basics, main idea and detail locating',
            'Start with literal locating questions; chunk long sentences; watch connectors',
            'For charts: read axes/units first, then the prompt, not the options'
        ],
        advanced: [
            'Key gaps: long-sentence parsing and pronoun reference tracking',
            'Rhetoric/logic consistency: verify tone and reference alignment with context',
            'For charts: decide expected conclusion, then match with evidence'
        ],
        intensive: [
            'Time management: easy-first, mark-return; avoid overthinking distractors',
            'Beware synonym traps: scope shift and over-absolute wording',
            'Use elimination: prove wrong options instead of hunting the “right” one'
        ],
        elite: [
            'Style consistency and grammar edge cases drive marginal gains',
            'Tiny differences (word strength, reference scope) decide winners',
            'Maintain rhythm and accuracy; don’t let a few very hard items derail you'
        ]
    };

    const mathMap = {
        basic: [
            'Gaps in algebra basics and ratio/unit conversions cause most losses',
            'Equation workflow: define variables → set equations → check units',
            'After computing, recheck signs and units once'
        ],
        advanced: [
            'Build templates for quadratics, systems, exponents and radicals',
            'Probability/statistics: focus on sample space and condition limits',
            'Word problems: draw a quick relationship sketch before forming equations'
        ],
        intensive: [
            'High ROI: function graphs/transformations and parameter problems',
            'Break multi-step applications into stages and intermediate variables',
            'Validation: plug boundary/special values for a fast check'
        ],
        elite: [
            'For complex function properties/parameters: set monotonicity/symmetry/range first',
            'Use estimation and bounds to replace heavy algebra when possible',
            'Balance speed and accuracy; skip extreme outliers if needed'
        ]
    };

    const adviceByLevel = {
        basic: [
            'Maintain an error log: type → cause → fix; note the trigger for each miss',
            '30–45 minutes per day per section; RW start with locating, Math with algebra/ratios',
            'One full timed set per week; train 65/70-min pacing and transitions'
        ],
        advanced: [
            'Refine an “often wrong” list: ~10 items per section, drill in batches',
            'Speed up chart reading and unit conversions with a fixed routine',
            '10-minute review after sets: locating → evidence → elimination chain completeness'
        ],
        intensive: [
            'One full test every two days with strict timing; lock in order and skipping rules',
            'Target 2–3 weak points with 20 focused problems to build muscle memory',
            'Use a checklist: units/signs/bounds/special values'
        ],
        elite: [
            'Hunt the last 30–50 points: micro-train 20–30 items on key weak spots',
            'Stabilize schedule in the last 7 days; avoid big swings in workload',
            'Keep accuracy-first pacing; don’t let outliers disrupt the plan'
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

    badge.textContent = `${analysis.levelText} Level`;
    badge.className = `badge ${analysis.level}`;

    rwList.innerHTML = analysis.rw.map(t => `<li>${t}</li>`).join('');
    mathList.innerHTML = analysis.math.map(t => `<li>${t}</li>`).join('');
    adviceList.innerHTML = analysis.advice.map(t => `<li>${t}</li>`).join('');

    section.style.display = 'block';
    section.classList.add('fade-in');
}
