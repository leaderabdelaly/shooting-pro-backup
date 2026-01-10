let canvas = document.getElementById("overlay");
let ctx = canvas.getContext("2d");
let img = document.getElementById("targetImage");

let center = null;
let shots = [];
let shotMode = false;

let lang = "ar";
let langData = {};
let errorsData = {};

const X_RADIUS_RATIO = 0.05; // 5% من قطر الهدف

fetch("lang.json").then(r => r.json()).then(d => {
  langData = d;
  applyLang();
});

fetch("errors.json").then(r => r.json()).then(d => errorsData = d);

document.getElementById("targetLoader").onchange = e => {
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.onload = ev => {
    img.src = ev.target.result;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      draw();
    };
  };
  reader.readAsDataURL(file);
};

document.getElementById("setCenterBtn").onclick = () => {
  canvas.onclick = e => {
    center = getPos(e);
    shots = [];
    draw();
    canvas.onclick = null;
  };
};

document.getElementById("shotBtn").onclick = () => {
  if (!center) return;
  shotMode = true;
};

document.getElementById("resetBtn").onclick = () => {
  center = null;
  shots = [];
  shotMode = false;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  document.getElementById("analysisResult").innerHTML = "";
};

canvas.addEventListener("click", e => {
  if (!shotMode || !center) return;
  let pos = getPos(e);
  shots.push(pos);
  draw();
  analyzeShot(pos);
});

function getPos(e) {
  let r = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - r.left) * (canvas.width / r.width),
    y: (e.clientY - r.top) * (canvas.height / r.height)
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
  let dy = center.y - shot.y;

  let dist = Math.sqrt(dx*dx + dy*dy);
  let xRadius = canvas.width * X_RADIUS_RATIO;

  if (dist <= xRadius) {
    document.getElementById("analysisResult").innerHTML =
      lang === "ar"
        ? "طلقة مركزية صحيحة (X) – أداء ممتاز"
        : "Perfect center shot (X) – Excellent execution";
    return;
  }

  let angle = Math.atan2(dy, dx) * 180 / Math.PI;
  let key = "";

  if (angle >= 67.5 && angle < 112.5) key = "UP";
  else if (angle >= 22.5 && angle < 67.5) key = "UP_RIGHT";
  else if (angle >= -22.5 && angle < 22.5) key = "RIGHT";
  else if (angle >= -67.5 && angle < -22.5) key = "DOWN_RIGHT";
  else if (angle >= -112.5 && angle < -67.5) key = "DOWN";
  else if (angle >= -157.5 && angle < -112.5) key = "DOWN_LEFT";
  else if (angle >= 157.5 || angle < -157.5) key = "LEFT";
  else if (angle >= 112.5 && angle < 157.5) key = "UP_LEFT";

  let e = errorsData[key];
  if (!e) return;

  document.getElementById("analysisResult").innerHTML =
    `<b>${lang === "ar" ? e.ar_error : e.en_error}</b><br>
     ${lang === "ar" ? e.ar_cause : e.en_cause}<br>
     ${isPro ? (lang === "ar" ? e.ar_fix : e.en_fix) : ""}`;
}

document.getElementById("langToggle").onclick = () => {
  lang = lang === "ar" ? "en" : "ar";
  document.getElementById("langToggle").innerText = lang === "ar" ? "EN" : "AR";
  applyLang();
};

function applyLang() {
  document.getElementById("appTitle").innerText = langData[lang].title;
  document.getElementById("setCenterBtn").innerText = langData[lang].setCenter;
  document.getElementById("shotBtn").innerText = langData[lang].shot;
  document.getElementById("resetBtn").innerText = langData[lang].reset;
  document.getElementById("analysisTitle").innerText = langData[lang].analysis;
  document.getElementById("proTitle").innerText = langData[lang].pro;
  document.getElementById("activateProBtn").innerText = langData[lang].activate;
}
