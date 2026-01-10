const canvas = document.getElementById("targetCanvas");
const ctx = canvas.getContext("2d");
const results = document.getElementById("results");

let targetImg = new Image();
let center = null;
let shots = [];
let mode = null;

/* ---------- Upload Target ---------- */
document.getElementById("targetUpload").onchange = e => {
  const file = e.target.files[0];
  if (!file) return;

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

/* ---------- Drawing ---------- */
function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(targetImg, 0, 0);

  if (center) drawPoint(center.x, center.y, "red");

  shots.forEach((s, i) => {
    drawPoint(s.x, s.y, "yellow", i + 1);
  });
}

function drawPoint(x, y, color, label) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.fill();

  if (label) {
    ctx.fillStyle = "#fff";
    ctx.fillText(label, x + 8, y - 8);
  }
}

/* ---------- Modes ---------- */
document.getElementById("setCenterBtn").onclick = () => mode = "center";
document.getElementById("shotBtn").onclick = () => mode = "shot";

/* ---------- Click ---------- */
canvas.addEventListener("click", e => {
  if (!targetImg.src) return;

  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);

  if (mode === "center") {
    center = { x, y };
    redraw();
  }

  if (mode === "shot" && center) {
    shots.push({ x, y });
    redraw();
  }
});

/* ---------- Analysis ---------- */
document.getElementById("analyzeBtn").onclick = () => {
  if (!center || shots.length === 0) {
    results.innerText = "حدد مركز الهدف ووقع الطلقات أولا";
    return;
  }

  let output = "";
  shots.forEach((s, i) => {
    const dx = s.x - center.x;
    const dy = center.y - s.y;

    let dir = "";

    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      dir = "X – طلقة مركزية صحيحة";
   {
    "errors": {
      "ar": {
      "up": "دفع المعصم لأعلى أو خفض الرأس",
      "down": "كسر المعصم لأسفل أو رفع الرأس",
      "right": "ضغط زائد بالإبهام أو زيادة شدة القبض",
      "left": "سحب التريجر بطرف عقلة السبابة",
      "upRight": "توقع الارتداد مع شد القبضة",
      "downRight": "زيادة شدة القبض أثناء السحب",
      "downLeft": "نش الزناد مع زيادة قوة القبض",
      "upLeft": "عدم متابعة الطلقة"
    }
  },
  "en": {
    "center": "Set Center",
    "clear": "Clear Shots",
    "pro": "Pro Version",
    "freeLimit": "Free version allows only 10 shots",
    "perfect": "Perfect center shot – no error",
    "errors": {
      "up": "Breaking wrist up or DROPPED head",
      "down": "Breaking wrist down or RAISED head",
      "right": "Thumb pressure or tightening grip",
      "left": "Too little trigger finger",
      "upRight": "Anticipating recoil",
      "downRight": "Tightening grip while pulling trigger",
      "downLeft": "Jerking trigger",
      "upLeft": "No follow-through"
    }
  }
}

    output += `طلقة ${i + 1}: ${dir}\n`;
  });

  results.innerText = output;
};

