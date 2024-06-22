const textarea = document.querySelector(".chat-itput textarea");
const iconsSedn = document.querySelector(".iconsend");
const sendMessage = document.querySelector("#send-btn");
const chatBox = document.querySelector(".chatbox");

document.addEventListener("DOMContentLoaded", () => {
  textarea.addEventListener("input", () => {
    if (textarea.value.trim()) {
      iconsSedn.style.visibility = "visible";
    } else {
      iconsSedn.style.visibility = "hidden";
    }
  });
});

sendMessage.addEventListener("click", handleChat);

let userMessage;

function handleChat() {
  userMessage = textarea.value.trim();
  if (!userMessage) return;
  chatBox.appendChild(createChatLi(userMessage, "outgoing"));

  setTimeout(() => {
    chatBox.appendChild(createChatLi("Escribiendo...", "incoming"));
  }, 500);
}

function createChatLi(message, className) {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p>${message}</p>`
      : `<span class="icon">
            <img
              src="./elvis_presley_avatar_icon_263218.png"
              alt="imagen"
          /></span> <p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi;
}
