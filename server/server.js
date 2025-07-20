require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const DfConn = require('./DfCxConn')
const ResponseProcesor= require('./ResponseProcesor')

const app = express();
const HttpServer = http.createServer(app); // Crea HTTP server
const ResP=new ResponseProcesor();         
const io = new Server(HttpServer, {        // Configura el servidor de socket, ademas de configurar CORS
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

//Conexion del socket
io.on("connection", (socket) => {
    socket.on("mensaje", (msg) => { // Escucha el mensaje del cliente
        const dfConn = new DfConn(socket.id); //crea sesion de Dialogflow
        dfConn.askDf(msg).then(result => {
            ResP.responsePro(result,msg).then(respuesta => { //procesa la respuesta para luego enviarla
                socket.emit("respuesta", respuesta);
            })
        });


    })
})

HttpServer.listen(3002, () => {
    console.log("El servidor esta activo en el 3002")
});