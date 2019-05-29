const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection(config.db);

function connect(){
	const conn = new Promise((resolve, reject) =>{
		try{
			connection.connect((err) =>{
				if(err){
					reject(err);
				}
				resolve();
			});
		}catch(ex){
			reject(ex);
		}
	});
	return conn;
};

function mysqlconnection(){
	return connection;
};

function disconnect(){
	connection.end();
};

module.exports = {
	connect,
	mysqlconnection,
	disconnect,
}