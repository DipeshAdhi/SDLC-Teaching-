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
        description: "The Waterfall model is a linear sequential approach where each phase must be completed before the next phase begins. It flows steadily downwards like a waterfall through rigid phases.",
        advantages: [
            "Simple and easy to understand and use",
            "Easy to manage due to rigidity of the model",
            "Phases are processed and completed one at a time",
            "Works well for smaller projects with clear requirements",
            "Customer involvement is minimal during actual coding"
        ],
        disadvantages: [
            "No early feedback path for feasibility study phase",
            "Not suitable for projects with unclear requirements",
            "Can be very costly to change requirements late in the cycle",
            "High risk and uncertainty for complex projects",
            "Working software is only delivered at the end"
        ],
        bestFor: "Small to medium projects with well-understood, fixed, and non-negotiable requirements (e.g. Legal/Regulatory Bank Systems)."
    },
    prototype: {
        title: "Prototype Model",
        icon: "🔬",
        description: "The Prototype model involves creating an incomplete or working mock version of the software to allow users to evaluate and provide feedback. The prototype is refined iteratively until requirements are clear.",
        advantages: [
            "Users are actively involved in the development and design",
            "Errors and missing requirements are detected early",
            "Quicker user feedback leads to better UI/UX solutions",
            "Reduces risk of delivering an unwanted product",
            "Ideal when client is unsure of feature details"
        ],
        disadvantages: [
            "May lead to 'implementing then repairing' code rot",
            "May increase system architecture complexity",
            "Incomplete problem analysis if rushed",
            "Users may confuse prototype with final product",
            "Documentation can easily be neglected"
        ],
        bestFor: "Projects where requirements are unclear, novel, or need user validation (e.g. Novel E-Learning Systems in Nepal)."
    },
    incremental: {
        title: "Incremental Model",
        icon: "🧩",
        description: "The Incremental model breaks the system into smaller, manageable subsystems (increments or modules). Each module is developed through full SDLC stages and delivered sequentially as working software.",
        advantages: [
            "Produces working software early (Increment 1, 2, 3)",
            "Easier to manage risk as scope per increment is small",
            "Lower initial delivery cost",
            "Core features are available to users sooner",
            "Feedback on completed modules guides future increments"
        ],
        disadvantages: [
            "Requires careful high-level system architectural planning",
            "Module interfaces must be strictly defined upfront",
            "Total system cost can exceed Waterfall if refactored often",
            "System architecture can break down if increments aren't well isolated"
        ],
        bestFor: "Large systems where core features must launch early while secondary modules follow (e.g. E-Commerce Platform)."
    },
    iterative: {
        title: "Iterative Model",
        icon: "🔄",
        description: "The Iterative model develops an initial simplified version of the whole system, then repeatedly refines and expands the entire software across successive cycles (iterations) until complete.",
        advantages: [
            "Builds a working baseline version early in the cycle",
            "Accommodates requirement changes seamlessly",
            "Testing and debugging are performed during every cycle",
            "Easier to evaluate progress across full system cycles",
            "Risks are identified and mitigated continuously"
        ],
        disadvantages: [
            "Each iteration requires overhead and management",
            "System architecture may shift if iterations alter scope",
            "Requires highly skilled team to refactor continuously",
            "Not suitable for small, simple projects"
        ],
        bestFor: "Complex software requiring progressive refinement across cycles (e.g. Search Engines, Graphic Design Tools)."
    },
    spiral: {
        title: "Spiral Model",
        icon: "🌀",
        description: "The Spiral model combines iterative prototyping with systematic risk assessment. Each phase spirals outwards through 4 quadrants: Planning, Risk Analysis, Engineering, and Evaluation.",
        advantages: [
            "High amount of risk analysis & safety assessment",
            "Good for mission-critical, high-consequence projects",
            "Strong approval and documentation control at every spiral",
            "Prototypes safety-critical features early",
            "Flexible to accommodate complex engineering changes"
        ],
        disadvantages: [
            "Can be a very expensive methodology",
            "Requires specialized expertise in technical risk evaluation",
            "Project success heavily depends on risk analysis phase",
            "Too complex for small or low-risk projects"
        ],
        bestFor: "Massively complex, mission-critical systems where failure is catastrophic (e.g. CAAN Air Traffic Control Systems)."
    },
    comparison: {
        title: "Waterfall vs. Prototype Model",
        icon: "⚖️",
        isComparison: true,
        type: "waterfall_vs_prototype"
    },
    inc_vs_iter: {
        title: "Incremental vs. Iterative Development",
        icon: "🆚",
        isComparison: true,
        type: "incremental_vs_iterative"
    }
};

