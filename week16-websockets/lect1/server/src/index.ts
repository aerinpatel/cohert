import {WebSocketServer,WebSocket } from 'ws';
interface JoinRequest {
    id:number;
    msg:string;
}
// const clients = new Map<string,Array<WebSocket>>();
interface Users{
    socket:WebSocket,
    room:string,
}

// let connectedUser:number = 0;
let allSockets:Users[] = [];

const wss = new WebSocketServer({port:8080});
wss.on('connection',function connection(ws){
    ws.on('message',(msg:string) => {
        const parsedMsg = JSON.parse(msg);
        
        if(parsedMsg.type === 'join') {allSockets.push({socket:ws,room:parsedMsg.payload.roomId});console.log("the user was added",allSockets)}
        if(parsedMsg.type === 'chat') allSockets.map((e) => {e.room === parsedMsg.payload.roomId ? e.socket.send(parsedMsg.payload.msg):null});
    })
});
wss.on('close',(ws : WebSocket) => {
    allSockets.filter((e) => {e.socket != ws});
})