import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import { WebSocketServer, WebSocket } from 'ws';

import reviews from './api/index.js';

const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, './client')));
app.use(bodyParser.json());
app.use("/", reviews);

function onSocketPreError(e) {
    console.log(e);
}

function onSocketPostError(e) {
    console.log(e);
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './client/index.html'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

mongoose.connect("mongodb://localhost:27017/reviews", {});
const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (req, socket, head) => {
    socket.on('error', onSocketPreError);

    wss.handleUpgrade(req, socket, head, (ws) => {
        socket.removeListener('error', onSocketPreError);
        wss.emit('connection', ws, req);
    });
});

wss.on('connection', (ws, req) => {
    ws.on('error', onSocketPostError);

    ws.on('message', (msg, isBinary) => {
        console.log('Received create message');
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg, { binary: isBinary });
            }
        });
    });

    ws.on('close', () => {
        console.log('Connection closed');
    });
});