// ─── Process Blocks for Builder Palette ──────────────────────────────
const PROCESS_BLOCKS = [
    { id: "req", name: "Requirements Analysis", icon: "📊", category: "core", desc: "Gather & document project requirements" },
    { id: "proto", name: "Build Prototype", icon: "🔬", category: "loop", desc: "Construct rapid working mock up" },
    { id: "user_fb", name: "User Feedback Loop", icon: "💬", category: "loop", desc: "Collect user evaluation & comments" },
    { id: "arch", name: "System & DB Design", icon: "🎨", category: "core", desc: "Blueprint architecture & database" },
    { id: "risk", name: "Risk Analysis & Safety Audit", icon: "🛡️", category: "spiral", desc: "Identify & evaluate critical technical risks" },
    { id: "inc_build", name: "Build Module Increment", icon: "🧩", category: "inc", desc: "Develop discrete feature module" },
    { id: "iter_refine", name: "Iterative Refinement Cycle", icon: "🔄", category: "iter", desc: "Refine full system version" },
    { id: "dev", name: "Coding & Implementation", icon: "💻", category: "core", desc: "Write production code" },
    { id: "test", name: "Integration & QA Testing", icon: "🧪", category: "core", desc: "Perform system & user testing" },
    { id: "deploy", name: "Production Deployment", icon: "🚢", category: "core", desc: "Release product & ongoing support" }
];

// ─── Case Studies Data (Question 3) ──────────────────────────────────
const SCENARIOS = [
    {
        id: 0,
        title: "Scenario I: News Portal Site with Member Registration",
        badge: "Clear Scope & Tight Deadline",
        icon: "📰",
        description: "A news portal site that requires member registration. Once registered, users can read articles and make comments. The client has a clear-cut idea and design of the overall system. The deadline is strict (within 1 month), and the developer is simultaneously managing another project with frequent meetings.",
        question: "As a Software Engineer, which methodology do you recommend for this project and why?",
        options: [
            {
                methodology: "Waterfall Model",
                isCorrect: true,
                reasoning: "Correct! Requirements and design are clear-cut, fixed, and well-understood. The 1-month tight deadline demands a simple, linear sequential approach (Requirements → Design → Coding → Testing → Deploy) without unexpected scope changes or costly feedback loops."
            },
            {
                methodology: "Prototype Model",
                isCorrect: false,
                reasoning: "Incorrect. Prototyping is designed for ambiguous/unclear requirements. Here, the client already has clear-cut designs and ideas. Prototyping would add unnecessary overhead and delay the tight 1-month deadline."
            },
            {
                methodology: "Spiral Model",
                isCorrect: false,
                reasoning: "Incorrect. Spiral model is meant for complex, mission-critical systems with heavy technical risks. A news portal site has low risk and simple requirements."
            }
        ]
    },
    {
        id: 1,
        title: "Scenario II: Novel E-Learning System in Nepal",
        badge: "Unclear Requirements & High Ambiguity",
        icon: "🎓",
        description: "An e-learning system for Nepal that is fundamentally different from existing platforms. The client has course scripts but is reluctant and uncertain whether content should be delivered in animated form or live video teaching. There are numerous details the client cannot think of right now, but wants an e-learning system.",
        question: "As a Software Engineer, which methodology do you recommend for this project and why?",
        options: [
            {
                methodology: "Prototype Model (Evolutionary Prototyping)",
                isCorrect: true,
                reasoning: "Correct! Requirements are highly unclear and ambiguous. Creating rapid working prototypes (e.g. sample animated module vs live video module) allows the client to test with users, clarify requirements, and define system details before full-scale development."
            },
            {
                methodology: "Waterfall Model",
                isCorrect: false,
                reasoning: "Incorrect. Waterfall requires clear, stable requirements upfront. If applied here, building the wrong delivery format (animated vs live video) would lead to massive waste and project failure."
            },
            {
                methodology: "Incremental Model",
                isCorrect: false,
                reasoning: "Incorrect. Incremental model requires well-defined module boundaries upfront. The client here cannot define the core delivery mechanism yet."
            }
        ]
    },
    {
        id: 2,
        title: "Scenario III: Bank Financial Regulation System",
        badge: "Non-negotiable Regulations & Strict Documentation",
        icon: "🏦",
        description: "A commercial bank must implement a new software system to comply with a recently passed, well-defined financial regulation. The law's requirements are fixed, non-negotiable, and will not change. Audit trails and comprehensive documentation are as critical as the code itself.",
        question: "As a Software Engineer, which methodology do you recommend for this project and why?",
        options: [
            {
                methodology: "Waterfall Model",
                isCorrect: true,
                reasoning: "Correct! Financial regulations are 100% fixed, non-negotiable, and legally defined. Waterfall provides a disciplined, step-by-step sequential flow with mandatory formal documentation, audit trails, and strict compliance sign-offs at each phase."
            },
            {
                methodology: "Prototype Model",
                isCorrect: false,
                reasoning: "Incorrect. Regulatory rules are fixed by law, so there is no need for user prototyping or feature experimentation. Prototyping lacks the strict documentation control required for banking compliance."
            },
            {
                methodology: "Iterative Model",
                isCorrect: false,
                reasoning: "Incorrect. Rapid changes and evolving scope in iterative models risk introducing compliance gaps or undocumented regulatory violations."
            }
        ]
    },
    {
        id: 3,
        title: "Scenario IV: CAAN Air Traffic Control System",
        badge: "Mission-Critical & Extreme Risk",
        icon: "✈️",
        description: "Civil Aviation Authority of Nepal (CAAN) is building a new air traffic control system. The project is massively complex, mission-critical, and unprecedented at this scale in Nepal. Consequences of failure are catastrophic. The main challenge is managing unknown technical & safety risks.",
        question: "As a Software Engineer, which methodology do you recommend for this project and why?",
        options: [
            {
                methodology: "Spiral Model",
                isCorrect: true,
                reasoning: "Correct! Spiral model is specifically engineered for high-risk, mission-critical systems. It places risk analysis and safety assessment at the core of every spiral iteration, prototyping technical components and evaluating safety before proceeding to full implementation."
            },
            {
                methodology: "Waterfall Model",
                isCorrect: false,
                reasoning: "Incorrect. Waterfall assumes risks are negligible and requirements are perfect. In a unprecedented air traffic system, undiscovered technical risks during testing would cause catastrophic failures."
            },
            {
                methodology: "Incremental Model",
                isCorrect: false,
                reasoning: "Incorrect. Delivering air traffic control piecemeal without exhaustive risk and safety analysis could lead to fatal mid-air traffic errors."
            }
        ]
    }
];

