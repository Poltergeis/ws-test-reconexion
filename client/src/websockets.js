export default function connectToWSS(callback) {
    const newWs = new WebSocket('ws://localhost:9000');
    callback(newWs);
}