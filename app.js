const img = document.getElementById("targetImage");
const canvas = document.getElementById("shotCanvas");
const ctx = canvas.getContext("2d");
const analysis = document.getElementById("analysis");

let center = null;
let shots = [];
let lang = "ar";
let texts = {};

fetch("lang.json")
  .then(r => r.json())
  .then(data => texts = data);

function resizeCanvas() {
  canvas.width = img.clientWidth;
  canvas.height = img.clientHeight;
}
window.addEventListener("resize", resizeCanvas);
img.onload = resizeCanvas;

document.getElementById("targetUpload").onchange = e => {
  img.src = URL.createObjectURL(e.target.files[0]);
};

document.getElementById("setCenterBtn").onclick = () => {
  canvas.onclick = e => {
    center = { x: e.offsetX, y: e.offsetY };
    redraw();
    canvas.onclick = addShot;
  };
};

function addShot(e) {
  if (!isPro && shots.length >= 10) {
    alert(texts[lang].freeLimit);
    return;
  }
  shots.push({ x: e.offsetX, y: e.offsetY });
  redraw();
  analyzeShot(e.offsetX, e.offsetY);
}

function redraw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if (center) {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(center.x, center.y, 5, 0, Math.PI*2);
    ctx.fill();
  }
  ctx.fillStyle = "red";
  shots.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, 4, 0, Math.PI*2);
    ctx.fill();
  });
}

function analyzeShot(x,y) {
  if (!center) return;
  const dx = x - center.x;
  const dy = center.y - y;
  const r = Math.hypot(dx,dy);

  if (r < 15) {
    analysis.innerHTML += `<p class="shot">${texts[lang].perfect}</p>`;
    return;
  }

  let key = "";
  if (dy > 0 && Math.abs(dx) < dy) key = "up";
  else if (dy < 0 && Math.abs(dx) < -dy) key = "down";
  else if (dx > 0 && Math.abs(dy) < dx) key = "right";
  else if (dx < 0 && Math.abs(dy) < -dx) key = "left";
  else if (dx > 0 && dy > 0) key = "upRight";
  else if (dx > 0 && dy < 0) key = "downRight";
  else if (dx < 0 && dy < 0) key = "downLeft";
  else if (dx < 0 && dy > 0) key = "upLeft";

  analysis.innerHTML += `<p id="error">${texts[lang].errors[key]}</p>`;
}

document.getElementById("clearShotsBtn").onclick = () => {
  shots = [];
  analysis.innerHTML = "";
  redraw();
};

document.getElementById("langBtn").onclick = () => {
  lang = lang === "ar" ? "en" : "ar";
  document.getElementById("langBtn").innerText = lang === "ar" ? "EN" : "AR";
};