// ─── Quiz Questions ──────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
    {
        question: "What is the primary purpose of the SDLC?",
        options: ["To write code faster", "To systematically develop software in a disciplined manner", "To eliminate software developers", "To skip system documentation"],
        correct: 1
    },
    {
        question: "In Waterfall vs. Prototype model, which one is best when requirements are UNCLEAR?",
        options: ["Waterfall Model", "Prototype Model", "Both are equal", "Neither"],
        correct: 1
    },
    {
        question: "What is the main difference between Incremental and Iterative development?",
        options: [
            "Incremental builds software feature-by-feature (modules); Iterative refines the whole software in cycles.",
            "Incremental uses no testing; Iterative uses full testing.",
            "Iterative is linear; Incremental is circular.",
            "There is no difference between them."
        ],
        correct: 0
    },
    {
        question: "Which SDLC model is recommended for CAAN's Air Traffic Control system due to catastrophic failure risks?",
        options: ["Waterfall Model", "Prototype Model", "Spiral Model", "V-Model"],
        correct: 2
    },
    {
        question: "For a Bank complying with fixed financial laws where documentation is critical, which model is best?",
        options: ["Agile Extreme Programming", "Waterfall Model", "Prototype Model", "Ad-hoc Model"],
        correct: 1
    },
    {
        question: "For a News Portal site with clear designs and a 1-month strict deadline, why is Waterfall preferred?",
        options: [
            "Because requirements are clear/fixed and scope will not change during the short 1-month timeline.",
            "Because Waterfall allows infinite requirement changes.",
            "Because client wants to prototype for 3 months.",
            "Because it requires no coding."
        ],
        correct: 0
    },
    {
        question: "In the Prototype model, what happens after user feedback is gathered?",
        options: [
            "Project is cancelled",
            "The prototype is refined & iterated until approved by user",
            "Code is deleted and rewritten in Waterfall",
            "System is immediately deployed to production"
        ],
        correct: 1
    },
    {
        question: "Which SDLC phase focuses on creating database schemas, UI wireframes, and API specifications?",
        options: ["Requirements Analysis", "Design Phase", "Development Phase", "Deployment Phase"],
        correct: 1
    },
    {
        question: "Why is Spiral model considered 'risk-driven'?",
        options: [
            "It avoids risk analysis completely",
            "Each spiral loop starts with risk assessment & safety prototyping",
            "It is only used for low-risk projects",
            "It guarantees zero cost"
        ],
        correct: 1
    },
    {
        question: "What is User Acceptance Testing (UAT)?",
        options: [
            "Testing done by developers on unit functions",
            "Testing performed by end-users to verify the system meets business needs",
            "Testing server hardware bandwidth",
            "Compiling the source code"
        ],
        correct: 1
    }
];

// ─── App Initialization ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavbar();
    initStages();
    initDragDrop();
    initModels();
    initWorkflowBuilder();
    initCaseStudies();
    initQuiz();
    initScrollAnimations();
});

// ─── Background Particles ────────────────────────────────────────────
function initParticles() {
    const container = document.getElementById('bgParticles');
    if (!container) return;
    const colors = ['#818cf8','#c084fc','#34d399','#38bdf8','#fb7185'];
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 6 + 2;
        p.style.cssText = `
            width: ${size}px; height: ${size}px;
            left: ${Math.random() * 100}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration: ${Math.random() * 15 + 10}s;
            animation-delay: ${Math.random() * 10}s;
        `;
        container.appendChild(p);
    }
}

// ─── Navbar ──────────────────────────────────────────────────────────
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
        updateActiveNavLink();
    });

    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === id) link.classList.add('active');
            });
        }
    });
}

