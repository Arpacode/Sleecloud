//GLOBAL STATE
let isColorful = false;
let isRaining = false;
let rainTimer;
let progress = 0;

const colors = ["#00B4FF", "#FF4500", "#00FF00", "#FF0000"];
const messages = [
  "Warming up...",
  "Loading cloud...",
  "Almost ready...",
  "Sit back and relax",
  "Made by @Arpan"
];

//DOM CACHE 
const cloud = document.getElementById('cloud');
const switchBtn = document.getElementById('switch');
const colorBtn = document.getElementById('colorful-button');

const loadingBar = document.getElementById('loading-bar');
const loadingMsg = document.querySelector('.loading-message');
const loadingScreen = document.getElementById('loading-screen');

//STARs
function makeStars() {
    var stars = document.createDocumentFragment(); // idk why this is faster but yt said so
    
    for(var i = 0; i < 100; i++) { 
        var s = document.createElement('div');
        s.className = 'star';
        
        // random position everywhere
        s.style.top = Math.random() * 100 + 'vh';
        s.style.left = Math.random() * 100 + 'vw';
        
        // size between 1px and 3px looks good
        var sz = Math.random() * 2 + 1;
        s.style.width = sz + 'px';
        s.style.height = sz + 'px';
        
        // add twinkle later
        // s.style.animation = 'twinkle 2s infinite';
        
        stars.appendChild(s);
    }
    
    document.body.appendChild(stars); 
}

makeStars(); 

//RAIN
function createRaindrop() {
  const drop = document.createElement('div');
  drop.className = 'raindrop';

  const rect = cloud.getBoundingClientRect();

  drop.style.left = rect.left + Math.random() * rect.width + 'px';
  drop.style.top = rect.bottom + 'px';

  if (isColorful) {
    const c = colors[Math.floor(Math.random() * colors.length)];
    drop.style.background = c;
    drop.style.boxShadow = `0 0 8px ${c}`;
  }

  document.body.appendChild(drop);

  drop.addEventListener('animationend', () => drop.remove());
}

function toggleRain() {
  if (isRaining) {
    clearInterval(rainTimer);
    isRaining = false;
    switchBtn.textContent = "Start Rain";
    colorBtn.classList.remove('visible');

    document.querySelectorAll('.raindrop').forEach(d => d.remove());
  } else {
    rainTimer = setInterval(createRaindrop, 60);
    isRaining = true;
    switchBtn.textContent = "Stop Rain";
    colorBtn.classList.add('visible');
  }
}

function toggleColorfulRain() {
  isColorful = !isColorful;

  colorBtn.textContent = isColorful ? "Normal Rain" : "Colorful Rain";

  document.querySelectorAll('.raindrop').forEach(d => d.remove());
}

//Loading screen
function updateBar() {
  const total = 30;
  const filled = Math.floor(progress / 100 * total);
  const empty = total - filled;

  loadingBar.textContent =
    `[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${progress}%`;

  const msgIndex = Math.min(
    Math.floor(progress / 20),
    messages.length - 1
  );
  loadingMsg.textContent = messages[msgIndex];

  if (progress < 100) {
    progress++;
    setTimeout(updateBar, 35);
  } else {
    loadingScreen.style.transition = 'opacity .5s';
    loadingScreen.style.opacity = 0;

    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
}

//MUSIC menu
const menuIcon = document.getElementById("menu-icon");
const overlay = document.getElementById("overlay");
const musicBox = document.getElementById("music-box");
const closeBtn = document.getElementById("close-btn");
const player = document.getElementById("player");
const options = document.querySelectorAll(".song-option");

let autoCloseTimer;

function openMenu() {
  overlay.classList.add("active");
  musicBox.classList.add("active");
  resetAutoClose();
}

function closeMenu() {
  musicBox.classList.add("closing");

  setTimeout(() => {
    overlay.classList.remove("active");
    musicBox.classList.remove("active", "closing");
  }, 400);

  clearTimeout(autoCloseTimer);
}

function resetAutoClose() {
  clearTimeout(autoCloseTimer);
  autoCloseTimer = setTimeout(closeMenu, 15000);
}
//Events
switchBtn.onclick = toggleRain;
colorBtn.onclick = toggleColorfulRain;

menuIcon.onclick = openMenu;
closeBtn.onclick = closeMenu;

musicBox.addEventListener("mousemove", resetAutoClose);
musicBox.addEventListener("touchstart", resetAutoClose);

options.forEach(btn => {
  btn.onclick = () => {
    const src = btn.dataset.src;
    if (src) {
      player.src = src;
      player.play().catch(() => {});
      resetAutoClose();
    }
  };
});


//INIT
updateBar();

//fuck i spent a week to create this shit 😭🔥
//hope you like it 🌷
