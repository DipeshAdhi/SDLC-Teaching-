/* ===================================================================
   SDLC Interactive Learning Platform — script.js
   =================================================================== */

// ─── Data ────────────────────────────────────────────────────────────
const STAGES = [
    {
        id: 1, title: "Initiation", icon: "🚀",
        shortDesc: "Project conception and feasibility analysis",
        description: "The initiation phase is where the project begins. The business need or opportunity is identified, and a feasibility study is conducted to determine if the project is viable.",
        activities: ["Identify business need or opportunity", "Conduct feasibility study", "Define project scope at high level", "Identify key stakeholders"],
        outputs: ["Feasibility study report", "Project charter", "Initial risk assessment"]
    },
    {
        id: 2, title: "System Concept Development", icon: "💡",
        shortDesc: "Define system boundaries and user expectations",
        description: "In this phase, the system concept is developed by defining the scope and boundaries. User expectations are gathered and a conceptual design is created.",
        activities: ["Define system scope and boundaries", "Gather initial user requirements", "Create conceptual design", "Identify system interfaces"],
        outputs: ["System concept document", "Preliminary requirements", "Conceptual architecture"]
    },
    {
        id: 3, title: "Planning", icon: "📋",
        shortDesc: "Project plan, resources, and schedule",
        description: "The planning phase involves creating a detailed project plan that outlines tasks, timelines, resources, and milestones. Risk management and quality assurance plans are also developed.",
        activities: ["Develop project management plan", "Define tasks and timelines", "Allocate resources and budget", "Create risk management plan"],
        outputs: ["Project plan", "Resource allocation matrix", "Risk management plan", "Schedule baseline"]
    },
    {
        id: 4, title: "Requirements Analysis", icon: "📊",
        shortDesc: "Detailed functional and non-functional requirements",
        description: "This phase focuses on gathering detailed requirements from stakeholders. Both functional and non-functional requirements are documented and validated.",
        activities: ["Conduct requirements gathering sessions", "Analyze and document requirements", "Create use cases and user stories", "Validate requirements with stakeholders"],
        outputs: ["Requirements specification document", "Use case diagrams", "Data flow diagrams", "Requirements traceability matrix"]
    },
    {
        id: 5, title: "Design", icon: "🎨",
        shortDesc: "System architecture and detailed design",
        description: "The design phase transforms requirements into a blueprint for the system. This includes both high-level architecture design and detailed component design.",
        activities: ["Create system architecture", "Design database schema", "Design user interface mockups", "Define APIs and interfaces"],
        outputs: ["System design document", "Database design", "UI/UX wireframes", "API specifications"]
    },
    {
        id: 6, title: "Development", icon: "💻",
        shortDesc: "Actual coding and implementation",
        description: "During development, the actual source code is written based on design specifications. This is typically the longest phase of the SDLC.",
        activities: ["Write source code", "Perform unit testing", "Code review and refactoring", "Version control management"],
        outputs: ["Source code", "Unit test results", "Code documentation", "Build artifacts"]
    },
    {
        id: 7, title: "Integration & Testing", icon: "🧪",
        shortDesc: "System testing and quality assurance",
        description: "All modules are integrated and the complete system is tested to ensure it meets the specified requirements. Various types of testing are performed.",
        activities: ["Integration testing", "System testing", "User acceptance testing (UAT)", "Performance and security testing"],
        outputs: ["Test results and reports", "Bug reports", "Performance benchmarks", "UAT sign-off"]
    },
    {
        id: 8, title: "Deployment & Maintenance", icon: "🚢",
        shortDesc: "Release to production and ongoing support",
        description: "The system is deployed to the production environment and made available to users. Ongoing maintenance includes bug fixes, updates, and enhancements.",
        activities: ["Deploy to production environment", "User training and documentation", "Monitor system performance", "Handle bug fixes and updates"],
        outputs: ["Deployed system", "User manuals", "Maintenance logs", "Change requests"]
    }
];

