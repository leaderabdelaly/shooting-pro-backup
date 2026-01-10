let isPro = localStorage.getItem("isPro") === "true";

const proModal = document.getElementById("proModal");
const proBtn = document.getElementById("proBtn");
const postureSection = document.getElementById("postureSection");
const activateBtn = document.getElementById("activateBtn");
const cancelProBtn = document.getElementById("cancelProBtn");
const proCodeInput = document.getElementById("proCode");

function openProModal() {
  proModal.classList.remove("hidden");
}

function closeProModal() {
  proModal.classList.add("hidden");
}

function activatePro() {
  const code = proCodeInput.value.trim();

  if (code.length < 6) {
    alert("كود غير صحيح");
    return;
  }

  localStorage.setItem("isPro", "true");
  isPro = true;

  proModal.classList.add("hidden");
  proBtn.style.display = "none";
  postureSection.classList.remove("hidden");

  alert("تم تفعيل النسخة الاحترافية بنجاح");
}

proBtn.addEventListener("click", openProModal);
cancelProBtn.addEventListener("click", closeProModal);
activateBtn.addEventListener("click", activatePro);

window.addEventListener("load", () => {
  if (isPro) {
    proModal.classList.add("hidden");
    proBtn.style.display = "none";
    postureSection.classList.remove("hidden");
  }
});
