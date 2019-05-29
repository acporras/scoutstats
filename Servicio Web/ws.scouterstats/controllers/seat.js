'use strict'

const db = require('../util/connection');
const config = require('../config');
const comun = require('../util/comun');
const constant = require('../util/constant');
const lang = require('../lang/es');
const service = require('../services/index');

function seatOperation(req, res){
	var params = new Array();
	const operation = req.body.command;
	switch(operation){
		case constant.RequestOperation.getseat:
			GetSeat(req, res);
			break;
		case constant.RequestOperation.getseatmanager:
			GetSeatManager(req, res);
			break;
		case constant.RequestOperation.getseatcoach:
			GetSeatCoach(req, res);
			break;
		case constant.RequestOperation.registerseat:
			RegisterSeat(req, res);
			break;
		case constant.RequestOperation.updateseat:
			UpdateSeat(req, res);
			break;
		case constant.RequestOperation.deleteseat:
			DeleteSeat(req, res);
			break;
		case constant.RequestOperation.registerseatincharge:
			RegisterSeatIncharge(req, res);
			break;
		case constant.RequestOperation.deleteseatincharge:
			DeleteSeatIncharge(req, res);
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

function GetSeat(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_sede(?)`;
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
			params[3] = result[0]
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}
	});
}

function GetSeatManager(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_sede_encargado(?, ?)`;
	connection.query(sql, [transaction.no_maiusr, transaction.nid_encarg], (error, result, fields) =>{
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
			params[3] = result[0]
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}
	});
}

function GetSeatCoach(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_sede_entrenador(?, ?)`;
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
			params[3] = result[0]
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}
	});
}

function RegisterSeat(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spi_register_sede(?, ?, ?)`;
	connection.query(sql, [transaction.no_stsede, transaction.no_ubicac, transaction.no_maiusr], 
		(error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}else{
			sql = `SELECT MAX(nid_stsede) as nid_stsede from tbl_sede`;
			connection.query(sql, (error, result, fields) =>{
				if(error){
					params[0] = lang.mstrErrorOperationDB.code;
					params[1] = constant.ResponseCode.error;
					params[2] = lang.mstrErrorOperationDB.message + ":" + error;
				}else{
					params[0] = lang.mstrSuccessfulRequest.code;
					params[1] = constant.ResponseCode.success;
					params[2] = lang.mstrSuccessfulRequest.message;
					params[3] = result[0];
				}
				return res
				.status(200)
				.send(comun.ObjectResponse(params));
			});
		}
	});
}

function UpdateSeat(req, res){	
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spu_set_sede(?, ?, ?)`;
	connection.query(sql, [transaction.nid_stsede, transaction.no_stsede, transaction.no_ubicac], 
		(error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}else{
			params[0] = lang.mstrSuccessfulupdate.code;
			params[1] = constant.ResponseCode.success;
			params[2] = lang.mstrSuccessfulupdate.message;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}
	});
}

function DeleteSeat(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spd_delete_sede(?)`;
	connection.query(sql, transaction.nid_stsede, 
		(error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}else{
			params[0] = lang.mstrSuccessfuldelete.code;
			params[1] = constant.ResponseCode.success;
			params[2] = lang.mstrSuccessfuldelete.message;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}
	});
}

function RegisterSeatIncharge(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spi_register_sede_encargado(?, ?, ?)`;
	connection.query(sql, [transaction.nid_stsede, transaction.nid_encarg, transaction.no_maiusr], 
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

function DeleteSeatIncharge(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spd_delete_sede_encargado(?)`;
	connection.query(sql, transaction.nid_stsede, (error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}else{
			params[0] = lang.mstrSuccessfuldelete.code;
			params[1] = constant.ResponseCode.success;
			params[2] = lang.mstrSuccessfuldelete.message;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}
	});
}

module.exports = {
    seatOperation
}