const MODELS = {
    waterfall: {
        title: "Waterfall Model",
        icon: "🌊",
        description: "The Waterfall model is a linear sequential approach where each phase must be completed before the next phase begins. It flows steadily downwards like a waterfall through the phases.",
        advantages: [
            "Simple and easy to understand and use",
            "Easy to manage due to rigidity of the model",
            "Phases are processed and completed one at a time",
            "Works well for smaller projects with clear requirements",
            "Customer involvement is not required during development"
        ],
        disadvantages: [
            "No feedback path for feasibility study phase",
            "Not suitable for projects with unclear requirements",
            "Can be more costly due to rigid structure",
            "High risk and uncertainty",
            "Not ideal for complex and large projects"
        ],
        bestFor: "Small to medium projects with well-understood, stable requirements"
    },
    prototype: {
        title: "Prototype Model",
        icon: "🔬",
        description: "The Prototype model involves creating an incomplete version of the software to allow users to evaluate and provide feedback. The prototype is refined iteratively until requirements are clear.",
        advantages: [
            "Users are actively involved in the development",
            "Errors can be detected much earlier",
            "Quicker user feedback leading to better solutions",
            "Missing functionality can be identified easily",
            "Reduces risk of project failure"
        ],
        disadvantages: [
            "Leads to implementing then repairing approach",
            "May increase the complexity of the system",
            "Incomplete or inadequate problem analysis",
            "Users may become attached to the prototype",
            "Can lead to poorly documented development"
        ],
        bestFor: "Projects where requirements are unclear or need user validation"
    },
    spiral: {
        title: "Spiral Model",
        icon: "🌀",
        description: "The Spiral model combines iterative development with systematic risk analysis. Each iteration goes through planning, risk analysis, engineering, and evaluation phases, spiraling outward.",
        advantages: [
            "High amount of risk analysis is performed",
            "Good for large and mission-critical projects",
            "Strong approval and documentation control",
            "Software is produced early in the life cycle",
            "Accommodates changes and additional functionality"
        ],
        disadvantages: [
            "Can be a costly model to use",
            "Risk analysis requires highly specific expertise",
            "Project success depends heavily on risk analysis",
            "Not suitable for smaller or low-risk projects",
            "Complex model to manage and track"
        ],
        bestFor: "Large, complex, mission-critical projects with significant risks"
    },
    iterative: {
        title: "Incremental & Iterative",
        icon: "🔄",
        description: "The Incremental and Iterative model develops the system through repeated cycles (iterations), each delivering a portion of functionality. Each iteration builds upon the previous one.",
        advantages: [
            "Produces working software early in the cycle",
            "More flexible and less costly to change scope",
            "Testing and debugging during smaller iterations",
            "Risk is easier to manage in increments",
            "Customers can provide feedback on each increment"
        ],
        disadvantages: [
            "Requires good planning and design",
            "Total cost can be higher than waterfall",
            "Needs clear definition of complete system",
            "Management complexity increases with iterations",
            "Requires well-defined module interfaces"
        ],
        bestFor: "Large projects where requirements are expected to evolve over time"
    }
};

const QUIZ_QUESTIONS = [
    {
        question: "What is the primary purpose of SDLC?",
        options: ["To write code faster", "To systematically develop software in a disciplined manner", "To reduce the number of developers", "To eliminate testing"],
        correct: 1
    },
    {
        question: "Which stage comes FIRST in the SDLC?",
        options: ["Planning", "Requirements Analysis", "Initiation", "Design"],
        correct: 2
    },
    {
        question: "In the Waterfall model, can you go back to a previous phase?",
        options: ["Yes, anytime", "No, it is a linear sequential model", "Only during testing", "Only with manager approval"],
        correct: 1
    },
    {
        question: "Which model is best suited for large, mission-critical projects?",
        options: ["Waterfall Model", "Prototype Model", "Spiral Model", "None of the above"],
        correct: 2
    },
    {
        question: "What is a key advantage of the Prototype model?",
        options: ["No user involvement needed", "Errors can be detected much earlier", "It is the cheapest model", "No documentation required"],
        correct: 1
    },
    {
        question: "During which SDLC stage is actual source code written?",
        options: ["Design", "Planning", "Development", "Testing"],
        correct: 2
    },
    {
        question: "What does UAT stand for?",
        options: ["Universal Application Test", "User Acceptance Testing", "Unified Architecture Template", "User Automated Testing"],
        correct: 1
    },
    {
        question: "Which model combines iterative development with risk analysis?",
        options: ["Waterfall Model", "Prototype Model", "Spiral Model", "Incremental Model"],
        correct: 2
    },
    {
        question: "What is the LAST stage of the SDLC?",
        options: ["Testing", "Deployment & Maintenance", "Design", "Integration"],
        correct: 1
    },
    {
        question: "Which is a disadvantage of the Waterfall model?",
        options: ["Too much user involvement", "Not suitable for projects with unclear requirements", "Too many iterations", "Requires risk analysis expertise"],
        correct: 1
    }
];

