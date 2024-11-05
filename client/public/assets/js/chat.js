if (!window.socket) {
    const socket = io();
    window.socket = socket;

    socket.on("message", (msg) => {
        const messages = document.getElementById("messages");
        const messageElement = document.createElement("p");
        messageElement.textContent = msg;
        messages.appendChild(messageElement);
    });

    socket.on("connect", () => {
        console.log("Socket connected with ID:", socket.id);
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected");
    });
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
        if (message && window.socket) {
            window.socket.emit("client", message);
            input.value = "";
        } else {
            console.error("Socket connection not available.");
        }
    }
});