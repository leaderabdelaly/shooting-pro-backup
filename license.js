const proBtn = document.getElementById("proBtn");
const proModal = document.getElementById("proModal");
const activateBtn = document.getElementById("activateBtn");
const cancelProBtn = document.getElementById("cancelProBtn");
const proCodeInput = document.getElementById("proCode");
const postureSection = document.getElementById("postureSection");

let isPro = localStorage.getItem("isPro") === "true";

/* ---------- UI ---------- */
function showProModal() {
  proModal.classList.remove("hidden");
}

function hideProModal() {
  proModal.classList.add("hidden");
}

/* ---------- Activation ---------- */
function activatePro() {
  const code = proCodeInput.value.trim();

  if (code.length < 6) {
    alert("كود التفعيل غير صحيح");
    return;
  }

  localStorage.setItem("isPro", "true");
  isPro = true;

  hideProModal();
  proBtn.style.display = "none";
  postureSection.classList.remove("hidden");

  alert("تم تفعيل النسخة الاحترافية");
}

/* ---------- Events ---------- */
proBtn.addEventListener("click", showProModal);
cancelProBtn.addEventListener("click", hideProModal);
activateBtn.addEventListener("click", activatePro);

/* ---------- Init ---------- */
window.addEventListener("load", () => {
  if (isPro) {
    proBtn.style.display = "none";
    postureSection.classList.remove("hidden");
    hideProModal();
  } else {
    proBtn.style.display = "inline-block";
    postureSection.classList.add("hidden");
    hideProModal();
  }
});
