const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();

// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// ruta publica
app.use(express.static(path.resolve('public')));

server.listen(process.env.PORT, (err) => {
  if(err) throw new Error(err);
  console.log('Server corriendo en el puerto', process.env.PORT);
});