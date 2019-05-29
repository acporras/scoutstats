'use strict'

const db = require('../util/connection');
const config = require('../config');
const comun = require('../util/comun');
const constant = require('../util/constant');
const lang = require('../lang/es');
const service = require('../services/index');

function actionOperation(req, res){
	var params = new Array();
	const operation = req.body.command;
	switch(operation){
		case constant.RequestOperation.getaction:
			GetAction(req, res);
			break;
		case constant.RequestOperation.getactiongroup:
			GetActionGroup(req, res);
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

function GetAction(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_action()`;
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

function GetActionGroup(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_action_group(?, ?, ?, ?)`;
	connection.query(sql, [transaction.no_maiusr, transaction.co_gruapp, transaction.nid_posici, transaction.fl_visibl],
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

module.exports = {
    actionOperation
}