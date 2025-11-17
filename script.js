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
    showSchoolsWithScore(scores.total);
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
    initializeSchoolSearch();
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

const SCHOOL_DATA = [
    {name:'Harvard University',country:'US',state:'MA',type:'Private',sat25:1480,sat75:1580,admitRate:3,url:'https://www.harvard.edu/'},
    {name:'Massachusetts Institute of Technology',country:'US',state:'MA',type:'Private',sat25:1510,sat75:1580,admitRate:4,url:'https://www.mit.edu/'},
    {name:'Stanford University',country:'US',state:'CA',type:'Private',sat25:1500,sat75:1570,admitRate:4,url:'https://www.stanford.edu/'},
    {name:'California Institute of Technology',country:'US',state:'CA',type:'Private',sat25:1530,sat75:1580,admitRate:3,url:'https://www.caltech.edu/'},
    {name:'Princeton University',country:'US',state:'NJ',type:'Private',sat25:1490,sat75:1580,admitRate:4,url:'https://www.princeton.edu/'},
    {name:'Yale University',country:'US',state:'CT',type:'Private',sat25:1490,sat75:1580,admitRate:5,url:'https://www.yale.edu/'},
    {name:'Columbia University',country:'US',state:'NY',type:'Private',sat25:1490,sat75:1570,admitRate:4,url:'https://www.columbia.edu/'},
    {name:'University of Chicago',country:'US',state:'IL',type:'Private',sat25:1510,sat75:1580,admitRate:6,url:'https://www.uchicago.edu/'},
    {name:'Duke University',country:'US',state:'NC',type:'Private',sat25:1450,sat75:1570,admitRate:6,url:'https://www.duke.edu/'},
    {name:'Brown University',country:'US',state:'RI',type:'Private',sat25:1460,sat75:1570,admitRate:6,url:'https://www.brown.edu/'},
    {name:'Dartmouth College',country:'US',state:'NH',type:'Private',sat25:1440,sat75:1560,admitRate:6,url:'https://home.dartmouth.edu/'},
    {name:'Cornell University',country:'US',state:'NY',type:'Private',sat25:1450,sat75:1560,admitRate:8,url:'https://www.cornell.edu/'},
    {name:'Northwestern University',country:'US',state:'IL',type:'Private',sat25:1450,sat75:1540,admitRate:7,url:'https://www.northwestern.edu/'},
    {name:'Johns Hopkins University',country:'US',state:'MD',type:'Private',sat25:1500,sat75:1570,admitRate:7,url:'https://www.jhu.edu/'},
    {name:'Rice University',country:'US',state:'TX',type:'Private',sat25:1470,sat75:1560,admitRate:9,url:'https://www.rice.edu/'},
    {name:'Vanderbilt University',country:'US',state:'TN',type:'Private',sat25:1470,sat75:1570,admitRate:7,url:'https://www.vanderbilt.edu/'},
    {name:'Carnegie Mellon University',country:'US',state:'PA',type:'Private',sat25:1480,sat75:1560,admitRate:14,url:'https://www.cmu.edu/'},
    {name:'University of California, Berkeley',country:'US',state:'CA',type:'Public',sat25:1410,sat75:1540,admitRate:14,url:'https://www.berkeley.edu/'},
    {name:'University of California, Los Angeles',country:'US',state:'CA',type:'Public',sat25:1400,sat75:1550,admitRate:10,url:'https://www.ucla.edu/'},
    {name:'University of Notre Dame',country:'US',state:'IN',type:'Private',sat25:1410,sat75:1550,admitRate:13,url:'https://www.nd.edu/'},
    {name:'Washington University in St. Louis',country:'US',state:'MO',type:'Private',sat25:1460,sat75:1560,admitRate:13,url:'https://wustl.edu/'},
    {name:'Emory University',country:'US',state:'GA',type:'Private',sat25:1420,sat75:1540,admitRate:13,url:'https://www.emory.edu/'},
    {name:'New York University',country:'US',state:'NY',type:'Private',sat25:1410,sat75:1540,admitRate:13,url:'https://www.nyu.edu/'},
    {name:'Tufts University',country:'US',state:'MA',type:'Private',sat25:1440,sat75:1530,admitRate:11,url:'https://www.tufts.edu/'},
    {name:'University of Southern California',country:'US',state:'CA',type:'Private',sat25:1410,sat75:1540,admitRate:12,url:'https://www.usc.edu/'},
    {name:'Boston College',country:'US',state:'MA',type:'Private',sat25:1410,sat75:1520,admitRate:19,url:'https://www.bc.edu/'},
    {name:'University of California, San Diego',country:'US',state:'CA',type:'Public',sat25:1370,sat75:1520,admitRate:34,url:'https://www.ucsd.edu/'},
    {name:'University of Illinois Urbana-Champaign',country:'US',state:'IL',type:'Public',sat25:1340,sat75:1510,admitRate:45,url:'https://illinois.edu/'},
    {name:'University of North Carolina at Chapel Hill',country:'US',state:'NC',type:'Public',sat25:1340,sat75:1510,admitRate:19,url:'https://www.unc.edu/'},
    {name:'Georgia Institute of Technology',country:'US',state:'GA',type:'Public',sat25:1390,sat75:1540,admitRate:17,url:'https://www.gatech.edu/'},
    {name:'Boston University',country:'US',state:'MA',type:'Private',sat25:1340,sat75:1510,admitRate:19,url:'https://www.bu.edu/'},
    {name:'Northeastern University',country:'US',state:'MA',type:'Private',sat25:1420,sat75:1540,admitRate:7,url:'https://www.northeastern.edu/'},
    {name:'Rensselaer Polytechnic Institute',country:'US',state:'NY',type:'Private',sat25:1360,sat75:1520,admitRate:53,url:'https://www.rpi.edu/'},
    {name:'University of Texas at Austin',country:'US',state:'TX',type:'Public',sat25:1340,sat75:1510,admitRate:31,url:'https://www.utexas.edu/'},
    {name:'University of Washington',country:'US',state:'WA',type:'Public',sat25:1300,sat75:1480,admitRate:48,url:'https://www.washington.edu/'},
    {name:'University of Maryland',country:'US',state:'MD',type:'Public',sat25:1310,sat75:1480,admitRate:45,url:'https://umd.edu/'},
    {name:'University of Florida',country:'US',state:'FL',type:'Public',sat25:1340,sat75:1490,admitRate:23,url:'https://www.ufl.edu/'},
    {name:'Purdue University',country:'US',state:'IN',type:'Public',sat25:1260,sat75:1490,admitRate:53,url:'https://www.purdue.edu/'},
    {name:'University of Wisconsin–Madison',country:'US',state:'WI',type:'Public',sat25:1340,sat75:1490,admitRate:49,url:'https://www.wisc.edu/'},
    {name:'Ohio State University',country:'US',state:'OH',type:'Public',sat25:1300,sat75:1440,admitRate:57,url:'https://www.osu.edu/'},
    {name:'Pennsylvania State University',country:'US',state:'PA',type:'Public',sat25:1160,sat75:1360,admitRate:55,url:'https://www.psu.edu/'},
    {name:'University of California, Davis',country:'US',state:'CA',type:'Public',sat25:1280,sat75:1460,admitRate:49,url:'https://www.ucdavis.edu/'},
    {name:'University of California, Irvine',country:'US',state:'CA',type:'Public',sat25:1290,sat75:1510,admitRate:21,url:'https://www.uci.edu/'},
    {name:'University of California, Santa Barbara',country:'US',state:'CA',type:'Public',sat25:1280,sat75:1460,admitRate:37,url:'https://www.ucsb.edu/'},
    {name:'University of California, Santa Cruz',country:'US',state:'CA',type:'Public',sat25:1200,sat75:1400,admitRate:58,url:'https://www.ucsc.edu/'},
    {name:'University of California, Riverside',country:'US',state:'CA',type:'Public',sat25:1140,sat75:1340,admitRate:69,url:'https://www.ucr.edu/'},
    {name:'University of Massachusetts Amherst',country:'US',state:'MA',type:'Public',sat25:1200,sat75:1380,admitRate:60,url:'https://www.umass.edu/'},
    {name:'University of Pittsburgh',country:'US',state:'PA',type:'Public',sat25:1250,sat75:1440,admitRate:49,url:'https://www.pitt.edu/'},
    {name:'University of Minnesota Twin Cities',country:'US',state:'MN',type:'Public',sat25:1270,sat75:1480,admitRate:73,url:'https://twin-cities.umn.edu/'},
    {name:'University of Arizona',country:'US',state:'AZ',type:'Public',sat25:1120,sat75:1360,admitRate:87,url:'https://www.arizona.edu/'},
    {name:'Arizona State University',country:'US',state:'AZ',type:'Public',sat25:1100,sat75:1300,admitRate:88,url:'https://www.asu.edu/'},
    {name:'Oregon State University',country:'US',state:'OR',type:'Public',sat25:1120,sat75:1340,admitRate:89,url:'https://oregonstate.edu/'},
    {name:'Iowa State University',country:'US',state:'IA',type:'Public',sat25:1150,sat75:1340,admitRate:88,url:'https://www.iastate.edu/'},
    {name:'University of Central Florida',country:'US',state:'FL',type:'Public',sat25:1160,sat75:1340,admitRate:45,url:'https://www.ucf.edu/'},
    {name:'Colorado State University',country:'US',state:'CO',type:'Public',sat25:1070,sat75:1280,admitRate:90,url:'https://www.colostate.edu/'},
    {name:'San Diego State University',country:'US',state:'CA',type:'Public',sat25:1110,sat75:1320,admitRate:38,url:'https://www.sdsu.edu/'},
    {name:'California State University, Long Beach',country:'US',state:'CA',type:'Public',sat25:1020,sat75:1240,admitRate:47,url:'https://www.csulb.edu/'},
    {name:'Temple University',country:'US',state:'PA',type:'Public',sat25:1090,sat75:1290,admitRate:72,url:'https://www.temple.edu/'},
    {name:'DePaul University',country:'US',state:'IL',type:'Private',sat25:1070,sat75:1290,admitRate:70,url:'https://www.depaul.edu/'},
    {name:'Baylor University',country:'US',state:'TX',type:'Private',sat25:1180,sat75:1380,admitRate:39,url:'https://www.baylor.edu/'},
    {name:'Southern Methodist University',country:'US',state:'TX',type:'Private',sat25:1250,sat75:1450,admitRate:47,url:'https://www.smu.edu/'},
    {name:'University of Alabama',country:'US',state:'AL',type:'Public',sat25:1060,sat75:1280,admitRate:80,url:'https://www.ua.edu/'},
    {name:'University of Mississippi',country:'US',state:'MS',type:'Public',sat25:1020,sat75:1240,admitRate:89,url:'https://www.olemiss.edu/'},
    {name:'University of North Texas',country:'US',state:'TX',type:'Public',sat25:1060,sat75:1250,admitRate:81,url:'https://www.unt.edu/'},
    {name:'University of Houston',country:'US',state:'TX',type:'Public',sat25:1080,sat75:1300,admitRate:66,url:'https://www.uh.edu/'},
    {name:'Wichita State University',country:'US',state:'KS',type:'Public',sat25:980,sat75:1240,admitRate:91,url:'https://www.wichita.edu/'},
    {name:'Texas State University',country:'US',state:'TX',type:'Public',sat25:990,sat75:1200,admitRate:70,url:'https://www.txst.edu/'},
    {name:'Western Michigan University',country:'US',state:'MI',type:'Public',sat25:1030,sat75:1230,admitRate:85,url:'https://wmich.edu/'},
    {name:'SUNY Albany',country:'US',state:'NY',type:'Public',sat25:1040,sat75:1260,admitRate:68,url:'https://www.albany.edu/'},
    {name:'SUNY Buffalo',country:'US',state:'NY',type:'Public',sat25:1160,sat75:1340,admitRate:67,url:'https://www.buffalo.edu/'},
    {name:'Pace University',country:'US',state:'NY',type:'Private',sat25:1050,sat75:1240,admitRate:88,url:'https://www.pace.edu/'},
    {name:'Seton Hall University',country:'US',state:'NJ',type:'Private',sat25:1200,sat75:1380,admitRate:78,url:'https://www.shu.edu/'},
    {name:'CSU Dominguez Hills',country:'US',state:'CA',type:'Public',sat25:910,sat75:1100,admitRate:89,url:'https://www.csudh.edu/'},
    {name:'Chicago State University',country:'US',state:'IL',type:'Public',sat25:900,sat75:1100,admitRate:47,url:'https://www.csu.edu/'},
    {name:'University of the District of Columbia',country:'US',state:'DC',type:'Public',sat25:900,sat75:1100,admitRate:74,url:'https://www.udc.edu/'},
    {name:'University College London',country:'UK',state:'London',type:'Public',sat25:1400,sat75:1550,admitRate:30,url:'https://www.ucl.ac.uk/'},
    {name:'Imperial College London',country:'UK',state:'London',type:'Public',sat25:1450,sat75:1550,admitRate:15,url:'https://www.imperial.ac.uk/'},
    {name:'London School of Economics',country:'UK',state:'London',type:'Public',sat25:1420,sat75:1550,admitRate:8,url:'https://www.lse.ac.uk/'},
    {name:'King’s College London',country:'UK',state:'London',type:'Public',sat25:1350,sat75:1500,admitRate:13,url:'https://www.kcl.ac.uk/'},
    {name:'University of Edinburgh',country:'UK',state:'Scotland',type:'Public',sat25:1300,sat75:1500,admitRate:40,url:'https://www.ed.ac.uk/'},
    {name:'University of Manchester',country:'UK',state:'England',type:'Public',sat25:1240,sat75:1420,admitRate:59,url:'https://www.manchester.ac.uk/'},
    {name:'University of Warwick',country:'UK',state:'England',type:'Public',sat25:1300,sat75:1500,admitRate:14,url:'https://warwick.ac.uk/'},
    {name:'University of Bristol',country:'UK',state:'England',type:'Public',sat25:1280,sat75:1460,admitRate:28,url:'https://www.bristol.ac.uk/'},
    {name:'University of Toronto',country:'CA',state:'ON',type:'Public',sat25:1330,sat75:1510,admitRate:43,url:'https://www.utoronto.ca/'},
    {name:'University of British Columbia',country:'CA',state:'BC',type:'Public',sat25:1290,sat75:1480,admitRate:52,url:'https://www.ubc.ca/'},
    {name:'McGill University',country:'CA',state:'QC',type:'Public',sat25:1360,sat75:1520,admitRate:47,url:'https://www.mcgill.ca/'},
    {name:'University of Waterloo',country:'CA',state:'ON',type:'Public',sat25:1300,sat75:1480,admitRate:53,url:'https://uwaterloo.ca/'},
    {name:'University of Alberta',country:'CA',state:'AB',type:'Public',sat25:1200,sat75:1400,admitRate:58,url:'https://www.ualberta.ca/'},
    {name:'McMaster University',country:'CA',state:'ON',type:'Public',sat25:1250,sat75:1420,admitRate:58,url:'https://www.mcmaster.ca/'},
    {name:'Western University',country:'CA',state:'ON',type:'Public',sat25:1240,sat75:1420,admitRate:58,url:'https://www.uwo.ca/'},
    {name:'Australian National University',country:'AU',state:'ACT',type:'Public',sat25:1300,sat75:1480,admitRate:35,url:'https://www.anu.edu.au/'},
    {name:'University of Melbourne',country:'AU',state:'VIC',type:'Public',sat25:1300,sat75:1480,admitRate:35,url:'https://www.unimelb.edu.au/'},
    {name:'University of Sydney',country:'AU',state:'NSW',type:'Public',sat25:1280,sat75:1460,admitRate:30,url:'https://www.sydney.edu.au/'},
    {name:'UNSW Sydney',country:'AU',state:'NSW',type:'Public',sat25:1280,sat75:1460,admitRate:30,url:'https://www.unsw.edu.au/'},
    {name:'Monash University',country:'AU',state:'VIC',type:'Public',sat25:1240,sat75:1420,admitRate:40,url:'https://www.monash.edu/'},
    {name:'University of Queensland',country:'AU',state:'QLD',type:'Public',sat25:1200,sat75:1400,admitRate:40,url:'https://www.uq.edu.au/'},
    {name:'National University of Singapore',country:'Other',state:'SG',type:'Public',sat25:1450,sat75:1550,admitRate:5,url:'https://www.nus.edu.sg/'},
    {name:'The University of Hong Kong',country:'Other',state:'HK',type:'Public',sat25:1300,sat75:1480,admitRate:12,url:'https://www.hku.hk/'},
    {name:'Hong Kong University of Science and Technology',country:'Other',state:'HK',type:'Public',sat25:1350,sat75:1500,admitRate:15,url:'https://www.ust.hk/'}
];

