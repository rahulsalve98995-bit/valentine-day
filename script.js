const card = document.getElementById("card");
const senderName = "Rahul"; // Yahan apna naam likhein
const startDateStr = "2026-01-19"; // Yahan milne ki date likhein (YYYY-MM-DD)

// Load Canvas Confetti Library for the celebration
const confettiScript = document.createElement('script');
confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
document.head.appendChild(confettiScript);

// Add Viewport Meta for Mobile Optimization
const metaViewport = document.createElement('meta');
metaViewport.name = "viewport";
metaViewport.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
document.head.appendChild(metaViewport);

// --- CODE REFACTOR & NEW FEATURES ---

// 1. Inject custom styles for handwritten font (Removed scroll styles)
const style = document.createElement('style');
style.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500&family=Playfair+Display:wght@600;700&family=Montserrat:wght@400;500&display=swap');
  
  body {
    font-family: 'Montserrat', sans-serif;
    min-height: 100vh;
    min-height: 100dvh; /* Fix for Android address bar resizing */
    overflow-x: hidden;
    overflow-y: auto; /* Enable vertical scrolling */
    padding-bottom: 100px; /* Extra space at bottom for mobile */
    -webkit-tap-highlight-color: transparent; /* Remove blue highlight on tap */
  }

  /* Glassmorphism Card Effect - Premium Look */
  #card {
    background: rgba(255, 255, 255, 0.65) !important;
    backdrop-filter: blur(25px) saturate(180%);
    -webkit-backdrop-filter: blur(25px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 30px 60px rgba(0,0,0,0.2), inset 0 0 20px rgba(255, 255, 255, 0.5);
    border-radius: 20px !important;
    max-width: 500px;
    width: 90%;
    margin: auto;
    position: relative;
    overflow: hidden;
  }
  
  /* Shimmer Effect on Card */
  #card::before {
    content: '';
    position: absolute;
    top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: shimmer 3s infinite;
    pointer-events: none;
  }
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  h1, h2, h3 {
    font-family: 'Playfair Display', serif;
    color: #b91c1c; /* Deep Romantic Red */
    margin-bottom: 15px;
  }

  p {
    color: #444;
    font-size: 1.1em;
    line-height: 1.6;
  }

  /* Premium Gradient Buttons (Inside Card) */
  #card button {
    background: linear-gradient(to right, #ff512f, #dd2476);
    color: white;
    border: none;
    border-radius: 50px;
    padding: 12px 30px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1em;
    box-shadow: 0 10px 20px rgba(221, 36, 118, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: pulse-btn 2s infinite;
  }
  #card button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(221, 36, 118, 0.6);
  }
  #card button:active {
    transform: scale(0.96); /* Touch feedback for mobile */
  }

  .handwritten-letter {
    font-family: 'Caveat', cursive;
    font-size: 1.8em;
    line-height: 1.6;
    text-align: left;
    background-color: #fffaf0;
    padding: 30px;
    border-radius: 8px;
    margin-top: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    transform: rotate(-1deg);
    border: 1px solid #f0e6d2;
  }

  /* Input Field Styling */
  input[type="text"] {
    background: rgba(255,255,255,0.9);
    border: 2px solid #eee !important;
    border-radius: 10px !important;
    padding: 12px !important;
    font-family: 'Montserrat', sans-serif;
    outline: none;
  }
  input[type="text"]:focus {
    border-color: #dd2476 !important;
  }

  /* Text Reveal Animation - Premium Feel */
  @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
  }
  h1, h2, p {
      animation: fadeInUp 0.8s ease forwards;
  }
  /* Stagger the animation for paragraphs to create flow */
  p:nth-of-type(1) { animation-delay: 0.1s; opacity: 0; }
  p:nth-of-type(2) { animation-delay: 0.3s; opacity: 0; }
  p:nth-of-type(3) { animation-delay: 0.5s; opacity: 0; }
  p:nth-of-type(4) { animation-delay: 0.7s; opacity: 0; }

  /* Floating Background Hearts */
  .bg-heart {
      position: fixed;
      top: 100%;
      color: rgba(255, 105, 180, 0.3);
      font-size: 24px;
      z-index: -1;
      animation: floatUp 15s linear infinite;
  }
  @keyframes floatUp {
      to { transform: translateY(-120vh) rotate(360deg); }
  }

  /* Button Pulse Animation */
  @keyframes pulse-btn {
    0% { box-shadow: 0 0 0 0 rgba(221, 36, 118, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(221, 36, 118, 0); }
    100% { box-shadow: 0 0 0 0 rgba(221, 36, 118, 0); }
  }

  /* Mouse Trail Sparkle */
  .sparkle {
      position: absolute;
      width: 5px;
      height: 5px;
      background: #ffd700;
      border-radius: 50%;
      pointer-events: none;
      animation: fadeOut 1s forwards;
      box-shadow: 0 0 10px #ffd700;
      z-index: 9999;
  }
  @keyframes fadeOut {
      to { opacity: 0; transform: translateY(-20px) scale(0); }
  }

  /* Error Message Styling */
  .error-text {
    color: #ff4d4d;
    font-size: 0.9em;
    margin-top: 5px;
    display: none;
    font-weight: 600;
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  .shake-input {
    animation: shake 0.4s ease-in-out;
    border-color: #ff4d4d !important;
  }

  /* Heartbeat Mode (For Proposal Page) */
  .heartbeat-mode .cinematic-bg {
    animation: heartbeat-bg-anim 1.5s infinite ease-in-out !important;
    filter: saturate(1.2) brightness(1.1);
  }
  @keyframes heartbeat-bg-anim {
    0% { transform: scale(1); }
    15% { transform: scale(1.02); }
    30% { transform: scale(1); }
    45% { transform: scale(1.02); }
    60% { transform: scale(1); }
    100% { transform: scale(1); }
  }

  /* --- Mobile Responsive Styles --- */
  @media (max-width: 768px) {
    h1 { font-size: 2em !important; }
    h2 { font-size: 1.6em !important; }
    p { font-size: 1em !important; line-height: 1.5; }
    #card { width: 92% !important; padding: 20px 15px !important; margin-top: 5vh; margin-bottom: 5vh; }
    .handwritten-letter { padding: 15px !important; font-size: 1.3em !important; }
    #yes-container button, #no { padding: 10px 20px !important; font-size: 0.9em !important; }
    .click-me-arrow { bottom: -45px; font-size: 1.2em; }
    #card button:not(#yes):not(#no) { width: 100%; } /* Full width for normal buttons on mobile */
  }

  /* --- NEW: Canva Style Elements --- */
  .tape {
    width: 120px;
    height: 35px;
    background-color: rgba(255,255,255,0.3);
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%) rotate(-2deg);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    backdrop-filter: blur(5px);
    z-index: 10;
    border-left: 2px dotted rgba(0,0,0,0.1); 
    border-right: 2px dotted rgba(0,0,0,0.1);
  }
  
  .design-blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    z-index: -1;
    opacity: 0.6;
    animation: floatBlob 10s infinite alternate ease-in-out;
  }
  @keyframes floatBlob {
    from { transform: translate(0, 0); }
    to { transform: translate(30px, -30px); }
  }

  /* Vintage Grain Overlay */
  .grain-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9000;
    opacity: 0.06;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }

  /* Floating animation for YES button */
  @keyframes floatYes {
    0% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(10px, -15px) rotate(3deg); }
    66% { transform: translate(-10px, 10px) rotate(-3deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }
  #yes { animation: floatYes 5s ease-in-out infinite; }
  #yes-container { display: inline-block; transition: transform 0.3s ease; }
  #yes:hover {
    box-shadow: 0 0 20px #ff0055, 0 0 40px #ff0055;
    transform: scale(1.1) !important;
  }

  /* Cinematic Background Animation */
  .cinematic-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -5;
    background-image: radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%), url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2070&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
    animation: zoomEffect 40s infinite alternate ease-in-out;
  }
  @keyframes zoomEffect {
    0% { transform: scale(1); }
    100% { transform: scale(1.2); }
  }

  /* --- Music Player Widget --- */
  #music-player {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 280px;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 15px;
    padding: 15px;
    z-index: 1000;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    transition: all 0.3s ease;
    font-family: 'Montserrat', sans-serif;
    color: #333;
  }
  #music-player.minimized {
    width: 50px;
    height: 50px;
    padding: 0;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, #ff512f, #dd2476);
    box-shadow: 0 5px 15px rgba(221, 36, 118, 0.4);
  }
  #music-player.minimized .player-content, 
  #music-player.minimized .player-header { display: none; }
  #music-player.minimized::after {
    content: '🎵';
    font-size: 24px;
    color: white;
  }
  .player-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.3);
    padding-bottom: 5px;
  }
  .player-title { font-weight: bold; color: #b91c1c; font-size: 0.9em; }
  .minimize-btn { background: none; border: none; cursor: pointer; font-size: 1.2em; color: #555; }
  .track-list { list-style: none; padding: 0; margin: 0; max-height: 120px; overflow-y: auto; }
  .track-item {
    padding: 8px;
    margin: 4px 0;
    background: rgba(255,255,255,0.4);
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.85em;
    display: flex;
    align-items: center;
    transition: background 0.2s;
  }
  .track-item:hover { background: rgba(255,255,255,0.6); }
  .track-item.active {
    background: linear-gradient(to right, #ff512f, #dd2476);
    color: white;
    font-weight: 600;
  }
  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    gap: 15px;
  }
  .control-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
    color: #333;
    transition: transform 0.2s;
  }
  .control-btn:hover { transform: scale(1.1); }
`;
document.head.appendChild(style);

// 2. Setup Card Transition Properties
card.style.transition = "opacity 0.8s ease, transform 0.8s ease";
card.style.padding = '20px'; 

// Create Cinematic Background Element
const bgDiv = document.createElement('div');
bgDiv.className = 'cinematic-bg';
document.body.appendChild(bgDiv);

// Create Mood Overlay Element
const moodOverlay = document.createElement('div');
moodOverlay.style.position = 'fixed';
moodOverlay.style.top = '0';
moodOverlay.style.left = '0';
moodOverlay.style.width = '100%';
moodOverlay.style.height = '100%';
moodOverlay.style.zIndex = '-4'; // Above bg (-5), below content
moodOverlay.style.transition = 'background-color 5s ease'; // Slow 5s transition
moodOverlay.style.pointerEvents = 'none';
moodOverlay.style.mixBlendMode = 'overlay'; // Blends with the image
document.body.appendChild(moodOverlay);

/**
 * Helper function to transition card content smoothly
 */
function transitionTo(htmlContent, callback) {
    // Fade out
    card.style.opacity = "0";
    card.style.transform = "translateY(-20px)";

    setTimeout(() => {
        // Update content
        card.innerHTML = htmlContent;
        
        // Fade in
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
        
        // Attach listeners
        if (callback) callback();
    }, 800);
}

// --- STORY FLOW ---

// Page 1: Opening
function showOpening() {
    // Initial load doesn't need transition out, just set content
    card.innerHTML = `
        <h1>✨ A Small Surprise...</h1>
        <p>Life mein kuch log aate hain,<br>aur sab kuch badal dete hain.</p>
        <p>Tum wahi ho mere liye.<br>Meri khushi, meri shanti, mera sab kuch.</p>
        <p style="font-size: 0.9em; color: #d63384;">(Ek chhota sa safar, bas tumhare liye...)</p>
        <button id="continueBtn" style="padding: 10px 25px; cursor: pointer; margin-top: 20px;">Start Journey ❤️</button>
    `;
    
    document.getElementById('continueBtn').addEventListener('click', () => {
        showDedication();
    });
}

// Page 2: Dedication (Replaces Login)
function showDedication() {
    transitionTo(`
        <h1>🔒 Only for Neha</h1>
        <p>Yeh jagah public nahi hai.</p>
        <p>Hi website fakt <strong>Neha</strong> sathi aahe.<br>Jiska naam sunte hi,<br>chehre par ek alag si smile aa jati hai. 🤍</p>
        <div style="font-size: 40px; margin: 15px 0; animation: pulse-btn 2s infinite;">🔐 ➡️ 🔓</div>
        <p style="font-size: 0.9em; color: #555;">(Access Granted: You are my favorite person)</p>
        <button id="proceedBtn" style="padding: 8px 20px; cursor: pointer;">Open My Heart ❤️</button>
    `, () => {
        document.getElementById('proceedBtn').addEventListener('click', showConfession);
    });
}

// Page 3: Confession
function showConfession() {
    transitionTo(`
        <h2>Neha, ek sach bolun?</h2>
        <p>Main shayad duniya ke liye introvert hoon,<br>par tumhare saamne main 'Main' hota hoon.</p>
        <p>Tumhare saath chup rehna bhi awkward nahi lagta,<br>balki sukoon milta hai.</p>
        <p>Tumne mujhe bina badle accept kiya hai,<br>aur isse badi baat mere liye kuch nahi.</p>
        <p><strong>You are my safe place. 🏡</strong></p>
        <button id="nextBtn" style="padding: 8px 20px; cursor: pointer; margin-top: 10px;">Next ➡️</button>
    `, () => {
        document.getElementById('nextBtn').addEventListener('click', showPartner);
    });
}

// Page 5: Partner
function showPartner() {
    
    // Calculate Days
    const start = new Date(startDateStr);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    transitionTo(`
        <h2>🌷 Neha, tum kya ho?</h2>
        <div style="background: rgba(255,255,255,0.6); padding: 15px; border-radius: 15px; margin-bottom: 20px; border: 1px dashed #d63384; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
            <p style="margin:0; font-size: 0.9em; color: #555;">It's been</p>
            <h3 style="margin: 5px 0; font-size: 2em; color: #d63384;">${diffDays} Days</h3>
            <p style="margin:0; font-size: 0.9em; color: #555;">of knowing the best person ever ✨</p>
            <button id="saveDateBtn" style="margin-top: 10px; padding: 5px 15px; font-size: 0.8em; background: #d63384; color: white; border: none; border-radius: 15px; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">📅 Save Date</button>
        </div>
        <div style="text-align: left; padding: 10px; font-size: 0.9em;">
            <p><strong>🕊 Simplicity:</strong> Tum bina try kiye hi special ho.</p>
            <p><strong>💛 Care:</strong> Tumhara care loud nahi hota, par dil ko chhuta hai.</p>
            <p><strong>🌼 Nature:</strong> Tumhare saath har problem choti lagti hai.</p>
            <p><strong>🤍 My Peace:</strong> Tum meri excitement nahi, tum meri shanti ho.</p>
        </div>
        
        <!-- Interactive Reason Generator -->
        <div style="margin: 15px 0; padding: 10px; background: rgba(255,255,255,0.5); border-radius: 10px;">
            <p id="random-reason" style="color: #d63384; font-weight: bold; min-height: 20px; margin-bottom: 5px;">✨ Click button for a surprise...</p>
            <button id="reasonBtn" style="padding: 5px 15px; font-size: 0.8em; background: white; color: #d63384; border: 1px solid #d63384; border-radius: 15px; cursor: pointer;">Why I Love You? 🎲</button>
        </div>

        <button id="nextBtn" style="padding: 8px 20px; cursor: pointer; margin-top: 10px;">Next ➡️</button>
    `, () => {
        // Reason Generator Logic
        const reasons = [
            "Tumhari smile jo mera din bana deti hai 😊",
            "Jis tarah tum meri baatein sunti ho 🎧",
            "Tumhara simple aur genuine nature 🌸",
            "Tumhari aankhein jo sab kuch keh deti hain 👀",
            "Tumhare saath hone se jo peace milta hai 🕊️",
            "Tumhara gussa bhi cute lagta hai 😠❤️",
            "You make me a better person ✨",
            "Tumhari awaaz sunkar sukoon milta hai 🎶",
            "Jis tarah tum sabka khayal rakhti ho 🤗",
            "Because you are YOU (Perfect) 💖",
            "Tumhare saath waqt ka pata hi nahi chalta ⏳",
            "Mala tujhya sobat ayushya kadhaycha aahe 💍",
            "Tum meri best friend ho 👫",
            "Tumhari hansi meri favorite sound hai 🎶",
            "Jab tum gussa hoti ho toh aur cute lagti ho 😠❤️",
            "Tumhare messages ka wait karna achha lagta hai 📱",
            "Tumhare saath silence bhi comfortable hai 🤫"
        ];
        const reasonBtn = document.getElementById("reasonBtn");
        const reasonText = document.getElementById("random-reason");
        
        // Save Date Button Logic
        document.getElementById('saveDateBtn').addEventListener('click', () => {
            const startD = new Date(startDateStr);
            const endD = new Date(startDateStr);
            endD.setDate(endD.getDate() + 1);
            const fmt = (d) => d.toISOString().split('T')[0].replace(/-/g, '');
            const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Our+Special+Day+❤️&details=The+day+we+met!&dates=${fmt(startD)}/${fmt(endD)}&recur=RRULE:FREQ=YEARLY`;
            window.open(url, '_blank');
        });

        reasonBtn.addEventListener("click", () => {
            // Add suspense delay (Thoda ruk kar content aayega)
            reasonText.innerText = "Sochne do... 🤔";
            reasonText.style.animation = "pulse-btn 1s infinite";
            reasonBtn.disabled = true; // Button disable taaki baar baar click na ho

            setTimeout(() => {
                const random = reasons[Math.floor(Math.random() * reasons.length)];
                
                // Fix: Remove typewriter complexity, show text directly with fade animation
                reasonText.style.animation = "none";
                reasonText.offsetHeight; /* trigger reflow */
                reasonText.innerText = random;
                reasonText.style.animation = "fadeInUp 0.5s forwards";
                reasonBtn.disabled = false;
            }, 1000); // 1 second delay (Faster)
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            triggerBatteryPrank(showProposal);
        });
    });
}

