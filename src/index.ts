import express from "express";
import http  from "http"
import {WebSocket, WebSocketServer} from "ws"
import {v4 as uuid} from "uuid"
import { User } from "./manager/UserManager";

const app = express()
const PORT = 8888
const server = http.createServer()

const wss = new WebSocketServer({server})

export interface webSocket extends WebSocket{
    id:string
}


const userManager = new User() 
wss.on('connection',function connection(ws:webSocket){
    ws.id = uuid()
    ws.on('error',(error)=>{
        console.log(error)
    })

    ws.on('message',(data:any)=>{
        const message = JSON.parse(data)  
        if(message.type === "join"){
            userManager.addUserInRoom(ws,message.room)
        }else if(message.type === "offer"){
            console.log("offer")
            userManager.initRoomSignaling(ws,message)
        }else if(message.type === "answer"){
            console.log("answer")
            userManager.initRoomSignaling(ws,message)
        }else if(message.type === "candidate"){
            console.log("candidate")
            userManager.initRoomSignaling(ws,message)
        }
    })


    ws.on('close',()=>{
        console.log(`${ws.id} user is disconnected`)
        userManager.clearUserFromRoom(ws)
    })
})


server.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})