// ─── SDLC Stages Timeline ────────────────────────────────────────────
function initStages() {
    const timeline = document.getElementById('stagesTimeline');
    if (!timeline) return;

    STAGES.forEach((stage, index) => {
        const card = document.createElement('div');
        card.className = 'stage-card';
        card.setAttribute('data-id', stage.id);
        card.innerHTML = `
            <div class="stage-card-num">${String(index + 1).padStart(2, '0')}</div>
            <div class="stage-card-header">
                <span class="stage-card-icon">${stage.icon}</span>
                <div>
                    <h3 class="stage-card-title">${stage.title}</h3>
                    <p class="stage-card-subtitle">${stage.shortDesc}</p>
                </div>
            </div>
            <p class="stage-card-desc">${stage.description}</p>
            <div class="stage-card-footer">
                <span class="stage-card-outputs">📌 ${stage.outputs.length} Key Outputs</span>
                <span class="stage-card-arrow">View Details →</span>
            </div>
        `;
        card.addEventListener('click', () => openStageModal(stage));
        timeline.appendChild(card);
    });

    const overlay = document.getElementById('stageModalOverlay');
    const closeBtn = document.getElementById('modalClose');
    if (overlay) overlay.addEventListener('click', closeStageModal);
    if (closeBtn) closeBtn.addEventListener('click', closeStageModal);
}

function openStageModal(stage) {
    document.getElementById('modalIcon').textContent = stage.icon;
    document.getElementById('modalTitle').textContent = stage.title;
    document.getElementById('modalDescription').textContent = stage.description;

    document.getElementById('modalDetails').innerHTML = `
        <div class="modal-section">
            <h4>⚡ Key Activities</h4>
            <ul>${stage.activities.map(a => `<li>${a}</li>`).join('')}</ul>
        </div>
        <div class="modal-section">
            <h4>📦 Deliverables / Outputs</h4>
            <ul>${stage.outputs.map(o => `<li>${o}</li>`).join('')}</ul>
        </div>
    `;

    document.getElementById('stageModal').classList.add('open');
}

function closeStageModal() {
    document.getElementById('stageModal').classList.remove('open');
}

// ─── Drag and Drop Challenge ─────────────────────────────────────────
let dragBlocks = [...STAGES];

function initDragDrop() {
    shuffleArray(dragBlocks);
    renderBlocks();

    document.getElementById('checkOrderBtn').addEventListener('click', checkOrder);
    document.getElementById('shuffleBtn').addEventListener('click', () => {
        shuffleArray(dragBlocks);
        renderBlocks();
        clearFeedback();
    });
    document.getElementById('resetBtn').addEventListener('click', () => {
        dragBlocks = [...STAGES];
        renderBlocks();
        clearFeedback();
    });
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function renderBlocks() {
    const zone = document.getElementById('dropZone');
    if (!zone) return;
    zone.innerHTML = '';

    dragBlocks.forEach((stage, index) => {
        const block = document.createElement('div');
        block.className = 'drag-block';
        block.draggable = true;
        block.setAttribute('data-id', stage.id);
        block.setAttribute('data-index', index);

        block.innerHTML = `
            <div class="drag-handle">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>
            </div>
            <span class="drag-icon">${stage.icon}</span>
            <div class="drag-info">
                <h4 class="drag-title">${stage.title}</h4>
                <p class="drag-desc">${stage.shortDesc}</p>
            </div>
            <div class="drag-index-badge">${index + 1}</div>
            <div class="drag-status"></div>
        `;

        block.addEventListener('dragstart', handleDragStart);
        block.addEventListener('dragover', handleDragOver);
        block.addEventListener('dragenter', handleDragEnter);
        block.addEventListener('dragleave', handleDragLeave);
        block.addEventListener('drop', handleDrop);
        block.addEventListener('dragend', handleDragEnd);

        zone.appendChild(block);
    });
}

let draggedIdx = null;

function handleDragStart(e) {
    draggedIdx = parseInt(this.dataset.index);
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}
function handleDragOver(e) { e.preventDefault(); }
function handleDragEnter() { this.classList.add('over'); }
function handleDragLeave() { this.classList.remove('over'); }
function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('over');
    const targetIdx = parseInt(this.dataset.index);
    if (draggedIdx !== null && draggedIdx !== targetIdx) {
        const item = dragBlocks.splice(draggedIdx, 1)[0];
        dragBlocks.splice(targetIdx, 0, item);
        renderBlocks();
        clearFeedback();
    }
}
function handleDragEnd() { this.classList.remove('dragging'); }

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

    if (correct === 8) launchConfetti();
}

function updateScore(correct) {
    document.getElementById('scoreText').textContent = `${correct}/8`;
    const circle = document.getElementById('scoreCircle');
    if (!circle) return;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (correct / 8) * circumference;
    circle.style.strokeDashoffset = offset;
}

