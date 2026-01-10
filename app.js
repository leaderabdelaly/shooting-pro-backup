let canvas = document.getElementById("overlay");
let ctx = canvas.getContext("2d");
let img = document.getElementById("targetImage");

let center = null;
let shots = [];
let lang = "ar";
let langData = {};
let errorsData = {};

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
    draw();
    canvas.onclick = null;
  };
};

document.getElementById("shotBtn").onclick = () => {
  if (!center) return;
  canvas.onclick = e => {
    let pos = getPos(e);
    shots.push(pos);
    draw();
    analyzeShot(pos);
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
  let dy = shot.y - center.y;
  let key;

  if (Math.abs(dx) > Math.abs(dy)) {
    key = dx < 0 ? "LEFT" : "RIGHT";
  } else {
    key = dy < 0 ? "UP" : "DOWN";
  }

  let e = errorsData[key];
  if (!e) return;

  document.getElementById("analysisResult").innerHTML =
    `<p>${lang === "ar" ? e.ar_error : e.en_error}</p>
     <p>${lang === "ar" ? e.ar_cause : e.en_cause}</p>
     <p>${lang === "ar" ? e.ar_fix : e.en_fix}</p>`;
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
