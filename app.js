const img = document.getElementById("targetImage");
const canvas = document.getElementById("shotCanvas");
const ctx = canvas.getContext("2d");

let center = null;
let shots = [];
let lang = "ar";

function resizeCanvas() {
  canvas.width = img.clientWidth;
  canvas.height = img.clientHeight;
}
img.onload = resizeCanvas;
window.onresize = resizeCanvas;

document.getElementById("targetUpload").onchange = e => {
  img.src = URL.createObjectURL(e.target.files[0]);
};

document.getElementById("setCenterBtn").onclick = () => {
  canvas.onclick = e => {
    center = { x: e.offsetX, y: e.offsetY };
    draw();
    canvas.onclick = addShot;
  };
};

function addShot(e) {
  shots.push({ x: e.offsetX, y: e.offsetY });
  draw();
}

function draw() {
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

document.getElementById("clearShotsBtn").onclick = () => {
  shots = [];
  draw();
};

document.getElementById("langBtn").onclick = () => {
  lang = lang === "ar" ? "en" : "ar";
};

document.getElementById("proBtn").onclick = openPro;
document.getElementById("activateBtn").onclick = () =>
  activatePro(document.getElementById("proCode").value);

// -------- Posture Analysis --------

const shooterImg = document.getElementById("shooterImage");
const postureCanvas = document.getElementById("postureCanvas");
const pctx = postureCanvas.getContext("2d");
const postureAnalysis = document.getElementById("postureAnalysis");

let points = [];
const labels = ["Head","Shoulder","Hip","Knee","Foot"];

document.getElementById("shooterUpload").onchange = e => {
  shooterImg.src = URL.createObjectURL(e.target.files[0]);
};

shooterImg.onload = () => {
  postureCanvas.width = shooterImg.clientWidth;
  postureCanvas.height = shooterImg.clientHeight;
};

postureCanvas.onclick = e => {
  if (points.length >= 5) return;
  points.push({ x: e.offsetX, y: e.offsetY });
  pctx.fillStyle = "lime";
  pctx.beginPath();
  pctx.arc(e.offsetX, e.offsetY, 5, 0, Math.PI*2);
  pctx.fill();

  if (points.length === 5) analyzePosture();
};

function analyzePosture() {
  const head = points[0];
  const foot = points[4];
  const dx = Math.abs(head.x - foot.x);

  if (dx > 30) {
    postureAnalysis.innerHTML =
      "خطأ في التوازن – الوزن مش متوزع صح<br>Fix: Shift weight evenly on both feet";
  } else {
    postureAnalysis.innerHTML =
      "وقفة سليمة ومتزنة<br>Stable posture";
  }
}

if (isPro) {
  document.getElementById("postureSection").classList.remove("hidden");
}
