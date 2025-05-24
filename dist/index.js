"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const uuid_1 = require("uuid");
const UserManager_1 = require("./manager/UserManager");
const app = (0, express_1.default)();
const PORT = 8888;
const server = http_1.default.createServer();
const wss = new ws_1.WebSocketServer({ server });
const userManager = new UserManager_1.User();
wss.on('connection', function connection(ws) {
    ws.id = (0, uuid_1.v4)();
    ws.on('error', (error) => {
        console.log(error);
    });
    ws.on('message', (data) => {
        const message = JSON.parse(data);
        if (message.type === "join") {
            userManager.addUserInRoom(ws, message.room);
        }
        else if (message.type === "offer") {
            console.log("offer");
            userManager.initRoomSignaling(ws, message);
        }
        else if (message.type === "answer") {
            console.log("answer");
            userManager.initRoomSignaling(ws, message);
        }
        else if (message.type === "candidate") {
            console.log("candidate");
            userManager.initRoomSignaling(ws, message);
        }
    });
    ws.on('close', () => {
        console.log(`${ws.id} user is disconnected`);
        userManager.clearUserFromRoom(ws);
    });
});
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