// ─── DOM Ready ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavbar();
    initStages();
    initDragDrop();
    initModels();
    initQuiz();
    initScrollAnimations();
});

// ─── Background Particles ────────────────────────────────────────────
function initParticles() {
    const container = document.getElementById('bgParticles');
    const colors = ['#818cf8','#c084fc','#34d399','#38bdf8','#fb7185'];
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 6 + 2;
        p.style.cssText = `
            width:${size}px; height:${size}px;
            left:${Math.random()*100}%;
            background:${colors[Math.floor(Math.random()*colors.length)]};
            animation-duration:${Math.random()*20+15}s;
            animation-delay:${Math.random()*15}s;
        `;
        container.appendChild(p);
    }
}

// ─── Navbar ──────────────────────────────────────────────────────────
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('mobileMenu');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveNav();
    });

    toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => menu.classList.remove('open'));
    });
}

function updateActiveNav() {
    const sections = ['hero','stages','arrange','models','quiz'];
    const scrollPos = window.scrollY + 200;
    let current = 'hero';
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) current = id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.section === current);
    });
}

// ─── Stages Timeline ─────────────────────────────────────────────────
function initStages() {
    const timeline = document.getElementById('stagesTimeline');
    const accents = [
        'linear-gradient(135deg,#818cf8,#6366f1)',
        'linear-gradient(135deg,#c084fc,#a855f7)',
        'linear-gradient(135deg,#34d399,#10b981)',
        'linear-gradient(135deg,#38bdf8,#0ea5e9)',
        'linear-gradient(135deg,#fb7185,#f43f5e)',
        'linear-gradient(135deg,#fbbf24,#f59e0b)',
        'linear-gradient(135deg,#818cf8,#c084fc)',
        'linear-gradient(135deg,#34d399,#38bdf8)'
    ];

    STAGES.forEach((stage, i) => {
        const card = document.createElement('div');
        card.className = 'stage-card';
        card.style.setProperty('--card-accent', accents[i]);
        card.innerHTML = `
            <span class="stage-card-number">${String(stage.id).padStart(2,'0')}</span>
            <span class="stage-card-icon">${stage.icon}</span>
            <h3 class="stage-card-title">${stage.title}</h3>
            <p class="stage-card-desc">${stage.shortDesc}</p>
        `;
        card.addEventListener('click', () => openStageModal(stage));
        timeline.appendChild(card);
    });
}

