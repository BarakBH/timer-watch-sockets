let timer = 60;
let timerInterval;
const WebSocket = require('ws');

const startTimer = (req, res) => {
    // console.log("Start Timer Endpoint Called"); 
    const wss = req.wss;
    clearInterval(timerInterval); // Clear any existing timer
    timer = 60; // Reset timer to initial value

    timerInterval = setInterval(() => {
        // Broadcast timer value to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(String(timer));
            }
        });

        // Decrement timer or clear interval if it reaches zero
        if (timer === 0) {
            clearInterval(timerInterval);
        } else {
            timer--;
        }
    }, 1000);

    res.json({ message: 'Timer started' });
};

const resetTimer = (req, res) => {
    // console.log("Reset Timer Endpoint Called");
    const wss = req.wss;
    clearInterval(timerInterval); // Clear any existing timer
    timer = 60; // Reset timer to initial value

    // Broadcast reset timer value to all connected clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(String(timer));
        }
    });

    res.json({ message: 'Timer reset' });
};

module.exports = { startTimer, resetTimer };