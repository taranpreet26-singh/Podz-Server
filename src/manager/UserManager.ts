import { webSocket } from ".."

type Rooms = {
    room: string,
    user: webSocket[]
}


export class User {
    private rooms: Rooms[]
    private roomId: string
    constructor() {
        this.rooms = []
        this.roomId = ""
    }

    addUserInRoom(ws: webSocket, roomId: string) {
        try {
            const room = this.rooms.find(r => r.room === roomId)
            if (room && room.user.length < 2) {
                room.user.push(ws)
                if (room.user.length == 2) {
    
                }
            } else {
                if (roomId)
                    this.rooms.push({ room: roomId, user: [ws] })
                this.roomId = roomId
            }
        } catch (error) {
            console.log(error)
        }
    }

    clearUserFromRoom(ws: webSocket) {
       try {
         const room = this.rooms.find(r => r.room === this.roomId)
         console.log(this.roomId)
         if (room && this.roomId !== "") {
             room.user = room.user.filter(x => x.id !== ws.id)
             console.log(`${ws.id} disconnected from ${room.room}`)
             if(room.user.length <= 1){
                console.log(this.rooms)
                this.rooms = this.rooms.filter(r=>r.room !== this.roomId)
                console.log('room is deleted')
                console.log(this.rooms)
             }
         } else {
             console.log("Room is not present")
         }
       } catch (error) {
        console.log(error)
       }
    }

    initRoomSignaling(ws: webSocket, message: any) {
        try {
            const room = this.rooms.find(r => r.room === message.room)
        console.log(room)
        if (room && room.user.length == 2) {
            if (message.type === "offer") {
                room?.user.forEach(client => {
                    if (client != ws) {
                        client.send(JSON.stringify(message))
                    }
                })
            } else if (message.type === "answer") {
                room?.user.forEach(client => {
                    if (client != ws) {
                        client.send(JSON.stringify(message))
                    }
                })
            } else if (message.type === "candidate") {
                room?.user.forEach(client => {
                    if (client != ws) {
                        client.send(JSON.stringify(message))
                    }
                })
            }
        }else{
            ws.send(`only one user present in ${room?.room}`)
        }
        } catch (error) {
            console.log(error)            
        }
    }
} 