function openStageModal(stage) {
    const modal = document.getElementById('stageModal');
    document.getElementById('modalIcon').textContent = stage.icon;
    document.getElementById('modalTitle').textContent = stage.title;
    document.getElementById('modalDescription').textContent = stage.description;

    const details = document.getElementById('modalDetails');
    details.innerHTML = `
        <div class="modal-detail-group">
            <div class="modal-detail-label">Key Activities</div>
            <ul class="modal-detail-list">
                ${stage.activities.map(a => `<li>${a}</li>`).join('')}
            </ul>
        </div>
        <div class="modal-detail-group">
            <div class="modal-detail-label">Outputs / Deliverables</div>
            <ul class="modal-detail-list">
                ${stage.outputs.map(o => `<li>${o}</li>`).join('')}
            </ul>
        </div>
    `;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('stageModalOverlay').addEventListener('click', closeModal);
function closeModal() {
    document.getElementById('stageModal').classList.remove('open');
    document.body.style.overflow = '';
}

// ─── Drag & Drop Challenge ───────────────────────────────────────────
let dragBlocks = [];

function initDragDrop() {
    shuffleAndRender();

    document.getElementById('checkOrderBtn').addEventListener('click', checkOrder);
    document.getElementById('shuffleBtn').addEventListener('click', shuffleAndRender);
    document.getElementById('resetBtn').addEventListener('click', () => {
        shuffleAndRender();
        clearFeedback();
        updateScore(0);
    });
}

function shuffleAndRender() {
    const shuffled = [...STAGES].sort(() => Math.random() - 0.5);
    dragBlocks = shuffled;
    renderBlocks();
    clearFeedback();
    updateScore(0);
}

function renderBlocks() {
    const zone = document.getElementById('dropZone');
    zone.innerHTML = '';

    dragBlocks.forEach((stage, index) => {
        const block = document.createElement('div');
        block.className = 'drag-block';
        block.draggable = true;
        block.dataset.id = stage.id;
        block.dataset.index = index;

        block.innerHTML = `
            <div class="drag-handle"><span></span><span></span><span></span></div>
            <span class="drag-icon">${stage.icon}</span>
            <div class="drag-info">
                <div class="drag-title">${stage.title}</div>
                <div class="drag-subtitle">${stage.shortDesc}</div>
            </div>
            <span class="drag-number">${index + 1}</span>
            <span class="drag-status"></span>
        `;

        // Desktop drag events
        block.addEventListener('dragstart', handleDragStart);
        block.addEventListener('dragend', handleDragEnd);
        block.addEventListener('dragover', handleDragOver);
        block.addEventListener('drop', handleDrop);

        // Touch events for mobile
        block.addEventListener('touchstart', handleTouchStart, {passive: false});
        block.addEventListener('touchmove', handleTouchMove, {passive: false});
        block.addEventListener('touchend', handleTouchEnd);

        zone.appendChild(block);
    });
}

let dragSrcEl = null;

function handleDragStart(e) {
    dragSrcEl = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.index);
}
function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.drag-block').forEach(b => b.classList.remove('drag-over'));
}
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}
function handleDrop(e) {
    e.preventDefault();
    if (dragSrcEl === this) return;
    const fromIdx = parseInt(dragSrcEl.dataset.index);
    const toIdx = parseInt(this.dataset.index);

    // Swap in array
    const temp = dragBlocks[fromIdx];
    dragBlocks[fromIdx] = dragBlocks[toIdx];
    dragBlocks[toIdx] = temp;

    renderBlocks();
    clearFeedback();
}

// Touch drag support
let touchStartY = 0;
let touchEl = null;
let touchClone = null;

function handleTouchStart(e) {
    touchEl = this;
    touchStartY = e.touches[0].clientY;
    this.classList.add('dragging');
}
function handleTouchMove(e) {
    e.preventDefault();
    if (!touchEl) return;
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    const targetBlock = target ? target.closest('.drag-block') : null;

    document.querySelectorAll('.drag-block').forEach(b => b.style.borderColor = '');
    if (targetBlock && targetBlock !== touchEl) {
        targetBlock.style.borderColor = 'var(--accent-indigo)';
    }
}
function handleTouchEnd(e) {
    if (!touchEl) return;
    touchEl.classList.remove('dragging');

    const touch = e.changedTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    const targetBlock = target ? target.closest('.drag-block') : null;

    if (targetBlock && targetBlock !== touchEl) {
        const fromIdx = parseInt(touchEl.dataset.index);
        const toIdx = parseInt(targetBlock.dataset.index);
        const temp = dragBlocks[fromIdx];
        dragBlocks[fromIdx] = dragBlocks[toIdx];
        dragBlocks[toIdx] = temp;
        renderBlocks();
        clearFeedback();
    }

    document.querySelectorAll('.drag-block').forEach(b => b.style.borderColor = '');
    touchEl = null;
}

function checkOrder() {
    let correct = 0;
    const blocks = document.querySelectorAll('.drag-block');
    blocks.forEach((block, index) => {
        const stageId = parseInt(block.dataset.id);
        const isCorrect = stageId === index + 1;
        block.classList.remove('correct', 'incorrect');
        block.classList.add(isCorrect ? 'correct' : 'incorrect');
        block.querySelector('.drag-status').textContent = isCorrect ? '✓' : '✗';
        if (isCorrect) correct++;
    });

    updateScore(correct);
    showFeedback(correct);

    if (correct === 8) {
        launchConfetti();
    }
}

function updateScore(correct) {
    document.getElementById('scoreText').textContent = `${correct}/8`;
    const circle = document.getElementById('scoreCircle');
    const circumference = 2 * Math.PI * 45; // 283
    const offset = circumference - (correct / 8) * circumference;
    circle.style.strokeDashoffset = offset;
}

