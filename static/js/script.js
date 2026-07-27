// script.js

// --- EXAM DATA ---
const questions = [
    { id: 1, text: "Physics: The dimensions of Impulse are the same as that of:", options: ["Force", "Linear Momentum", "Energy", "Angular Momentum"] },
    { id: 2, text: "Physics: Two parallel wires carrying current in the same direction:", options: ["Attract each other", "Repel each other", "Experience no force", "Rotate perpendicularly"] },
    { id: 3, text: "Physics: A particle executes SHM with amplitude A. At what distance from mean position is K.E. equal to P.E.?", options: ["A/2", "A/√2", "A/3", "A/4"] },
    { id: 4, text: "Chemistry: Which of the following is a diamagnetic ion? (Atomic numbers: Sc=21, Ti=22, V=23, Cu=29)", options: ["Cu2+", "Sc3+", "Ti3+", "V3+"] },
    { id: 5, text: "Chemistry: The coordination number of cation in NaCl crystal is:", options: ["4", "6", "8", "12"] },
    { id: 6, text: "Chemistry: Which compound is known as 'Oil of Wintergreen'?", options: ["Phenyl salicylate", "Methyl salicylate", "Ethyl salicylate", "Salicylic acid"] },
    { id: 7, text: "Maths: The derivative of log(sin x) with respect to x is:", options: ["tan x", "cot x", "sec x", "cosec x"] },
    { id: 8, text: "Maths: If A is a square matrix of order 3 and |A| = 5, then |2A| is:", options: ["10", "40", "25", "8"] },
    { id: 9, text: "Maths: The angle between the planes 2x - y + z = 6 and x + y + 2z = 7 is:", options: ["30°", "45°", "60°", "90°"] },
    { id: 10, text: "Maths: The general solution of differential equation dy/dx = e^(x-y) is:", options: ["e^x - e^y = c", "e^x + e^y = c", "e^y = e^x + c", "e^(-y) = e^(-x) + c"] }
];