// --- BATTERY PRANK FUNCTION ---
function triggerBatteryPrank(callback) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.85)'; // Dark dimming
    overlay.style.zIndex = '99999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.backdropFilter = 'blur(5px)';
    
    // iOS Style Alert
    overlay.innerHTML = `
        <div style="background: rgba(245,245,245,0.95); width: 280px; border-radius: 14px; text-align: center; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, sans-serif; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
            <div style="padding: 20px 15px;">
                <h3 style="margin: 0 0 5px 0; font-size: 17px; font-weight: 600; color: black;">Low Battery</h3>
                <p style="margin: 0; font-size: 13px; color: black;">1% battery remaining. Phone will turn off soon.</p>
            </div>
            <div style="border-top: 1px solid #ccc; display: flex;">
                <button id="prankDismiss" style="flex: 1; background: transparent; border: none; padding: 12px; font-size: 17px; color: #007aff; cursor: pointer; font-weight: 600;">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    document.getElementById('prankDismiss').onclick = () => {
        overlay.innerHTML = `
            <div style="text-align: center; animation: fadeInUp 0.5s;">
                <h1 style="color:white; font-size: 3em; margin:0;">🔋😂</h1>
                <h2 style="color:white; margin-top:10px;">Just Kidding!</h2>
                <p style="color:white; font-size: 1.2em;">My battery is full because of YOU! ❤️</p>
            </div>
        `;
        setTimeout(() => {
            overlay.style.transition = 'opacity 0.5s';
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
                callback();
            }, 500);
        }, 2500);
    };
}

// Page 6: Proposal
function showProposal() {
    document.body.classList.add('heartbeat-mode'); // Add heartbeat effect for tension
    transitionTo(`
        <h2>Neha… ❤️</h2>
        <p>Mujhe bade promises karne nahi aate,<br>par main hamesha tumhare saath khada rahunga.</p>
        <p>Main tumhe badalna nahi chahta,<br>bas tumhare saath grow karna chahta hoon.</p>
        <p>Aaj dil ki baat keh hi deta hoon...</p>
        <h1 style="margin-top: 20px; font-size: 2.2em;">💖 Neha, Will You Be My Valentine?</h1>
        <p style="font-size: 0.8em; color: #888;">(Forever wala?)</p>
        <div style="margin-top: 20px; position: relative; height: 80px; display: flex; align-items: center; justify-content: center;">
            <span id="yes-container">
                <button id="yes" style="z-index: 10;">YES 💍</button>
            </span>
            <button id="no" style="position: absolute; right: 0;">NO 🙈</button>
        </div>
    `, () => {
        const yesBtn = document.getElementById("yes");
        const noBtn = document.getElementById("no");
        const yesContainer = document.getElementById("yes-container");
        
        // Funny texts array
        const funnyTexts = ["Soch lo! 🤨", "Pakka? 🥺", "Ek aur baar socho 💭", "Nahi manogi? 😤", "Dil todogi? 💔", "Aisa mat karo! 😭", "Last chance! ⚠️", "Really? 🧐", "Button kharab hai! 🚫", "Click YES! ❤️"];
        let scale = 1;

        // Function to handle No button interaction (Hover or Click)
        const handleNoInteraction = () => {
            // 1. Change Text
            const randomText = funnyTexts[Math.floor(Math.random() * funnyTexts.length)];
            noBtn.innerText = randomText;
            
            // 2. Make YES Button Bigger
            scale += 0.3; // Thoda fast bada karte hain
            yesContainer.style.transform = `scale(${scale})`;

            // 3. Shake Effect (Button hilega)
            noBtn.style.animation = "shake 0.3s ease";
            setTimeout(() => noBtn.style.animation = "", 300);
        };

        noBtn.addEventListener("mouseover", handleNoInteraction);
        noBtn.addEventListener("click", handleNoInteraction);

        yesBtn.addEventListener("click", () => {
            // Trigger Vibrate (Mobile only)
            if (navigator.vibrate) {
                navigator.vibrate([200, 100, 200]); // Vibrate pattern
            }

            // Trigger Heart Explosion
            if (window.confetti) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    shapes: ['heart'],
                    colors: ['#ff0000', '#ff69b4', '#ff1493', '#ffd700']
                });
            }
            showFinalLetter();
        });
    });
}

function showFinalLetter() {
    document.body.classList.remove('heartbeat-mode'); // Stop heartbeat
    startFloatingEmojis(); // Start celebration emojis
    transitionTo(`
        <div id="final-letter" class="handwritten-letter" style="position: relative;">
            <div class="tape"></div>
            <p id="letter-content"></p>
            <p id="letter-signature" style="text-align: right; opacity: 0; transition: opacity 1s;"></p>
        </div>
        <div style="margin-top: 30px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <button id="whatsappBtn" style="padding: 12px 25px; font-size: 1em; cursor: pointer; background: #25D366; color: white; border: none; border-radius: 50px; transition: 0.3s; box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3); font-weight: bold;">💬 Share News</button>
            <button id="replayBtn" style="padding: 12px 25px; font-size: 1em; cursor: pointer; background: white; color: #d63384; border: 2px solid #d63384; border-radius: 50px; transition: 0.3s; font-weight: bold;">🔄 Replay</button>
        </div>
    `, () => {
        createHearts();
        
        // Typewriter Effect for the letter
        const content = "My Dearest Neha,\n\nThank you for saying YES! ❤️\n\nHi website banavtana mala mahit navhta ki tula kashi watel, pan majhya sathi he fakt code nahi, majhya feelings aahet.\n\nTu aalis ani ayushya sundar jhala. I promise to be your best friend, your support, and your safe place, always.\n\nHappy Valentine's Day! 🌹";
        const signature = `— Yours, ${senderName} ❤️`;
        
        typeWriter("letter-content", content, 50, () => {
            const sig = document.getElementById("letter-signature");
            sig.innerHTML = signature;
            sig.style.opacity = 1;
        });

        // WhatsApp Share Logic
        document.getElementById('whatsappBtn').addEventListener('click', () => {
            const text = `I just said YES to ${senderName}! ❤️💍✨`;
            const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        });

        // Replay Button Logic
        document.getElementById('replayBtn').addEventListener('click', () => {
            if (window.confetti) window.confetti.reset(); // Stop confetti
            if (typeof heartsInterval !== 'undefined') clearInterval(heartsInterval); // Stop hearts
            
            card.style.opacity = "0";
            card.style.transform = "translateY(-20px)";
            stopFloatingEmojis(); // Stop emojis on replay
            setTimeout(() => {
                showOpening();
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, 800);
        });
    });
}

// Helper: Typewriter Effect
function typeWriter(elementId, text, speed, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.innerHTML = "";
    
    if (!text) {
        if (callback) callback();
        return;
    }

    const chars = [...text]; 
    let i = 0;

    function type() {
        if (!document.getElementById(elementId)) return; 
        
        if (i < chars.length) {
            const char = chars[i];
            if (char === '\n') {
                element.appendChild(document.createElement('br'));
            } else {
                // Create text node to safely append text and emojis
                element.appendChild(document.createTextNode(char));
            }
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// Hearts animation function (remains the same)
let heartsInterval;
function createHearts() {
    if (heartsInterval) clearInterval(heartsInterval);
    heartsInterval = setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.bottom = "0px";
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 3000);
    }, 200);
}

// --- FINAL CELEBRATION EMOJIS ---
let emojiInterval;
function startFloatingEmojis() {
    const emojis = ['❤️', '💖', '💍', '✨', '🌹', '💑', '💌', '😍'];
    emojiInterval = setInterval(() => {
        const el = document.createElement('div');
        el.classList.add('floating-emoji');
        el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.position = 'fixed';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.bottom = '-50px';
        el.style.fontSize = (Math.random() * 20 + 20) + 'px';
        el.style.animation = `floatUp ${Math.random() * 3 + 3}s linear forwards`;
        el.style.zIndex = '1000';
        el.style.pointerEvents = 'none';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 6000);
    }, 300);
}
function stopFloatingEmojis() {
    if (emojiInterval) clearInterval(emojiInterval);
    document.querySelectorAll('.floating-emoji').forEach(e => e.remove());
}

// --- FLOATING BACKGROUND HEARTS ---
function startBackgroundHearts() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("bg-heart");
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 20 + 10) + "px";
        heart.style.animationDuration = (Math.random() * 5 + 10) + "s";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 15000);
    }, 800);
}
startBackgroundHearts();

// --- MOUSE TRAIL EFFECT ---
document.addEventListener('mousemove', function(e) {
    if(Math.random() < 0.15) { // Create sparkles occasionally
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = e.pageX + 'px';
        sparkle.style.top = e.pageY + 'px';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
});

// --- CLICK HEART EFFECT ---
document.addEventListener('click', function(e) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = (e.clientX - 10) + 'px';
    heart.style.top = (e.clientY - 10) + 'px';
    heart.style.fontSize = '24px';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatUp 1s ease-out forwards';
    heart.style.zIndex = '10000';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
});

// --- PREMIUM MUSIC PLAYER (Floating Vinyl Style) ---
const playerStyle = document.createElement('style');
playerStyle.innerHTML = `
  #music-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  
  /* Minimized State (Floating Vinyl) */
  #music-icon {
    width: 60px;
    height: 60px;
    background: conic-gradient(#222 0% 95%, #444 100%); /* Vinyl look */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    transition: transform 0.3s ease;
    border: 2px solid #ff9a9e;
    position: relative;
    z-index: 10002;
  }
  #music-icon::after {
    content: '❤️';
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: #ff9a9e;
    border-radius: 50%;
    position: absolute;
    border: 2px solid white;
    color: white;
  }
  #music-icon:hover { transform: scale(1.1) rotate(10deg); }
  
  @keyframes spinVinyl { 100% { transform: rotate(360deg); } }
  .spinning { animation: spinVinyl 4s linear infinite; }

  /* Tooltip */
  .music-tooltip {
    position: absolute;
    right: 75px;
    top: 18px;
    background: white;
    padding: 6px 15px;
    border-radius: 20px;
    font-size: 13px;
    color: #d63384;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    opacity: 1;
    transition: opacity 0.5s;
    pointer-events: none;
    white-space: nowrap;
    animation: floatTooltip 2s infinite ease-in-out;
  }
  @keyframes floatTooltip {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-5px); }
  }
  .music-tooltip::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 6px 0 6px 6px;
    border-style: solid;
    border-color: transparent transparent transparent white;
  }

  /* Expanded State (Playlist Card) */
  #music-card-popup {
    position: absolute;
    bottom: 80px;
    right: 0;
    width: 320px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(25px) saturate(180%);
    -webkit-backdrop-filter: blur(25px) saturate(180%);
    border-radius: 24px;
    padding: 25px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.25);
    border: 1px solid rgba(255,255,255,0.8);
    display: none;
    transform-origin: bottom right;
    animation: openPopup 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 10001;
  }
  @keyframes openPopup {
    from { opacity: 0; transform: scale(0.8) translateY(20px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  
  .player-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 10px; }
  .player-title { font-size: 1.2em; font-weight: 700; color: #b91c1c; font-family: 'Playfair Display', serif; }
  .close-btn { background: none; border: none; font-size: 22px; cursor: pointer; color: #999; transition: color 0.2s; }
  .close-btn:hover { color: #d63384; }
  
  .track-list { list-style: none; padding: 0; margin: 0; max-height: 200px; overflow-y: auto; }
  .track-list::-webkit-scrollbar { width: 4px; }
  .track-list::-webkit-scrollbar-thumb { background: #ff9a9e; border-radius: 10px; }
  .track-list { -webkit-overflow-scrolling: touch; } /* Smooth scroll for mobile playlist */
  
  .track-item { 
    padding: 12px 15px; 
    font-size: 14px; 
    color: #555; 
    cursor: pointer; 
    border-radius: 15px; 
    transition: all 0.2s; 
    display: flex; 
    align-items: center; 
    margin-bottom: 8px; 
    border: 1px solid transparent;
    background: rgba(255,255,255,0.5);
  }
  .track-item:hover { background: white; transform: translateX(5px); box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
  .track-item.active { 
    background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%); 
    color: #b91c1c; 
    font-weight: 700; 
    box-shadow: 0 5px 15px rgba(255, 154, 158, 0.4);
    border: 1px solid rgba(255,255,255,0.6);
  }
  .track-icon { margin-right: 12px; font-size: 16px; width: 20px; text-align: center; }

  .player-controls { display: flex; justify-content: center; gap: 20px; margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(0,0,0,0.05); }
  .ctrl-btn { background: white; border: 1px solid #eee; width: 45px; height: 45px; border-radius: 50%; font-size: 18px; cursor: pointer; color: #d63384; transition: all 0.2s; box-shadow: 0 4px 10px rgba(0,0,0,0.05); display: flex; align-items: center; justify-content: center; }
  .ctrl-btn:hover { transform: scale(1.1); background: #fff0f5; box-shadow: 0 6px 15px rgba(221, 36, 118, 0.2); }
  .ctrl-btn#playPauseBtn { width: 55px; height: 55px; font-size: 24px; background: linear-gradient(to right, #ff512f, #dd2476); color: white; border: none; box-shadow: 0 6px 20px rgba(221, 36, 118, 0.4); }
  .ctrl-btn#playPauseBtn:hover { transform: scale(1.1); box-shadow: 0 8px 25px rgba(221, 36, 118, 0.6); }

  /* Visualizer Effect */
  .visualizer-container { display: flex; align-items: flex-end; justify-content: center; height: 40px; gap: 4px; margin-bottom: 15px; }
  .bar { width: 5px; background: linear-gradient(to top, #ff9a9e, #dd2476); border-radius: 3px; height: 5px; animation: dance 0.6s ease-in-out infinite alternate; }
  .visualizer-container.active .bar { animation-play-state: running; }
  .visualizer-container:not(.active) .bar { animation-play-state: paused; height: 5px !important; transition: height 0.3s ease; }
  @keyframes dance { 0% { height: 5px; } 100% { height: 35px; } }
  .bar:nth-child(1) { animation-delay: 0s; }
  .bar:nth-child(2) { animation-delay: 0.2s; }
  .bar:nth-child(3) { animation-delay: 0.4s; }
  .bar:nth-child(4) { animation-delay: 0.1s; }
  .bar:nth-child(5) { animation-delay: 0.3s; }
  .bar:nth-child(6) { animation-delay: 0.5s; }

  @media (max-width: 768px) {
    #music-widget { bottom: 20px; right: 15px; } /* Safe area for Android nav bars */
    #music-icon { width: 50px; height: 50px; }
    #music-card-popup { width: 280px; bottom: 70px; right: -10px; }
    .player-title { font-size: 1em; }
    .ctrl-btn { width: 40px; height: 40px; font-size: 16px; }
    .ctrl-btn#playPauseBtn { width: 50px; height: 50px; font-size: 20px; }
  }
`;
document.head.appendChild(playerStyle);

// HTML Structure
const widget = document.createElement('div');
widget.id = 'music-widget';
widget.innerHTML = `
  <div id="music-icon">
    <div class="music-tooltip">🎵 Play Music</div>
  </div>
  <div id="music-card-popup">
    <div class="player-header">
      <span class="player-title">💖 Romantic Playlist</span>
      <button class="close-btn">&times;</button>
    </div>
    <div class="visualizer-container" id="visualizer">
        <div class="bar"></div><div class="bar"></div><div class="bar"></div>
        <div class="bar"></div><div class="bar"></div><div class="bar"></div>
        <div class="bar"></div><div class="bar"></div>
    </div>
    <ul class="track-list" id="playlist-ul"></ul>
    <div class="player-controls">
      <button class="ctrl-btn" id="prevBtn">⏮</button>
      <button class="ctrl-btn" id="playPauseBtn">▶️</button>
      <button class="ctrl-btn" id="nextBtn">⏭</button>
    </div>
  </div>
`;
document.body.appendChild(widget);

// Playlist Data (Add your local files here)
const playlist = [
    { title: "Jab Koi Baat Bigad Jaaye", src: "jab_koi_baat_bigad_jaaye.mp3", mood: "#ff9a9e", art: "https://c.saavncdn.com/973/Jab-Koi-Baat-Bigad-Jaye-Hindi-2018-20180206-500x500.jpg"}, // Pink Mood
    { title: "Chaahat", src: "chaahat.mp3", mood: "#a18cd1", art: "https://c.saavncdn.com/586/Chaahat-Hindi-1996-20190420131932-500x500.jpg" }, // Purple Mood
    { title: "Akhiyaan Gulaab", src: "akhiyaan_gulaab.mp3", mood: "#fad0c4", art: "https://c.saavncdn.com/284/Teri-Baaton-Mein-Aisa-Uljha-Jiya-Hindi-2024-20240205151011-500x500.jpg" }, // Peach Mood
    // Aur songs add kar sakte hain isi tarah...
];



let currentTrack = 0;
const audioPlayer = new Audio();
const musicIcon = document.getElementById('music-icon');
const musicCard = document.getElementById('music-card-popup');
const listUl = document.getElementById('playlist-ul');
const playBtn = document.getElementById('playPauseBtn');

// Toggle Card
musicIcon.addEventListener('click', () => {
    musicCard.style.display = musicCard.style.display === 'block' ? 'none' : 'block';
    document.querySelector('.music-tooltip').style.opacity = '0'; // Hide tooltip once clicked
});
document.querySelector('.close-btn').addEventListener('click', () => {
    musicCard.style.display = 'none';
});

// Render List
function renderList() {
    listUl.innerHTML = '';
    playlist.forEach((track, idx) => {
        const li = document.createElement('li');
        li.className = `track-item ${idx === currentTrack ? 'active' : ''}`;
        li.innerHTML = `<span class="track-icon">${idx === currentTrack && !audioPlayer.paused ? '🔊' : '🎵'}</span> ${track.title}`;
        li.onclick = () => playSong(idx);
        listUl.appendChild(li);
    });
}

function playSong(idx) {
    currentTrack = idx;
    audioPlayer.src = playlist[idx].src;
    audioPlayer.play().catch(e => console.log("Audio Error (Check file path):", e));
    
    // Change Mood Color
    if (playlist[idx].mood) {
        moodOverlay.style.backgroundColor = playlist[idx].mood;
    }
    
    // Change Background Art
    if (playlist[idx].art) {
        const bg = document.querySelector('.cinematic-bg');
        if (bg) bg.style.backgroundImage = `radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%), url('${playlist[idx].art}')`;
    }
    updateUI(true);
}

function updateUI(isPlaying) {
    playBtn.innerHTML = isPlaying ? '⏸' : '▶️';
    if (isPlaying) {
        musicIcon.classList.add('spinning');
        // musicIcon.innerHTML = '💿'; // Keep the heart vinyl look
        document.getElementById('visualizer').classList.add('active');
    } else {
        musicIcon.classList.remove('spinning');
        // musicIcon.innerHTML = '🎵';
        document.getElementById('visualizer').classList.remove('active');
    }
    renderList();
}

// Controls
playBtn.onclick = () => {
    if (audioPlayer.paused) {
        if (!audioPlayer.src) playSong(currentTrack);
        else audioPlayer.play();
        updateUI(true);
    } else {
        audioPlayer.pause();
        updateUI(false);
    }
};

document.getElementById('nextBtn').onclick = () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    playSong(currentTrack);
};

document.getElementById('prevBtn').onclick = () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    playSong(currentTrack);
};

audioPlayer.onended = () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    playSong(currentTrack);
};

// Init
renderList();


// --- CANVA STYLE BACKGROUND BLOBS ---
const b1 = document.createElement('div');
b1.className = 'design-blob';
b1.style.width = '400px';
b1.style.height = '400px';
b1.style.background = '#ff9a9e'; // Soft Pink
b1.style.top = '-100px';
b1.style.left = '-100px';
document.body.appendChild(b1);

const b2 = document.createElement('div');
b2.className = 'design-blob';
b2.style.width = '300px';
b2.style.height = '300px';
b2.style.background = '#a18cd1'; // Soft Purple
b2.style.bottom = '-50px';
b2.style.right = '-50px';
document.body.appendChild(b2);

// --- VINTAGE GRAIN OVERLAY ---
const grain = document.createElement('div');
grain.classList.add('grain-overlay');
document.body.appendChild(grain);

// --- START SCREEN (Tap to Enter) ---
function createStartOverlay() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)';
    overlay.style.zIndex = '20000';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.cursor = 'pointer';
    overlay.innerHTML = `
        <h1 style="font-size: clamp(2.5em, 8vw, 4em); color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.2); font-family: 'Dancing Script', cursive;">❤️ For Neha</h1>
        <p style="color: white; font-size: 1.2em; margin-top: 10px; animation: pulse-btn 2s infinite;">Tap anywhere to start</p>
        <p style="color: rgba(255,255,255,0.7); font-size: 0.8em; position: absolute; bottom: 20px;">Made with ❤️ by ${senderName}</p>
    `;
    overlay.onclick = () => {
        overlay.style.transition = 'opacity 1s';
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 1000);
        
        showOpening();
    };
    document.body.appendChild(overlay);
}

createStartOverlay();
