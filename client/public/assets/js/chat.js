// Establish socket connection only once per session
if (!sessionStorage.getItem("socketConnected")) {
    sessionStorage.setItem("socketConnected", "true");
    const socket = io();
    window.socket = socket;

    socket.on("message", (msg) => {
        const messages = document.getElementById("messages");
        const messageElement = document.createElement("p");
        messageElement.textContent = msg;
        messages.appendChild(messageElement);
    });
} else {
    const socket = window.socket;
}

document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("sendButton");

    if (sendButton) {
        sendButton.addEventListener("click", sendMessage);
    } else {
        console.error("Send button not found");
    }

    function sendMessage() {
        const input = document.getElementById("messageInput");
        const message = input.value;
        if (message) {
            window.socket.emit("client", message);
            input.value = "";
        }
    }
});