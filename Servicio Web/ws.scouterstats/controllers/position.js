'use strict'

const db = require('../util/connection');
const config = require('../config');
const comun = require('../util/comun');
const constant = require('../util/constant');
const lang = require('../lang/es');
const service = require('../services/index');

function positionOperation(req, res){
	var params = new Array();
	const operation = req.body.command;
	switch(operation){
		case constant.RequestOperation.initializepositionclub:
			InitializePositionClub(req, res);
			break;
		case constant.RequestOperation.getposition:
			GetPosition(req, res);
			break;
		case constant.RequestOperation.getpositionclub:
			GetPositionClub(req, res);
			break;
		case constant.RequestOperation.getpositiontraining:
			GetPositionTraining(req, res);
			break;
		case constant.RequestOperation.updatepositionclub:
			UpdPositionClub(req, res);
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

function InitializePositionClub(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spi_initialize_position_club(?, ?)`;
	connection.query(sql, [transaction.no_maiusr, transaction.no_nomclu], 
		(error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}else{
			params[0] = lang.mstrSuccessfulregistration.code;
			params[1] = constant.ResponseCode.success;
			params[2] = lang.mstrSuccessfulregistration.message;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}
	});
}

function GetPosition(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_position()`;
	connection.query(sql, (error, result, fields) =>{
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

function GetPositionClub(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_posicion_accion(?)`;
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

function GetPositionTraining(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_posicion_formacion(?)`;
	connection.query(sql, transaction.co_formac, (error, result, fields) =>{
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

function  UpdPositionClub(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spu_set_posicion_accion(?, ?, ?, ?)`;
	var cantidad = 0;
	transaction.forEach((element) =>{
		connection.query(sql, [element.no_maiusr, element.co_posici, element.co_accion, element.fl_visibi], 
		(error, result, fields) =>{
			if(error){
				params[0] = lang.mstrErrorOperationDB.code;
				params[1] = constant.ResponseCode.error;
				params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			}else{
				params[0] = lang.mstrSuccessfulupdate.code;
				params[1] = constant.ResponseCode.success;
				params[2] = lang.mstrSuccessfulupdate.message;
			}
			cantidad++;
			if(cantidad == transaction.length){
				return res
			        .status(200)
			        .send(comun.ObjectResponse(params));
			}
		});
	});
}

module.exports = {
    positionOperation
}