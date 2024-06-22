const textarea = document.querySelector(".chat-itput textarea");
const iconsSedn = document.querySelector(".iconsend");

textarea.addEventListener("input", () => {
  if (textarea.value.trim()) {
    iconsSedn.style.visibility = "visible";
  } else {
    iconsSedn.style.visibility = "hidden";
  }
});
