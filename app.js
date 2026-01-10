const canvas = document.getElementById("targetCanvas");
const ctx = canvas.getContext("2d");

let targetImg = new Image();
let center = null;
let shots = [];
let mode = null;

document.getElementById("targetUpload").onchange = e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    targetImg.src = reader.result;
    targetImg.onload = () => {
      canvas.width = targetImg.width;
      canvas.height = targetImg.height;
      redraw();
    };
  };
  reader.readAsDataURL(file);
};

function redraw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(targetImg,0,0);
  if (center) drawPoint(center.x, center.y, "red");
  shots.forEach((s,i) => drawPoint(s.x,s.y,"yellow", i+1));
}

function drawPoint(x,y,color,label) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x,y,6,0,Math.PI*2);
  ctx.fill();
  if (label) {
    ctx.fillText(label, x+8, y-8);
  }
}

document.getElementById("setCenterBtn").onclick = () => mode = "center";
document.getElementById("shotBtn").onclick = () => mode = "shot";

canvas.addEventListener("click", e => {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);

  if (mode === "center") {
    center = {x,y};
    redraw();
  } else if (mode === "shot" && center) {
    shots.push({x,y});
    redraw();
  }
});

document.getElementById("analyzeBtn").onclick = () => {
  document.getElementById("results").innerText =
    "تم تحليل " + shots.length + " طلقات";
};
