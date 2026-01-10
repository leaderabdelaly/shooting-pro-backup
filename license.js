let isPro = false;

document.getElementById("activateProBtn").onclick = () => {
  let code = prompt("Enter activation code");
  if (code === "SHEHABY2026") {
    isPro = true;
    document.getElementById("proStatus").innerText = "تم تفعيل النسخة الاحترافية";
  } else {
    alert("كود غير صحيح");
  }
};
