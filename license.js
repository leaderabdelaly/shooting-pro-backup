let isPro = localStorage.getItem("isPro") === "true";

function openPro() {
  document.getElementById("proModal").classList.remove("hidden");
}

function closePro() {
  document.getElementById("proModal").classList.add("hidden");
}

function activatePro(code) {
  if (code.length >= 6) {
    isPro = true;
    localStorage.setItem("isPro", "true");
    alert("Pro Activated Successfully");
    document.getElementById("postureSection").classList.remove("hidden");
    closePro();
  } else {
    alert("Invalid Code");
  }
}
