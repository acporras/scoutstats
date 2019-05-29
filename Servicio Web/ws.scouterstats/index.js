'use strict'

const connection = require('./util/connection')
const mysql = require('mysql');
const app = require('./app');
const config = require('./config');
const socketIO = require('socket.io')

connection.connect()
	.then(response =>{
		console.log('Conexión a la base de datos establecida...');
		let server = app.listen(config.port, () => {
			console.log(`Servidor corriendo en http://${config.host}:${config.port}`)
		});
		const io = socketIO(server);
		const sockets = require('./sockets')(io);
	})
	.catch(response =>{
      return console.log(`Error al conectar a la base de datos: ${response}`);
    })