function showFeedback(correct) {
    const fb = document.getElementById('challengeFeedback');
    let cls, msg;
    if (correct === 8) {
        cls = 'success'; msg = '🎉 Perfect! All 8 stages are in exact linear SDLC order!';
    } else if (correct >= 5) {
        cls = 'partial'; msg = `⚡ Almost there! ${correct}/8 correct — recheck middle stages!`;
    } else {
        cls = 'error'; msg = `💡 ${correct}/8 correct. Try re-arranging the stages!`;
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

function launchConfetti() {
    const colors = ['#818cf8','#c084fc','#34d399','#fb7185','#fbbf24','#38bdf8'];
    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.cssText = `
            position: fixed; z-index: 9999; pointer-events: none;
            left: ${Math.random()*100}%; top: -10px;
            background: ${colors[Math.floor(Math.random()*colors.length)]};
            width: ${Math.random()*8+4}px; height: ${Math.random()*8+4}px;
            border-radius: ${Math.random()>0.5?'50%':'2px'};
            animation: confettiFall ${Math.random()*2+2}s linear forwards;
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
    if (!container || !model) return;

    if (model.isComparison) {
        if (model.type === 'waterfall_vs_prototype') {
            container.innerHTML = renderWaterfallVsPrototypeComparison();
        } else if (model.type === 'incremental_vs_iterative') {
            container.innerHTML = renderIncrementalVsIterativeComparison();
        }
        return;
    }

    let visualHTML = '';
    switch (modelKey) {
        case 'waterfall':
            visualHTML = `<div class="waterfall-visual">
                ${['Requirements Analysis','System Design','Implementation','Testing','Deployment','Maintenance']
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
                    <div class="proto-step">User Evaluation</div>
                </div>
                <div class="proto-feedback">🔄 Refine & Re-build Prototype until User Sign-off</div>
                <div class="proto-cycle">
                    <div class="proto-step">Develop Final Software</div>
                    <div class="proto-arrow">→</div>
                    <div class="proto-step">Test & Deploy</div>
                </div>
            </div>`;
            break;
        case 'incremental':
            visualHTML = `<div class="incremental-visual">
                <div class="inc-box">
                    <span class="inc-badge">Increment 1</span>
                    <p>Core Auth & Database</p>
                </div>
                <div class="inc-plus">+</div>
                <div class="inc-box">
                    <span class="inc-badge">Increment 2</span>
                    <p>Articles & Comments</p>
                </div>
                <div class="inc-plus">+</div>
                <div class="inc-box">
                    <span class="inc-badge">Increment 3</span>
                    <p>Payment & Subscriptions</p>
                </div>
            </div>`;
            break;
        case 'iterative':
            visualHTML = `<div class="iterative-visual">
                ${[
                    { label: 'Cycle 1 (V1.0)', width: '35%', text: 'Basic Working System' },
                    { label: 'Cycle 2 (V2.0)', width: '60%', text: 'Enhanced UI & Features' },
                    { label: 'Cycle 3 (V3.0)', width: '85%', text: 'Optimized & Scaled' },
                    { label: 'Cycle 4 (V4.0)', width: '100%', text: 'Final Polished System' }
                ].map(it => `
                    <div class="iter-iteration">
                        <span class="iter-label">${it.label}</span>
                        <div class="iter-bar">
                            <div class="iter-bar-fill" style="width:${it.width}"></div>
                            <span class="iter-bar-text">${it.text}</span>
                        </div>
                    </div>
                `).join('')}
            </div>`;
            break;
        case 'spiral':
            visualHTML = `<div class="spiral-visual">
                <div class="spiral-ring spiral-ring-1"></div>
                <div class="spiral-ring spiral-ring-2"></div>
                <div class="spiral-ring spiral-ring-3"></div>
                <div class="spiral-ring spiral-ring-4"></div>
                <div class="spiral-label label-top">Q1: Objectives & Planning</div>
                <div class="spiral-label label-right">Q2: Risk Analysis & Safety</div>
                <div class="spiral-label label-bottom">Q3: Engineering & Prototyping</div>
                <div class="spiral-label label-left">Q4: Customer Evaluation</div>
            </div>`;
            break;
    }

    container.innerHTML = `
        <div class="model-card">
            <div class="model-visual">${visualHTML}</div>
            <div class="model-info">
                <h3 class="model-title">${model.icon} ${model.title}</h3>
                <p class="model-description">${model.description}</p>
                <div class="model-best-for">
                    <strong>🎯 Academic Recommendation (Best For):</strong> ${model.bestFor}
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

function renderWaterfallVsPrototypeComparison() {
    return `
        <div class="comparison-container">
            <div class="comparison-header">
                <h3>⚖️ Academic Comparison: Waterfall Model vs. Prototype Model (Question 1)</h3>
                <p>Detailed breakdown of how the Waterfall model differs from the Prototype model across critical project aspects.</p>
            </div>

            <div class="table-wrapper">
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Aspect / Feature</th>
                            <th>🌊 Waterfall Model</th>
                            <th>🔬 Prototype Model</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Requirement Clarity</strong></td>
                            <td>Requirements must be 100% fixed, explicit, and clear upfront before design starts.</td>
                            <td>Requirements are initial, ambiguous, or incomplete; defined through prototype trial.</td>
                        </tr>
                        <tr>
                            <td><strong>User Involvement</strong></td>
                            <td>Minimal user involvement after initial requirements gathering until final delivery.</td>
                            <td>High and continuous active user involvement; users evaluate prototypes directly.</td>
                        </tr>
                        <tr>
                            <td><strong>Feedback Loop</strong></td>
                            <td>No feedback loop during development phase. Feedback occurs only after final release.</td>
                            <td>Immediate & recurring feedback loop after each prototype build cycle.</td>
                        </tr>
                        <tr>
                            <td><strong>Flexibility & Change</strong></td>
                            <td>Very rigid; making changes late in the lifecycle is extremely costly and difficult.</td>
                            <td>Highly flexible; accommodates requirement changes seamlessly during prototype iterations.</td>
                        </tr>
                        <tr>
                            <td><strong>Risk Management</strong></td>
                            <td>High risk of project failure if requirements were misunderstood initially.</td>
                            <td>Low risk; errors and missing requirements are discovered very early in prototyping.</td>
                        </tr>
                        <tr>
                            <td><strong>Documentation Needs</strong></td>
                            <td>Extensive, formal, and comprehensive documentation at every stage (sign-offs required).</td>
                            <td>Informal or minimal documentation during prototyping; focus is on working visual code.</td>
                        </tr>
                        <tr>
                            <td><strong>Cost Structure</strong></td>
                            <td>Lower upfront cost if scope is fixed; extremely high cost if revisions occur late.</td>
                            <td>Higher initial iterations cost, but prevents expensive total failure of final software.</td>
                        </tr>
                        <tr>
                            <td><strong>Best Academic Use Case</strong></td>
                            <td>Projects with non-negotiable legal/regulatory constraints (e.g. Bank compliance).</td>
                            <td>Projects with novel features where clients cannot articulate requirements (e.g. E-Learning).</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderIncrementalVsIterativeComparison() {
    return `
        <div class="comparison-container">
            <div class="comparison-header">
                <h3>🆚 Incremental vs. Iterative Development (Question 2)</h3>
                <p>Learn when Incremental and Iterative development approaches are preferred, supported with real-world examples.</p>
            </div>

            <div class="inc-iter-grid">
                <div class="inc-card">
                    <div class="card-badge badge-inc">🧩 Incremental Approach</div>
                    <h4>Build Software Piece-by-Piece (Feature Modules)</h4>
                    <p>Software is partitioned into distinct sub-modules (Increments). Each increment goes through full SDLC and adds new functional modules to the previous version.</p>
                    
                    <div class="example-box">
                        <strong>💡 Real-World Example: E-Commerce Platform</strong>
                        <ul>
                            <li><strong>Increment 1:</strong> User Registration & Product Catalog</li>
                            <li><strong>Increment 2:</strong> Shopping Cart & Payment Gateway</li>
                            <li><strong>Increment 3:</strong> Order Tracking & Delivery Status</li>
                            <li><strong>Increment 4:</strong> Customer Reviews & Loyalty Points</li>
                        </ul>
                    </div>

                    <div class="when-preferred">
                        <strong>✅ When Preferred:</strong>
                        <ul>
                            <li>When core software features must be launched to market early.</li>
                            <li>When project scope is easily dividable into independent modules.</li>
                            <li>When team resources can be allocated per module sequentially.</li>
                        </ul>
                    </div>
                </div>

                <div class="iter-card">
                    <div class="card-badge badge-iter">🔄 Iterative Approach</div>
                    <h4>Refine the Whole Software in Cycles (Revisions)</h4>
                    <p>The entire software system is built at a basic level upfront, then repeatedly refined, enhanced, and polished across successive release cycles (Iterations).</p>

                    <div class="example-box">
                        <strong>💡 Real-World Example: AI Image Editor</strong>
                        <ul>
                            <li><strong>Iteration 1:</strong> Basic image crop and color adjustment filter</li>
                            <li><strong>Iteration 2:</strong> Refine filters & add layer editing features</li>
                            <li><strong>Iteration 3:</strong> Add AI background removal & export optimizations</li>
                            <li><strong>Iteration 4:</strong> Full cloud sync & real-time team collaboration</li>
                        </ul>
                    </div>

                    <div class="when-preferred">
                        <strong>✅ When Preferred:</strong>
                        <ul>
                            <li>When developing complex algorithms where full scope is refined over time.</li>
                            <li>When market feedback on the entire system dictates future refinements.</li>
                            <li>When continuous performance optimization and UX polishing are needed.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ─── Workflow Builder (Interactive Board) ───────────────────────────
let boardBlocks = [];

function initWorkflowBuilder() {
    renderBlockPalette();

    const clearBtn = document.getElementById('clearWorkflowBtn');
    const evalBtn = document.getElementById('evalWorkflowBtn');
    const targetSelect = document.getElementById('targetMethodologySelect');

    if (clearBtn) clearBtn.addEventListener('click', clearBoard);
    if (evalBtn) evalBtn.addEventListener('click', evaluateWorkflow);
    if (targetSelect) targetSelect.addEventListener('change', () => {
        document.getElementById('builderFeedbackCard').style.display = 'none';
    });

    const board = document.getElementById('workflowBoard');
    if (board) {
        board.addEventListener('dragover', e => e.preventDefault());
        board.addEventListener('drop', handleBoardDrop);
    }
}

function renderBlockPalette() {
    const palette = document.getElementById('blockPalette');
    if (!palette) return;

    palette.innerHTML = PROCESS_BLOCKS.map(b => `
        <div class="block-item" draggable="true" data-id="${b.id}">
            <span class="block-icon">${b.icon}</span>
            <div class="block-text">
                <span class="block-name">${b.name}</span>
                <span class="block-desc">${b.desc}</span>
            </div>
        </div>
    `).join('');

    palette.querySelectorAll('.block-item').forEach(el => {
        el.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', el.dataset.id);
        });
    });
}

function handleBoardDrop(e) {
    e.preventDefault();
    const blockId = e.dataTransfer.getData('text/plain');
    const blockData = PROCESS_BLOCKS.find(b => b.id === blockId);
    if (blockData) {
        boardBlocks.push(blockData);
        renderWorkflowBoard();
    }
}

function renderWorkflowBoard() {
    const board = document.getElementById('workflowBoard');
    const countBadge = document.getElementById('boardCount');
    if (!board) return;

    countBadge.textContent = `${boardBlocks.length} Blocks`;

    if (boardBlocks.length === 0) {
        board.innerHTML = `
            <div class="board-placeholder" id="boardPlaceholder">
                <span class="placeholder-icon">📥</span>
                <p>Drag blocks from the palette and drop them here in sequence!</p>
            </div>
        `;
        return;
    }

    board.innerHTML = boardBlocks.map((b, idx) => `
        <div class="board-block">
            <span class="board-step-num">${idx + 1}</span>
            <span class="board-block-icon">${b.icon}</span>
            <span class="board-block-name">${b.name}</span>
            <button class="remove-block-btn" onclick="removeBoardBlock(${idx})">✕</button>
        </div>
        ${idx < boardBlocks.length - 1 ? '<div class="board-arrow">→</div>' : ''}
    `).join('');
}

window.removeBoardBlock = function(idx) {
    boardBlocks.splice(idx, 1);
    renderWorkflowBoard();
    document.getElementById('builderFeedbackCard').style.display = 'none';
};

function clearBoard() {
    boardBlocks = [];
    renderWorkflowBoard();
    document.getElementById('builderFeedbackCard').style.display = 'none';
}

function evaluateWorkflow() {
    const card = document.getElementById('builderFeedbackCard');
    const target = document.getElementById('targetMethodologySelect').value;
    const badge = document.getElementById('feedbackBadge');
    const title = document.getElementById('feedbackTitle');
    const desc = document.getElementById('feedbackDesc');
    const details = document.getElementById('feedbackDetails');

    if (boardBlocks.length === 0) {
        card.style.display = 'block';
        badge.textContent = 'Empty Board';
        badge.className = 'feedback-badge error';
        title.textContent = 'No Process Blocks Placed';
        desc.textContent = 'Please drag at least 3 process blocks onto the Workflow Board before evaluating!';
        details.innerHTML = '';
        return;
    }

    const blockIds = boardBlocks.map(b => b.id);
    let matchScore = 0;
    let feedbackMsgs = [];
    let isSuccess = false;

    if (target === 'waterfall') {
        const hasLinear = blockIds.includes('req') && blockIds.includes('arch') && blockIds.includes('dev') && blockIds.includes('test') && blockIds.includes('deploy');
        const hasLoops = blockIds.includes('proto') || blockIds.includes('user_fb') || blockIds.includes('iter_refine');

        if (hasLinear && !hasLoops) {
            matchScore = 100; isSuccess = true;
            feedbackMsgs.push("✅ Perfect Linear Sequential Flow: Requirements → Design → Development → Testing → Deployment.");
            feedbackMsgs.push("✅ Correctly omitted iteration & prototype loops, maintaining Waterfall rigidity.");
        } else {
            matchScore = Math.max(30, 100 - (hasLoops ? 40 : 0) - (!hasLinear ? 30 : 0));
            if (hasLoops) feedbackMsgs.push("⚠️ Waterfall Model does NOT contain prototype or user feedback loops during coding!");
            if (!hasLinear) feedbackMsgs.push("💡 Missing key Waterfall phases: Ensure Requirements Analysis, Design, Coding, Testing, and Deployment are present in linear order.");
        }
    } else if (target === 'prototype') {
        const hasProto = blockIds.includes('proto');
        const hasFeedbackLoop = blockIds.includes('user_fb');

        if (hasProto && hasFeedbackLoop) {
            matchScore = 100; isSuccess = true;
            feedbackMsgs.push("✅ Excellent! Includes Build Prototype & User Feedback Loop before full development.");
            feedbackMsgs.push("✅ Successfully models the Prototype loop where user evaluation refines requirements!");
        } else {
            matchScore = 40;
            if (!hasProto) feedbackMsgs.push("⚠️ Missing 'Build Prototype' block from the palette!");
            if (!hasFeedbackLoop) feedbackMsgs.push("⚠️ Missing 'User Feedback Loop' block! Prototyping relies on active user feedback.");
        }
    } else if (target === 'incremental') {
        const hasInc = blockIds.includes('inc_build');
        if (hasInc) {
            matchScore = 100; isSuccess = true;
            feedbackMsgs.push("✅ Correct Incremental setup! Module increments build software piece-by-piece.");
        } else {
            matchScore = 50;
            feedbackMsgs.push("💡 Add the 'Build Module Increment' block to showcase feature-by-feature delivery.");
        }
    } else if (target === 'iterative') {
        const hasIter = blockIds.includes('iter_refine');
        if (hasIter) {
            matchScore = 100; isSuccess = true;
            feedbackMsgs.push("✅ Correct Iterative setup! Full software undergoes successive refinement cycles.");
        } else {
            matchScore = 50;
            feedbackMsgs.push("💡 Add the 'Iterative Refinement Cycle' block to showcase full system release iterations.");
        }
    } else if (target === 'spiral') {
        const hasRisk = blockIds.includes('risk');
        const hasProto = blockIds.includes('proto');

        if (hasRisk && hasProto) {
            matchScore = 100; isSuccess = true;
            feedbackMsgs.push("✅ Outstanding Spiral Model setup! Combines Risk Analysis & Safety Audit with Prototyping.");
            feedbackMsgs.push("✅ Risk management is prioritized before engineering execution.");
        } else {
            matchScore = 40;
            if (!hasRisk) feedbackMsgs.push("⚠️ Missing 'Risk Analysis & Safety Audit' block! Spiral is risk-driven.");
            if (!hasProto) feedbackMsgs.push("⚠️ Include 'Build Prototype' to test technical risks in early spirals.");
        }
    }

    card.style.display = 'block';
    badge.textContent = `${matchScore}% Match`;
    badge.className = `feedback-badge ${isSuccess ? 'success' : 'warning'}`;
    title.textContent = isSuccess ? '🎉 Valid Methodology Workflow Created!' : '⚡ Workflow Review & Suggestions';
    desc.textContent = `Evaluation results for target: ${target.toUpperCase()} MODEL`;

    details.innerHTML = `
        <ul class="feedback-list">
            ${feedbackMsgs.map(m => `<li>${m}</li>`).join('')}
        </ul>
    `;
}

// ─── Case Studies Evaluator (Question 3) ────────────────────────────
function initCaseStudies() {
    renderScenarioCard(0);

    document.querySelectorAll('.scenario-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.scenario-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderScenarioCard(parseInt(tab.dataset.scenario));
        });
    });
}

