// ---------- STARS ----------
const starCount = 100;
for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.top = Math.random() * 100 + 'vh';
  star.style.left = Math.random() * 100 + 'vw';
  const size = Math.random() * 2 + 1;
  star.style.width = star.style.height = size + 'px';
  document.body.appendChild(star);
}

// ---------- RAIN (your original div raindrops) ----------
let isRaining = false;
let isColorful = false;
let rainInterval;
const colors = ["#00B4FF", "#FF4500", "#00FF00", "#FF0000"];

function createRaindrop() {
  const raindrop = document.createElement('div');
  raindrop.className = 'raindrop';

  const cloud = document.getElementById('cloud');
  const cloudRect = cloud.getBoundingClientRect();
  const leftPosition = cloudRect.left + Math.random() * cloudRect.width;

  raindrop.style.left = leftPosition + 'px';
  raindrop.style.top = cloudRect.bottom + 'px';

  if (isColorful) {
    const c = colors[Math.floor(Math.random() * colors.length)];
    raindrop.style.background = `linear-gradient(to bottom, ${c}, ${c})`;
    raindrop.style.boxShadow = `0 0 5px ${c}, 0 0 10px ${c}, 0 0 15px ${c}`;
  }

  document.body.appendChild(raindrop);
  raindrop.addEventListener('animationend', () => raindrop.remove());
}

function toggleRain() {
  if (isRaining) {
    clearInterval(rainInterval);
    isRaining = false;
    document.getElementById('switch').textContent = "Start Rain";
    document.getElementById('colorful-button').classList.remove('visible');
    document.querySelectorAll('.raindrop').forEach(r => r.remove());
  } else {
    rainInterval = setInterval(createRaindrop, 50);
    isRaining = true;
    document.getElementById('switch').textContent = "Stop Rain";
    document.getElementById('colorful-button').classList.add('visible');
  }
}
function toggleColorfulRain() {
  isColorful = !isColorful;
  document.getElementById('colorful-button').textContent = isColorful ? "Normal Rain" : "Colorful Rain";
  document.querySelectorAll('.raindrop').forEach(r => r.remove());
}
document.getElementById('switch').addEventListener('click', toggleRain);
document.getElementById('colorful-button').addEventListener('click', toggleColorfulRain);

// ---------- LOADING (ASCII bar) ----------
let progress = 0;
const loadingBarElement = document.getElementById('loading-bar');

function updateLoadingBar() {
  const totalBlocks = 30; // change to resize bar
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);
  const emptyBlocks  = totalBlocks - filledBlocks;

  const bar = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);
  loadingBarElement.textContent = `[${bar}] ${progress}%`;

  if (progress < 100) {
    progress++;
    setTimeout(updateLoadingBar, 35);
  } else {
    // Fade out loading screen
    const ls = document.getElementById('loading-screen');
    ls.style.transition = 'opacity 0.5s ease';
    ls.style.opacity = '0';
    setTimeout(() => { ls.style.display = 'none'; }, 500);
  }
}
updateLoadingBar();

// ---------- MUSIC MENU (Arch-like open/close + blur) ----------
const menuIcon = document.getElementById("menu-icon");
const overlay  = document.getElementById("overlay");
const musicBox = document.getElementById("music-box");
const closeBtn = document.getElementById("close-btn");
const player   = document.getElementById("player");
const options  = document.querySelectorAll(".song-option");

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
  }, 400); // match CSS
  clearTimeout(autoCloseTimer);
}
function resetAutoClose() {
  clearTimeout(autoCloseTimer);
  autoCloseTimer = setTimeout(closeMenu, 15000);
}

menuIcon.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
musicBox.addEventListener("mousemove", resetAutoClose);
musicBox.addEventListener("touchstart", resetAutoClose);

// choose & play
options.forEach(btn => {
  btn.addEventListener("click", () => {
    const src = btn.dataset.src;
    if (src) {
      player.src = src;
      player.play().catch(()=>{}); // mobile may require user gesture; this is already a click
      resetAutoClose();
    }
  });
});
