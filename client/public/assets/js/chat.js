document.getElementById("sendButton").addEventListener("click", sendMessage);

const socket = io(); // Connect to the Socket.IO server

// Display incoming messages
socket.on("message", (msg) => {
    const messages = document.getElementById("messages");
    const messageElement = document.createElement("p");
    messageElement.textContent = msg;
    messages.appendChild(messageElement);
});

// Send message to the server
function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = input.value;
    if (message) {
        socket.emit("client", message);
        input.value = ""; // Clear the input
    }
}