let isPro = false;
const FREE_LIMIT = 10;

function activatePro(code) {
  if (code && code.length >= 6) {
    isPro = true;
    alert("Pro Activated");
  }
}
