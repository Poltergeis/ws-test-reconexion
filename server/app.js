import express from "express";
import cors from "cors";
import signale from "signale";
import { WebSocketServer } from "ws";
import http from "http";

const corsOptions = {
    origin: '*'
}

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

let id = 0;

wss.on('connection', (ws) => {

    ws.onopen = function () {    
        ws.id = id;
        id++;
        console.log(`nuevo usuario de websockets: ${ws.id}`);
    }

    ws.on('close', () => {
        console.log(`el cliente: ${ws.id} ha cerrado sesion`)
    });

    ws.onmessage = (event) => {
        console.log(JSON.parse(event.data));
        let index = 1;
        wss.clients.forEach((client) => {
            console.log(index + " clientes");
            index++;
        });
    }
});

const PORT = 9000;

server.listen(PORT, () => {
    signale.success(`servidor escuchando en el puerto: ${PORT}`);
});