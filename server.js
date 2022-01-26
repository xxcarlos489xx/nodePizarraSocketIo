require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io');

const io = socket(server,{
  cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"],
      credentials: false
    }
})

io.on('connection',(socket) => {
    const idHandShake = socket.id;
    const {nameRoom} = socket.handshake.query;
    socket.join(nameRoom);
    console.log(`Hola dispositivo ${idHandShake}, estas en la sala ${nameRoom}`);
})

io.engine.on("connection_error", (err) => {
     console.log(err.req);      // the request object
     console.log(err.code);     // the error code, for example 1
     console.log(err.message);  // the error message, for example "Session ID unknown"
     console.log(err.context);  // some additional error context
});


app.get('/', (req, res)=>{
  console.log("Cliente conectado");
  res.write('Hola cliente, esto solo es un websocket!')
  res.end();
});

server.listen(process.env.PORTSOCKET || 3000,()=>{
  console.log('Servidor iniciado --->',process.env.PORTSOCKET);
})