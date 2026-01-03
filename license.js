/* =====================================
   Shehaby Shooting Pro – License Engine
   Stable / Non-Intrusive
   ===================================== */

/*
  النسخ:
  FREE  → 10 طلقات + بدون علاج
  PRO   → غير محدود + علاج كامل
*/

const LICENSE_STORAGE_KEY = "shehaby_shooting_license";
const MASTER_PRO_KEY = "SHEHABY-PRO-2026";

/* ==============================
   حالة المستخدم
   ============================== */

function isProUser() {
  return localStorage.getItem(LICENSE_STORAGE_KEY) === "PRO";
}

/* ==============================
   تفعيل النسخة الاحترافية
   ============================== */

function activateProLicense(key) {
  if (key === MASTER_PRO_KEY) {
    localStorage.setItem(LICENSE_STORAGE_KEY, "PRO");
    return true;
  }
  return false;
}

/* ==============================
   القيود
   ============================== */

function canAddShot(currentShotsCount) {
  if (isProUser()) return true;
  return currentShotsCount < 10;
}

function canShowTreatment() {
  return isProUser();
}

/* ==============================
   معلومات للواجهة (اختياري)
   ============================== */

function getLicenseType() {
  return isProUser() ? "PRO" : "FREE";
}
