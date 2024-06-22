const textarea = document.querySelector(".chat-itput textarea");
const iconsSend = document.querySelector(".iconsend");
const sendMessage = document.querySelector("#send-btn");
const chatBox = document.querySelector(".chatbox");
const API_KEY = process.env.OPENAI_API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

document.addEventListener("DOMContentLoaded", () => {
  textarea.addEventListener("input", () => {
    if (textarea.value.trim()) {
      iconsSend.style.visibility = "visible";
    } else {
      iconsSend.style.visibility = "hidden";
    }
  });
  sendMessage.addEventListener("click", handleChat);
});

let userMessage;

function handleChat() {
  userMessage = textarea.value.trim();
  if (!userMessage) return;

  chatBox.appendChild(createChatLi(userMessage, "outgoing"));

  textarea.value = "";

  chatBox.scrollTo(0, chatBox.scrollHeight);
  setTimeout(() => {
    const incomingChatLi = createChatLi("Escribiendo..", "incoming");
    chatBox.appendChild(incomingChatLi);
    chatBox.scrollTo(0, chatBox.scrollHeight);
    generateResponse(incomingChatLi);
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
                  /></span><p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi;
}

async function generateResponse(incomingChatLi) {
  const messageElement = incomingChatLi.querySelector("p");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
      temperature: 0.7,
    }),
  };
  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    messageElement.textContent = data.choices[0].message.content;
  } catch (error) {
    messageElement.textContent = " Ops! A Ocurrido un Error";
  } finally {
    chatBox.scrollTo(0, chatBox.scrollHeight);
  }
}
