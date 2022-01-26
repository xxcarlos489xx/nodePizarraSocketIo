// require('dotenv').config();
const { PORTSOCKET }  = require('dotenv').config().parsed;
const express = require('express');
const app = express();
const socket = require('socket.io');

const server = app.listen(PORTSOCKET,()=>{
    console.log(`Servidor iniciado en el puerto ${PORTSOCKET}`);
});

const io = socket(server,{
    cors: {
        origin: "http://localhost:4200",
        methods: ["*"],
        secure: false
    }
})

io.on('connection',(socket)=>{
    console.log('device connected');
    const idHandShake = socket.id;
    const {nameRoom} = socket.handshake.query;
    socket.join(nameRoom);
    // console.log(socket.rooms);// ver id - name Room
    console.log(`Hola dispositivo ${idHandShake}, estas en la sala ${nameRoom}`);
    socket.on('event',(res)=>{
        socket.to(nameRoom).emit('transmitiendo',res);
    })
})