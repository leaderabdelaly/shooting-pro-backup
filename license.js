/* ==========================
   License System
   ========================== */

const MASTER_KEY = "SHEHABY-PRO-2026";
const STORAGE_KEY = "shehaby_license";

function isProUser() {
  return localStorage.getItem(STORAGE_KEY) === "PRO";
}

function activatePro(key) {
  if (key === MASTER_KEY) {
    localStorage.setItem(STORAGE_KEY, "PRO");
    alert("تم تفعيل النسخة الاحترافية بنجاح");
    return true;
  }
  alert("كود غير صحيح");
  return false;
}

function maxShotsAllowed() {
  return isProUser() ? Infinity : 10;
}
