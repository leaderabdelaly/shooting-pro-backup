let isPro = false;

document.getElementById("activateProBtn").onclick = () => {
  let code = prompt("ادخل كود التفعيل");
  if (code === "MASTER-2026") {
    isPro = true;
    document.getElementById("proStatus").innerText = "تم تفعيل النسخة الاحترافية";
  } else {
    alert("كود غير صحيح");
  }
};
