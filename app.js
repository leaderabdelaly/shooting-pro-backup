let canvas = document.getElementById("overlay");
let ctx = canvas.getContext("2d");
let img = document.getElementById("targetImage");

let center = null;
let shots = [];
let currentLang = "ar";
let errorsData = {};

canvas.width = img.width;
canvas.height = img.height;

fetch("errors.json")
  .then(res => res.json())
  .then(data => errorsData = data);

document.getElementById("setCenterBtn").onclick = () => {
  canvas.onclick = e => {
    center = getPos(e);
    draw();
    canvas.onclick = null;
  };
};

document.getElementById("shotBtn").onclick = () => {
  if (!center) return;
  canvas.onclick = e => {
    shots.push(getPos(e));
    draw();
    analyzeShot(getPos(e));
    canvas.onclick = null;
  };
};

document.getElementById("resetBtn").onclick = () => {
  center = null;
  shots = [];
  ctx.clearRect(0,0,canvas.width,canvas.height);
  document.getElementById("analysisResult").innerHTML = "";
};

function getPos(e) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) * (canvas.width / rect.width),
    y: (e.clientY - rect.top) * (canvas.height / rect.height)
  };
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  if (center) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(center.x, center.y, 6, 0, Math.PI*2);
    ctx.fill();
  }

  ctx.fillStyle = "yellow";
  shots.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, 4, 0, Math.PI*2);
    ctx.fill();
  });
}

function analyzeShot(shot) {
  let dx = shot.x - center.x;
  let dy = shot.y - center.y;

  let key;
  if (Math.abs(dx) > Math.abs(dy)) {
    key = dx < 0 ? "LEFT" : "RIGHT";
  } else {
    key = dy < 0 ? "UP" : "DOWN";
  }

  let e = errorsData[key];
  if (!e) return;

  document.getElementById("analysisResult").innerHTML = `
    <p>${currentLang === "ar" ? e.ar_error : e.en_error}</p>
    <p>${currentLang === "ar" ? e.ar_cause : e.en_cause}</p>
    <p>${currentLang === "ar" ? e.ar_fix : e.en_fix}</p>
  `;
}

document.getElementById("langToggle").onclick = () => {
  currentLang = currentLang === "ar" ? "en" : "ar";
  document.getElementById("langToggle").innerText = currentLang === "ar" ? "EN" : "AR";
};
