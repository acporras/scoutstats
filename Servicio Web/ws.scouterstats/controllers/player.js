'use strict'

const db = require('../util/connection');
const config = require('../config');
const comun = require('../util/comun');
const constant = require('../util/constant');
const lang = require('../lang/es');
const service = require('../services/index');

function playerOperation(req, res){
	var params = new Array();
	const operation = req.body.command;
	switch(operation){
		case constant.RequestOperation.getplayer:
			GetPlayer(req, res);
			break;
		case constant.RequestOperation.getplayerbyemail:
			GetPlayerByEmail(req, res);
			break;
		case constant.RequestOperation.getplayeraction:
			GetPlayerAction(req, res);
			break;
		case constant.RequestOperation.getplayermatch:
			GetPlayerMatch(req, res);
			break;
		case constant.RequestOperation.getplayerteam:
			GetPlayerTeam(req, res);
			break;
		case constant.RequestOperation.getplayerheadline:
			GetPlayerHeadLine(req, res);
			break;
		case constant.RequestOperation.registerplayer:
			RegisterPlayer(req, res);
			break;
		case constant.RequestOperation.updateplayer:
			UpdatePlayer(req, res);
			break;
		case constant.RequestOperation.updateplayerheadline:
			UpdatePlayerHeadline(req, res);
			break;
		case constant.RequestOperation.updateparticipationplayers:
			UpdateParticipationPlayers(req, res);
			break;
		case constant.RequestOperation.updateactionplayer:
			UpdateActionPlayer(req, res);
			break;
		case constant.RequestOperation.deleteplayer:
			DeletePlayer(req, res);
			break;
		default :
			params[0] = lang.mstrNotFoundOperation.code;
            params[1] = constant.ResponseCode.error;
            params[2] = lang.mstrNotFoundOperation.message + ":" + operation;
            return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
            break;
	}
}

function GetPlayer(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_jugador(?, ?, ?)`;
	connection.query(sql, [transaction.no_maiusr, transaction.nid_stsede, transaction.nid_equipo], 
		(error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}else{
			params[0] = lang.mstrSuccessfulRequest.code;
			params[1] = constant.ResponseCode.success;
			params[2] = lang.mstrSuccessfulRequest.message;
			params[3] = result[0];
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}
	});
}

function GetPlayerHeadLine(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_player_titula(?, ?, ?, ?)`;
	connection.query(sql, [transaction.no_maijug, transaction.nid_equipo, transaction.nid_stsede, transaction.fl_titula], 
		(error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}else{
			params[0] = lang.mstrSuccessfulRequest.code;
			params[1] = constant.ResponseCode.success;
			params[2] = lang.mstrSuccessfulRequest.message;
			params[3] = result[0];
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}
	});
}

function GetPlayerByEmail(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_jugador_by_email(?)`;
	connection.query(sql, transaction.no_maijug, (error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}else{
			params[0] = lang.mstrSuccessfulRequest.code;
			params[1] = constant.ResponseCode.success;
			params[2] = lang.mstrSuccessfulRequest.message;
			params[3] = result[0];
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}
	});
}

function GetPlayerAction(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_jugador_accion(?, ?, ?, ?, ?)`;
	connection.query(sql, [transaction.no_maiusr, transaction.nid_stsede, transaction.nid_equipo, transaction.nid_partid, transaction.nid_jugado], 
		(error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}else{
			params[0] = lang.mstrSuccessfulRequest.code;
			params[1] = constant.ResponseCode.success;
			params[2] = lang.mstrSuccessfulRequest.message;
			params[3] = result[0];
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}
	});
}

function GetPlayerMatch(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_jugadores_partido(?, ?, ?, ?)`;
	connection.query(sql, [transaction.no_maiusr, transaction.nid_partid, transaction.nid_equipo, transaction.nid_stsede], 
		(error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}else{
			params[0] = lang.mstrSuccessfulRequest.code;
			params[1] = constant.ResponseCode.success;
			params[2] = lang.mstrSuccessfulRequest.message;
			params[3] = result[0];
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}
	});
}

function GetPlayerTeam(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_player_team(?)`;
	connection.query(sql, transaction.nid_equipo, (error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
		}else{
			params[0] = lang.mstrSuccessfulregistration.code;
			params[1] = constant.ResponseCode.success;
			params[2] = lang.mstrSuccessfulregistration.message;
			params[3] = result[0];
		}
		return res
	        .status(200)
	        .send(comun.ObjectResponse(params));
	});
}

function RegisterPlayer(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spi_register_player(?, ?, ?, ?, ?, ?, ?)`;
	connection.query(sql, [transaction.nid_equipo, transaction.nid_stsede, transaction.no_maiusr, 
		transaction.no_maijug, transaction.no_jugado, transaction.nid_posici, transaction.fl_titula], 
		(error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
		}else{
			params[0] = lang.mstrSuccessfulregistration.code;
			params[1] = constant.ResponseCode.success;
			params[2] = lang.mstrSuccessfulregistration.message;
		}
		return res
	        .status(200)
	        .send(comun.ObjectResponse(params));
	});
}

function UpdatePlayer(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spu_update_player(?, ?, ?)`;
	connection.query(sql, [transaction.nid_jugado, transaction.no_jugado, transaction.nid_posici], (error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
		}else{
			params[0] = lang.mstrSuccessfulupdate.code;
			params[1] = constant.ResponseCode.success;
			params[2] = lang.mstrSuccessfulupdate.message;
		}
		return res
	        .status(200)
	        .send(comun.ObjectResponse(params));
	});
}

function UpdatePlayerHeadline(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spu_update_player_titularidad(?, ?)`;
	connection.query(sql, [transaction.nid_jugado, transaction.fl_titula], (error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
		}else{
			params[0] = lang.mstrSuccessfulupdate.code;
			params[1] = constant.ResponseCode.success;
			params[2] = lang.mstrSuccessfulupdate.message;
		}
		return res
	        .status(200)
	        .send(comun.ObjectResponse(params));
	});
}

function UpdateActionPlayer(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spu_update_action_player(?, ?, ?, ?, ?, ?)`;
	connection.query(sql, [transaction.nid_partid, transaction.nid_equipo, transaction.nid_stsede, 
		transaction.no_maiusr, transaction.nid_jugado, transaction.nid_accion], 
		(error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
		}else{
			params[0] = lang.mstrSuccessfulupdate.code;
			params[1] = constant.ResponseCode.success;
			params[2] = lang.mstrSuccessfulupdate.message;
			params[3] = result[0];
			console.log(result);
		}
		return res
	        .status(200)
	        .send(comun.ObjectResponse(params));
	});
}

function DeletePlayer(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spd_delete_player(?)`;
	connection.query(sql, transaction.nid_jugado, (error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
		}else{
			params[0] = lang.mstrSuccessfuldelete.code;
			params[1] = constant.ResponseCode.success;
			params[2] = lang.mstrSuccessfuldelete.message;
		}
		return res
	        .status(200)
	        .send(comun.ObjectResponse(params));
	});
}

function UpdateParticipationPlayers(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spu_partido_jugador(?, ?, ?)`;
	connection.query(sql, [transaction.no_maiusr, transaction.nid_stsede, transaction.nid_equipo], (error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
		}else{
			params[0] = lang.mstrSuccessfulupdate.code;
			params[1] = constant.ResponseCode.success;
			params[2] = lang.mstrSuccessfulupdate.message;
		}
		return res
	        .status(200)
	        .send(comun.ObjectResponse(params));
	});
}

module.exports = {
    playerOperation
}