const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');
const timerRoutes = require('./routes/timerRoutes');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(cors());


wss.on('connection', (ws) => {
    console.log('New timer client connected!');

    // Handle messages sent from the client
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });

    // Handle WebSocket closing
    ws.on('close', () => {
        console.log('Client disconnected!');
    });
});

// Pass wss as middleware to routes
app.use('/', (req, res, next) => {
    req.wss = wss;
    next();
}, timerRoutes);

server.listen(3001, () => {
    console.log('Server started on http://localhost:3001/');
});