document.addEventListener("DOMContentLoaded", () => {
    // --- DOM ELEMENTS ---
    let video = document.getElementById("video");
    let canvas = document.getElementById("canvas");
    let ctx = null;
    if (canvas) {
        ctx = canvas.getContext("2d");
    }
    
    const questionTextEl = document.getElementById('question-text');
    const questionNumEl = document.getElementById('question-number');
    const optionsContainer = document.getElementById('options-container');
    const paletteGrid = document.getElementById('palette-grid');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const btnSkip = document.getElementById('btn-skip');
    const btnMark = document.getElementById('btn-mark');
    const btnFinish = document.getElementById('btn-finish');
    const timerEl = document.getElementById('timer');
    const violationCountEl = document.getElementById('violation-count');
    const alertBox = document.getElementById('alert-box');
    const alertText = document.getElementById('alert-text');
    const startOverlay = document.getElementById("start-overlay");
    const loginOverlay = document.getElementById("login-overlay");
    const terminationOverlay = document.getElementById('termination-overlay');
    const startBtn = document.getElementById("btn-start-test");

    // --- STATE ---
    let isTestRunning = false;
    let frameInterval = null;
    let timerInterval = null;
    let currentQuestionIndex = 0;
    let userAnswers = {}; 
    let questionStatus = new Array(10).fill('not-visited');
    let isAlertActive = false; // Track alert state to prevent continuous triggering
    let audioCtx = null; // Web Audio API context

    // --- INITIALIZATION ---
    if (startBtn) startBtn.addEventListener("click", startTest);

    // Login Logic
    const loginBtn = document.getElementById("btn-login");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const name = document.getElementById("login-name").value.trim();
            const dob = document.getElementById("login-dob").value.trim();

            if (name && dob) {
                // Update Student Name in Sidebar
                const nameDisplay = document.querySelector(".user-details p strong");
                if (nameDisplay) nameDisplay.innerText = name;

                loginOverlay.classList.add("hidden");
                startOverlay.classList.remove("hidden");
            } else {
                alert("Please enter Candidate Name and Password (DOB).");
            }
        });
    }

    // Bind Navigation
    btnNext.addEventListener('click', () => navigate(1));
    btnPrev.addEventListener('click', () => navigate(-1));
    btnSkip.addEventListener('click', () => navigate(1));
    btnMark.addEventListener('click', markQuestion);
    btnFinish.addEventListener('click', () => {
        if(confirm("Submit Exam?")) terminateTest();
    });

    // --- PROCTORING LOGIC ---
    async function startTest() {
        await fetch("/reset_test", { method: "POST" });

        // Initialize Audio Context on user interaction (Start Click)
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') await audioCtx.resume();

        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error("Camera API not available. Please use HTTPS or localhost.");
            }

            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (video) {
                video.srcObject = stream;
                video.play();
            }

            if (startOverlay) startOverlay.style.display = "none";

            isTestRunning = true;
            initExamUI();
            startTimer(10 * 60);
            frameInterval = setInterval(sendFrame, 200);

        } catch (err) {
            alert("Camera permission is required!");
            console.error(err);
        }
    }

    function sendFrame() {
        if (!isTestRunning || !ctx || !video || !canvas) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        const img = canvas.toDataURL("image/jpeg", 0.7);

        fetch("/process_frame", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: img })
        })
        .then(res => res.json())
        .then(updateUI);
    }

    function updateUI(data) {
        // Update Violation Count (Backend + Local Fullscreen Violations)
        const totalViolations = (data.violations || 0);
        if (violationCountEl) violationCountEl.innerText = totalViolations;

        // Check for active violations (Head turn OR Fullscreen exit)
        const isHeadTurn = data.alert;

        if (alertBox && alertText) {
            if (isHeadTurn) {
                // Show Visual Warning
                alertBox.classList.remove("hidden");
                alertText.innerText = "⚠️ Please look forward at the screen.";

                // Trigger actions ONLY on rising edge (if not already alerting)
                if (!isAlertActive) {
                    playAlertSound();
                    captureScreenshot();
                    isAlertActive = true;
                }
            } else {
                alertBox.classList.add("hidden");
                isAlertActive = false;
            }
        }

        // Handle Termination
        if (data.terminated) terminateTest();
    }

    function terminateTest() {
        isTestRunning = false;
        clearInterval(frameInterval);
        clearInterval(timerInterval);

        if (video.srcObject) {
            video.srcObject.getTracks().forEach(t => t.stop());
        }

        if (terminationOverlay) terminationOverlay.classList.remove("hidden");
        document.querySelector('.main-container').style.pointerEvents = 'none';
        document.querySelector('.main-container').style.opacity = '0.5';
    }

    function startTimer(seconds) {
        timerInterval = setInterval(() => {
            let m = Math.floor(seconds / 60);
            let s = seconds % 60;
            if (timerEl) timerEl.innerText = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
            if (--seconds < 0) terminateTest();
        }, 1000);
    }

    // --- EXAM UI LOGIC ---
    function initExamUI() {
        renderPalette();
        loadQuestion(0);
    }

    function loadQuestion(index) {
        currentQuestionIndex = index;
        const q = questions[index];
        
        questionNumEl.innerText = `Question ${index + 1}`;
        questionTextEl.innerText = q.text;
        
        optionsContainer.innerHTML = '';
        q.options.forEach((opt, i) => {
            const label = document.createElement('label');
            label.className = 'option-label';
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'option';
            radio.value = i;
            if (userAnswers[index] === i) radio.checked = true;
            radio.addEventListener('change', () => {
                userAnswers[index] = i;
                if (questionStatus[index] !== 'marked') questionStatus[index] = 'answered';
                updatePalette();
            });
            label.appendChild(radio);
            label.appendChild(document.createTextNode(opt));
            optionsContainer.appendChild(label);
        });

        btnPrev.disabled = index === 0;
        if (index === questions.length - 1) {
            btnNext.classList.add('hidden');
            btnFinish.classList.remove('hidden');
        } else {
            btnNext.classList.remove('hidden');
            btnFinish.classList.add('hidden');
        }
        updatePalette();
    }

    function navigate(direction) {
        const newIndex = currentQuestionIndex + direction;
        if (newIndex >= 0 && newIndex < questions.length) {
            loadQuestion(newIndex);
        }
    }

    function markQuestion() {
        questionStatus[currentQuestionIndex] = 'marked';
        updatePalette();
    }

    function renderPalette() {
        paletteGrid.innerHTML = '';
        questions.forEach((_, i) => {
            const btn = document.createElement('div');
            btn.className = 'palette-btn not-visited';
            btn.innerText = i + 1;
            btn.onclick = () => loadQuestion(i);
            paletteGrid.appendChild(btn);
        });
    }

    function updatePalette() {
        const buttons = paletteGrid.children;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].className = `palette-btn ${questionStatus[i]}`;
            if (i === currentQuestionIndex) buttons[i].classList.add('active');
        }
    }

    // --- HELPER FUNCTIONS ---
    
    function playAlertSound() {
        if (!audioCtx) return;
        
        // Create oscillator for beep sound
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime); // 440Hz (A4)
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1); // Slide up
        
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Volume
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5); // Fade out
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
    }

    function captureScreenshot() {
        // Capture current video frame to a temporary canvas (evidence)
        if (!video) return;
        const capCanvas = document.createElement('canvas');
        capCanvas.width = video.videoWidth;
        capCanvas.height = video.videoHeight;
        capCanvas.getContext('2d').drawImage(video, 0, 0);
        
        // Log verification
        console.log("📸 Violation Evidence Captured at " + new Date().toLocaleTimeString());
        
        // Note: In a production app, you would upload capCanvas.toDataURL() here.
    }
});
