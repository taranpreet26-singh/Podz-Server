"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor() {
        this.rooms = [];
        this.roomId = "";
    }
    addUserInRoom(ws, roomId) {
        try {
            const room = this.rooms.find(r => r.room === roomId);
            if (room && room.user.length < 2) {
                room.user.push(ws);
                if (room.user.length == 2) {
                }
            }
            else {
                if (roomId)
                    this.rooms.push({ room: roomId, user: [ws] });
                this.roomId = roomId;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    clearUserFromRoom(ws) {
        try {
            const room = this.rooms.find(r => r.room === this.roomId);
            console.log(this.roomId);
            if (room && this.roomId !== "") {
                room.user = room.user.filter(x => x.id !== ws.id);
                console.log(`${ws.id} disconnected from ${room.room}`);
                if (room.user.length <= 1) {
                    console.log(this.rooms);
                    this.rooms = this.rooms.filter(r => r.room !== this.roomId);
                    console.log('room is deleted');
                    console.log(this.rooms);
                }
            }
            else {
                console.log("Room is not present");
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    initRoomSignaling(ws, message) {
        try {
            const room = this.rooms.find(r => r.room === message.room);
            console.log(room);
            if (room && room.user.length == 2) {
                if (message.type === "offer") {
                    room === null || room === void 0 ? void 0 : room.user.forEach(client => {
                        if (client != ws) {
                            client.send(JSON.stringify(message));
                        }
                    });
                }
                else if (message.type === "answer") {
                    room === null || room === void 0 ? void 0 : room.user.forEach(client => {
                        if (client != ws) {
                            client.send(JSON.stringify(message));
                        }
                    });
                }
                else if (message.type === "candidate") {
                    room === null || room === void 0 ? void 0 : room.user.forEach(client => {
                        if (client != ws) {
                            client.send(JSON.stringify(message));
                        }
                    });
                }
            }
            else {
                ws.send(`only one user present in ${room === null || room === void 0 ? void 0 : room.room}`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.User = User;