function getTier(total) {
    return total < 900 ? 'basic' : total < 1200 ? 'advanced' : total < 1400 ? 'intensive' : 'elite';
}

function scoreDistance(total, s) {
    if (total >= s.sat25 && total <= s.sat75) return 0;
    if (total < s.sat25) return s.sat25 - total;
    return total - s.sat75;
}

function filterSchools(params) {
    return SCHOOL_DATA.filter(s => {
        if (params.country && params.country !== 'all' && s.country !== params.country) return false;
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
    function classify(totalScore, s) {
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
        const da = scoreDistance(total, a);
        const db = scoreDistance(total, b);
        if (da !== db) return da - db;
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
        const dist = scoreDistance(currentTotalScore, s);
        const closeness = 1 / (1 + dist / 100);
        const admit = Math.max(0, Math.min(1, s.admitRate / 100));
        const weights = tag === 'fit' ? [0.6, 0.4] : tag === 'safety' ? [0.3, 0.7] : [0.7, 0.3];
        const rec = Math.round(100 * (weights[0] * closeness + weights[1] * admit));
        card.innerHTML = `
            <div class="school-header">
                <a href="${s.url}" target="_blank" rel="noopener" class="school-name">${s.name}</a>
                <span class="chip ${s.type.toLowerCase()}">${s.type}</span>
                <span class="chip tag ${tag}">${tagLabel}</span>
            </div>
            <div class="school-meta">
                <span class="chip country">${s.country}${s.state?(' · '+s.state):''}</span>
                <span class="stat">SAT ${s.sat25}–${s.sat75}</span>
                <span class="stat">Admit ${s.admitRate}%</span>
            </div>
            <div class="recommend">
                <span class="stat">Recommendation Score</span>
                <div class="recommend-meter ${tag}"><div class="recommend-fill" style="width:${rec}%"></div></div>
            </div>
            <div class="school-actions">
                <a href="${s.url}" target="_blank" rel="noopener" class="btn-link">Official Site</a>
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
    const countrySel = document.getElementById('schoolCountrySelect');
    const typeSel = document.getElementById('schoolTypeSelect');
    const admitSel = document.getElementById('admitRateSelect');
    const badge = document.getElementById('schoolsLevelBadge');
    let total = parseInt(scoreInput.value || rangeInput.value);
    if (isNaN(total)) total = 1200;
    if (total < 400) total = 400;
    if (total > 1600) total = 1600;
    scoreInput.value = total;
    rangeInput.value = total;
    display.textContent = total;
    const tier = getTier(total);
    const levelText = { basic:'Basic', advanced:'Advanced', intensive:'Intensive', elite:'Elite' }[tier];
    badge.textContent = `${levelText} Level`;
    badge.className = `badge ${tier}`;
    currentTotalScore = total;
    const filtered = filterSchools({
        country: countrySel.value,
        type: typeSel.value,
        admitRange: admitSel.value
    });
    const ranked = rankSchools(total, filtered);
    schoolRenderState.lastList = ranked;
    schoolRenderState.rendered = 0;
    schoolRenderState.groupsRendered = new Set();
    const initial = ranked.slice(0, 30);
    renderSchools(initial);
    schoolRenderState.rendered = initial.length;
    const stats = document.getElementById('schoolsStats');
    const fitCount = ranked.filter(s => (total >= s.sat25 && total <= s.sat75)).length;
    const safetyCount = ranked.filter(s => (total > s.sat75)).length;
    const reachCount = ranked.filter(s => (total < s.sat25)).length;
    stats.textContent = `Match ${fitCount} • Safety ${safetyCount} • Reach ${reachCount} • Total ${ranked.length}`;
    const loadBtn = document.getElementById('schoolLoadMore');
    loadBtn.style.display = schoolRenderState.rendered < ranked.length ? 'inline-block' : 'none';
}

function initializeSchoolSearch() {
    const section = document.getElementById('schoolsSection');
    if (!section) return;
    const scoreInput = document.getElementById('schoolScoreInput');
    const rangeInput = document.getElementById('schoolScoreRange');
    const countrySel = document.getElementById('schoolCountrySelect');
    const typeSel = document.getElementById('schoolTypeSelect');
    const admitSel = document.getElementById('admitRateSelect');
    const loadBtn = document.getElementById('schoolLoadMore');
    scoreInput.addEventListener('input', () => updateSchoolResults());
    rangeInput.addEventListener('input', () => {
        scoreInput.value = rangeInput.value;
        updateSchoolResults();
    });
    countrySel.addEventListener('change', () => updateSchoolResults());
    typeSel.addEventListener('change', () => updateSchoolResults());
    admitSel.addEventListener('change', () => updateSchoolResults());
    loadBtn.addEventListener('click', () => {
        const remaining = schoolRenderState.lastList.slice(schoolRenderState.rendered, schoolRenderState.rendered + 30);
        renderSchools(remaining, true);
        schoolRenderState.rendered += remaining.length;
        const btn = document.getElementById('schoolLoadMore');
        btn.style.display = schoolRenderState.rendered < schoolRenderState.lastList.length ? 'inline-block' : 'none';
    });
}

function showSchoolsWithScore(total) {
    const section = document.getElementById('schoolsSection');
    if (!section) return;
    section.style.display = 'block';
    const scoreInput = document.getElementById('schoolScoreInput');
    const rangeInput = document.getElementById('schoolScoreRange');
    scoreInput.value = total;
    rangeInput.value = total;
    updateSchoolResults(true);
    section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