function renderScenarioCard(scenarioIdx) {
    const sc = SCENARIOS[scenarioIdx];
    const container = document.getElementById('scenarioCard');
    if (!container || !sc) return;

    container.innerHTML = `
        <div class="sc-header">
            <div class="sc-badge">${sc.badge}</div>
            <h3 class="sc-title">${sc.icon} ${sc.title}</h3>
        </div>
        <p class="sc-desc">${sc.description}</p>
        
        <div class="sc-question-box">
            <h4>${sc.question}</h4>
            <div class="sc-options">
                ${sc.options.map((opt, i) => `
                    <button class="sc-option-btn" onclick="selectScenarioOption(${scenarioIdx}, ${i})">
                        <span class="opt-bullet">${['A','B','C'][i]}</span>
                        <span>${opt.methodology}</span>
                    </button>
                `).join('')}
            </div>
        </div>

        <div class="sc-feedback" id="scFeedback_${scenarioIdx}" style="display:none;"></div>
    `;
}

window.selectScenarioOption = function(scIdx, optIdx) {
    const sc = SCENARIOS[scIdx];
    const opt = sc.options[optIdx];
    const fb = document.getElementById(`scFeedback_${scIdx}`);

    fb.style.display = 'block';
    fb.className = `sc-feedback ${opt.isCorrect ? 'correct' : 'incorrect'}`;

    fb.innerHTML = `
        <div class="sc-feedback-header">
            <span class="sc-fb-icon">${opt.isCorrect ? '✅ Academic Approval' : '❌ Re-evaluate Selection'}</span>
            <strong>Recommended: ${opt.methodology}</strong>
        </div>
        <p class="sc-fb-reasoning">${opt.reasoning}</p>
    `;

    if (opt.isCorrect) launchConfetti();
};

