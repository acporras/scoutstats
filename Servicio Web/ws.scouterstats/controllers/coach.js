'use strict'

const db = require('../util/connection');
const config = require('../config');
const comun = require('../util/comun');
const constant = require('../util/constant');
const lang = require('../lang/es');
const service = require('../services/index');

function coachOperation(req, res){
	var params = new Array();
	const operation = req.body.command;
	switch(operation){
		case constant.RequestOperation.getcoach:
			GetCoach(req, res);
			break;
		case constant.RequestOperation.getcoachbyemail:
			GetCoachByEmail(req, res);
			break;
		case constant.RequestOperation.getcoachteam:
			GetCoachTeam(req, res);
			break;
		case constant.RequestOperation.getcoachteamseat:
			GetCoachTeamSeat(req, res);
			break;
		case constant.RequestOperation.getcoachnoteamSeat:
			GetCoachNoTeamSeat(req, res);
			break;
		case constant.RequestOperation.registercoach:
			RegisterCoach(req, res);
			break;
		case constant.RequestOperation.updatecoach:
			UpdateCoach(req, res);
			break;
		case constant.RequestOperation.deletecoach:
			DeleteCoach(req, res);
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

function GetCoach(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_entrenador(?)`;
	connection.query(sql, transaction.no_maiusr, (error, result, fields) =>{
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

function GetCoachByEmail(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_entrenador_by_email(?)`;
	connection.query(sql, transaction.no_maient, (error, result, fields) =>{
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

function GetCoachTeam(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_entrenador_equipo(?, ?)`;
	connection.query(sql, [transaction.no_maiusr, transaction.nid_entren], (error, result, fields) =>{
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

function GetCoachTeamSeat(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_equipo_entrenador(?, ?, ?)`;
	connection.query(sql, [transaction.no_maiusr, transaction.nid_stsede, transaction.nid_equipo], (error, result, fields) =>{
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
function GetCoachNoTeamSeat(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_entrenador_no_team(?, ?, ?)`;
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


function RegisterCoach(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spi_register_entrenador(?, ?, ?)`;
	connection.query(sql, [transaction.no_maiusr, transaction.no_maient, transaction.no_entren], 
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

function UpdateCoach(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spu_update_entrenador(?, ?)`;
	connection.query(sql, [transaction.nid_entren, transaction.no_entren], (error, result, fields) =>{
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

function DeleteCoach(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spd_delete_entrenador(?)`;
	connection.query(sql, transaction.nid_entren, (error, result, fields) =>{
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

module.exports = {
    coachOperation
}