function showFeedback(correct) {
    const fb = document.getElementById('challengeFeedback');
    let cls, msg;
    if (correct === 8) {
        cls = 'success'; msg = '🎉 Perfect! All stages are in the correct order!';
    } else if (correct >= 5) {
        cls = 'partial'; msg = `⚡ Almost there! ${correct}/8 correct — keep trying!`;
    } else {
        cls = 'error'; msg = `💡 ${correct}/8 correct. Try rearranging the blocks!`;
    }
    fb.innerHTML = `<div class="feedback-message ${cls}">${msg}</div>`;
}

function clearFeedback() {
    document.getElementById('challengeFeedback').innerHTML = '';
    document.querySelectorAll('.drag-block').forEach(b => {
        b.classList.remove('correct','incorrect');
        const status = b.querySelector('.drag-status');
        if (status) status.textContent = '';
    });
}

// ─── Confetti ────────────────────────────────────────────────────────
function launchConfetti() {
    const colors = ['#818cf8','#c084fc','#34d399','#fb7185','#fbbf24','#38bdf8'];
    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.cssText = `
            left: ${Math.random()*100}%;
            top: -10px;
            background: ${colors[Math.floor(Math.random()*colors.length)]};
            width: ${Math.random()*8+4}px;
            height: ${Math.random()*8+4}px;
            border-radius: ${Math.random()>0.5?'50%':'2px'};
            animation-duration: ${Math.random()*2+2}s;
            animation-delay: ${Math.random()*0.5}s;
        `;
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 4000);
    }
}

// ─── Models ──────────────────────────────────────────────────────────
function initModels() {
    renderModel('waterfall');

    document.querySelectorAll('.model-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.model-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderModel(tab.dataset.model);
        });
    });
}