// ─── Quiz ────────────────────────────────────────────────────────────
let quizState = { current: 0, answers: new Array(QUIZ_QUESTIONS.length).fill(-1) };

function initQuiz() {
    renderQuizQuestion();

    const nextBtn = document.getElementById('quizNext');
    const prevBtn = document.getElementById('quizPrev');
    const retakeBtn = document.getElementById('retakeQuiz');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (quizState.current < QUIZ_QUESTIONS.length - 1) {
                quizState.current++;
                renderQuizQuestion();
            } else {
                showQuizResults();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (quizState.current > 0) {
                quizState.current--;
                renderQuizQuestion();
            }
        });
    }

    if (retakeBtn) {
        retakeBtn.addEventListener('click', () => {
            quizState = { current: 0, answers: new Array(QUIZ_QUESTIONS.length).fill(-1) };
            document.getElementById('quizContainer').style.display = '';
            document.getElementById('quizResults').style.display = 'none';
            renderQuizQuestion();
        });
    }
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
    if (pct === 1) { emoji = '🏆'; title = 'Perfect Score!'; text = 'You are an SDLC & Methodology master!'; }
    else if (pct >= 0.7) { emoji = '🎉'; title = 'Great Job!'; text = 'You have a solid understanding of software methodologies.'; }
    else if (pct >= 0.4) { emoji = '💪'; title = 'Good Effort!'; text = 'Review the comparison section and try again.'; }
    else { emoji = '📚'; title = 'Keep Learning!'; text = 'Go through the stages and case studies section.'; }

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

    document.querySelectorAll('.stage-card, .section-header, .model-card, .scenarios-container, .builder-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}
