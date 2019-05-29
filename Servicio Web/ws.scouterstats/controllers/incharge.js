'use strict'

const db = require('../util/connection');
const config = require('../config');
const comun = require('../util/comun');
const constant = require('../util/constant');
const lang = require('../lang/es');
const service = require('../services/index');

function inchargeOperation(req, res){
	var params = new Array();
	const operation = req.body.command;
	switch(operation){
		case constant.RequestOperation.getincharge:
			GetIncharge(req, res);
			break;
		case constant.RequestOperation.getinchargebyemail:
			GetInchargeByEmail(req, res);
			break;
		case constant.RequestOperation.getinchargeflseat:
			GetInchargeFlSeat(req, res);
			break;
		case constant.RequestOperation.getinchargeassigned:
			GetInchargeAssigned(req, res);
			break;
		case constant.RequestOperation.registerincharge:
			RegisterIncharge(req, res);
			break;
		case constant.RequestOperation.updateincharge:
			UpdateIncharge(req, res);
			break;
		case constant.RequestOperation.deleteincharge:
			DeleteIncharge(req, res);
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

function GetIncharge(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_encargado(?)`;
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

function GetInchargeByEmail(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_encargado_by_email(?)`;
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

function GetInchargeFlSeat(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_encargado_fl_sede(?, ?)`;
	connection.query(sql, [transaction.nid_stsede, transaction.fl_stsede], (error, result, fields) =>{
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

function GetInchargeAssigned(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_encargado_asignado(?)`;
	connection.query(sql, transaction.nid_encarg, (error, result, fields) =>{
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

function RegisterIncharge(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spi_register_encargado(?, ?, ?, ?)`;
	connection.query(sql, [transaction.no_encarg, transaction.no_telenc, transaction.no_maienc, transaction.no_maiusr], 
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

function UpdateIncharge(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spu_set_encargado(?, ?, ?)`;
	connection.query(sql, [transaction.nid_encarg, transaction.no_encarg, transaction.no_telenc], 
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

function DeleteIncharge(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spd_delete_encargado(?)`;
	connection.query(sql, transaction.nid_encarg, (error, result, fields) =>{
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
    inchargeOperation
}