function renderModel(modelKey) {
    const model = MODELS[modelKey];
    const container = document.getElementById('modelContent');

    let visualHTML = '';
    switch (modelKey) {
        case 'waterfall':
            visualHTML = `<div class="waterfall-visual">
                ${['Requirements','Design','Implementation','Testing','Deployment','Maintenance']
                    .map((s, i) => `<div class="waterfall-step">${s}</div>${i<5?'<div class="waterfall-arrow">↓</div>':''}`).join('')}
            </div>`;
            break;
        case 'prototype':
            visualHTML = `<div class="prototype-visual">
                <div class="proto-cycle">
                    <div class="proto-step">Identify Requirements</div>
                    <div class="proto-arrow">→</div>
                    <div class="proto-step">Build Prototype</div>
                    <div class="proto-arrow">→</div>
                    <div class="proto-step">User Review</div>
                </div>
                <div class="proto-feedback">🔄 Refine & Iterate Until Approved</div>
                <div class="proto-cycle">
                    <div class="proto-step">Engineer Product</div>
                    <div class="proto-arrow">→</div>
                    <div class="proto-step">Test & Deploy</div>
                </div>
            </div>`;
            break;
        case 'spiral':
            visualHTML = `<div class="spiral-visual">
                <div class="spiral-ring spiral-ring-1"></div>
                <div class="spiral-ring spiral-ring-2"></div>
                <div class="spiral-ring spiral-ring-3"></div>
                <div class="spiral-ring spiral-ring-4"></div>
                <div class="spiral-label" style="top:-8px;left:50%;transform:translateX(-50%)">Planning</div>
                <div class="spiral-label" style="top:50%;right:-14px;transform:translateY(-50%)">Risk Analysis</div>
                <div class="spiral-label" style="bottom:-8px;left:50%;transform:translateX(-50%)">Engineering</div>
                <div class="spiral-label" style="top:50%;left:-14px;transform:translateY(-50%)">Evaluation</div>
            </div>`;
            break;
        case 'iterative':
            const iterations = [
                { label: 'V1', width: '35%', color: '#818cf8', text: 'Core Module' },
                { label: 'V2', width: '55%', color: '#c084fc', text: 'Core + Features' },
                { label: 'V3', width: '75%', color: '#34d399', text: '+ Integration' },
                { label: 'V4', width: '100%', color: '#38bdf8', text: 'Complete System' }
            ];
            visualHTML = `<div class="iterative-visual">
                ${iterations.map(it => `
                    <div class="iter-iteration">
                        <span class="iter-label">${it.label}</span>
                        <div class="iter-bar">
                            <div class="iter-bar-fill" style="width:${it.width};background:${it.color};opacity:0.3;"></div>
                            <span style="position:relative;z-index:1;">${it.text}</span>
                        </div>
                    </div>
                `).join('')}
            </div>`;
            break;
    }

    container.innerHTML = `
        <div class="model-card">
            <div class="model-visual">${visualHTML}</div>
            <div class="model-info">
                <h3 class="model-title">${model.icon} ${model.title}</h3>
                <p class="model-description">${model.description}</p>
                <div class="model-best-for" style="padding:1rem 1.4rem;background:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.2);border-radius:var(--radius-md);font-size:1.3rem;color:var(--accent-sky);">
                    <strong>Best For:</strong> ${model.bestFor}
                </div>
                <div class="model-pros-cons">
                    <div class="pros-card">
                        <div class="pros-title">✓ Advantages</div>
                        <ul class="pros-list">
                            ${model.advantages.map(a => `<li>${a}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="cons-card">
                        <div class="cons-title">✗ Disadvantages</div>
                        <ul class="cons-list">
                            ${model.disadvantages.map(d => `<li>${d}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ─── Quiz ────────────────────────────────────────────────────────────
let quizState = { current: 0, answers: new Array(QUIZ_QUESTIONS.length).fill(-1) };

function initQuiz() {
    renderQuizQuestion();

    document.getElementById('quizNext').addEventListener('click', () => {
        if (quizState.current < QUIZ_QUESTIONS.length - 1) {
            quizState.current++;
            renderQuizQuestion();
        } else {
            showQuizResults();
        }
    });

    document.getElementById('quizPrev').addEventListener('click', () => {
        if (quizState.current > 0) {
            quizState.current--;
            renderQuizQuestion();
        }
    });

    document.getElementById('retakeQuiz').addEventListener('click', () => {
        quizState = { current: 0, answers: new Array(QUIZ_QUESTIONS.length).fill(-1) };
        document.getElementById('quizContainer').style.display = '';
        document.getElementById('quizResults').style.display = 'none';
        renderQuizQuestion();
    });
}

function renderQuizQuestion() {
    const q = QUIZ_QUESTIONS[quizState.current];
    const idx = quizState.current;

    document.getElementById('quizCurrent').textContent = idx + 1;
    document.getElementById('quizTotal').textContent = QUIZ_QUESTIONS.length;
    document.getElementById('quizProgressBar').style.width = `${((idx + 1) / QUIZ_QUESTIONS.length) * 100}%`;
    document.getElementById('quizQuestion').textContent = q.question;

    const letters = ['A','B','C','D'];
    const optionsEl = document.getElementById('quizOptions');
    optionsEl.innerHTML = q.options.map((opt, i) => `
        <div class="quiz-option ${quizState.answers[idx] === i ? 'selected' : ''}" data-option="${i}">
            <span class="quiz-option-letter">${letters[i]}</span>
            <span>${opt}</span>
        </div>
    `).join('');

    optionsEl.querySelectorAll('.quiz-option').forEach(el => {
        el.addEventListener('click', () => {
            quizState.answers[idx] = parseInt(el.dataset.option);
            renderQuizQuestion();
        });
    });

    document.getElementById('quizPrev').disabled = idx === 0;
    document.getElementById('quizNext').textContent = idx === QUIZ_QUESTIONS.length - 1 ? 'Submit' : 'Next';
}

function showQuizResults() {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q, i) => {
        if (quizState.answers[i] === q.correct) correct++;
    });

    document.getElementById('quizContainer').style.display = 'none';
    const results = document.getElementById('quizResults');
    results.style.display = '';

    const pct = correct / QUIZ_QUESTIONS.length;
    let emoji, title, text;
    if (pct === 1) { emoji = '🏆'; title = 'Perfect Score!'; text = 'You are an SDLC master!'; }
    else if (pct >= 0.7) { emoji = '🎉'; title = 'Great Job!'; text = 'You have a solid understanding of SDLC.'; }
    else if (pct >= 0.4) { emoji = '💪'; title = 'Good Effort!'; text = 'Review the stages and models to improve.'; }
    else { emoji = '📚'; title = 'Keep Learning!'; text = 'Go through the stages section and try again.'; }

    document.getElementById('resultsEmoji').textContent = emoji;
    document.getElementById('resultsTitle').textContent = title;
    document.getElementById('resultsScore').textContent = `${correct}/${QUIZ_QUESTIONS.length}`;
    document.getElementById('resultsText').textContent = text;

    if (pct >= 0.8) launchConfetti();
}

// ─── Scroll Animations ──────────────────────────────────────────────
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.stage-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}
