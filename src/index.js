import app from './app';
import {Server as WebsocketServer}from 'socket.io'
//Lo requiere express para pasar un servidor a websocket
import http from 'http';
//Importamos la base de datos:
import { connectDB } from './db';

import { PORT } from './config';

import sockets from './sockets';

connectDB();

//Convertimos el servidor app a uno que express acepte:
const server = http.createServer(app);

//Levantamos el servidor en el puerto 3000:
const httpServer = server.listen(PORT);

console.log('Server is running on port ', PORT);

//Conexion con los clientes:
const io = new WebsocketServer(httpServer);
sockets(io);

