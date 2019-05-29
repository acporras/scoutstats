'use strict'

const request = require('request');

const db = require('../util/connection');
const config = require('../config');
const comun = require('../util/comun');
const constant = require('../util/constant');
const lang = require('../lang/es');
const service = require('../services/index');

function matchOperation(req, res){
	var params = new Array();
	const operation = req.body.command;
	switch(operation){
		case constant.RequestOperation.getmatchplayer:
			GetMatchPlayer(req, res);
			break;
		case constant.RequestOperation.getmatchcoach:
			GetMatchCoach(req, res);
			break;
		case constant.RequestOperation.getmatchteam:
			GetMatchTeam(req, res);
			break;
		case constant.RequestOperation.getmatchescoach:
			GetMatchesCoach(req, res);
			break;
		case constant.RequestOperation.getpreviewresult:
			GetPreviewResult(req, res);
			break;
		case constant.RequestOperation.registermatch:
			RegisterMatch(req, res);
			break;
		case constant.RequestOperation.updateresultmatch:
			UpdateResultMatch(req, res);
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

function GetMatchPlayer(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_match_player(?, ?, ?, ?)`;
	connection.query(sql, [transaction.no_maiusr, transaction.nid_stsede, transaction.nid_equipo, transaction.nid_jugado], 
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

function GetMatchTeam(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_match_team(?, ?, ?)`;
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

function GetMatchCoach(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_match_coach(?, ?, ?, ?)`;
	connection.query(sql, [transaction.no_maiusr, transaction.nid_stsede, transaction.nid_equipo, transaction.nid_entren], 
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

function GetMatchesCoach(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_matches_coach(?, ?)`;
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

function RegisterMatch(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_login_user(?)`;
	connection.query(sql, transaction.no_maiusr, (error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		} else {
			if(result[0].length == 0){
				params[0] = lang.mstrNotFoundUser.code;
				params[1] = constant.ResponseCode.error;
				params[2] = lang.mstrNotFoundUser.message;
				return res
			        .status(200)
			        .send(comun.ObjectResponse(params));
			} else {
				// se consulta el id del plan del cliente
				sql = `CALL sps_get_suscriptions(?)`
				connection.query(sql, result[0][0].nid_culqid, (error_subs, result_subs, fields_subs) =>{
					if (error_subs) {
						params[0] = lang.mstrErrorOperationDB.code;
						params[1] = constant.ResponseCode.error;
						params[2] = lang.mstrErrorOperationDB.message + ":" + error_subs;
						return res
							.status(200)
							.send(comun.ObjectResponse(params));
					} else {
						if(result_subs[0].length > 0){
							let headers = {
								'Authorization': `Bearer ${config.culqi_apisecret}`
							}
							let options_sub = {
								url: `${config.culqiuri}/subscriptions/${result_subs[0][0].nid_suscri}`,
								method: 'GET',
								jar: true,
								headers: headers
							}

							// Se consulta la suscripción obtenida verificando si  se encuentra activa
							request(options_sub, function (err_sub, response_sub, body_sub) {
								if (!err_sub) {
									let data_sub = JSON.parse(body_sub);
									if (data_sub.status == "Activa") {
										sql = `CALL spi_register_match(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
										connection.query(sql, [transaction.nid_equipo, transaction.nid_stsede, transaction.no_maiusr
											, comun.ShortDate(transaction.fe_fecpar), transaction.no_equcon, transaction.qt_golmar, transaction.qt_golrec
											, transaction.fl_result, transaction.fl_parter], 
											(error_team, result_team, fields_team) =>{
											if(error_team){
												params[0] = lang.mstrErrorOperationDB.code;
												params[1] = constant.ResponseCode.error;
												params[2] = lang.mstrErrorOperationDB.message + ":" + error_team;
												return res
													.status(200)
													.send(comun.ObjectResponse(params));
											}else{
												params[0] = lang.mstrSuccessfulRequest.code;
												params[1] = constant.ResponseCode.success;
												params[2] = lang.mstrSuccessfulRequest.message;
												return res
													.status(200)
													.send(comun.ObjectResponse(params));
											}
										});
									} else {
										params[0] = lang.mstrInactiveSubscription.code;
										params[1] = constant.ResponseCode.error;
										params[2] = lang.mstrInactiveSubscription.message.replace('[STATUS]', data_sub.status);
										return res
											.status(200)
											.send(comun.ObjectResponse(params));
									}
								} else {
									params[0] = lang.mstrErrorOperationDB.code;
									params[1] = constant.ResponseCode.error;
									params[2] = err_sub;
									return res
										.status(200)
										.send(comun.ObjectResponse(params));
								}
							});
						} else {
							params[0] = lang.mstrNotFoundPlan.code;
							params[1] = constant.ResponseCode.error;
							params[2] = lang.mstrNotFoundPlan.message;
							return res
								.status(200)
								.send(comun.ObjectResponse(params));
						}
					}
				});
			}
		}
	});
}

function GetPreviewResult(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_preview_resultado_partido(?, ?, ?, ?)`;
	connection.query(sql, [transaction.nid_partid, transaction.nid_equipo, transaction.nid_stsede, 
		transaction.no_maiusr], 
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

function UpdateResultMatch(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spu_update_resultado_partido(?, ?, ?, ?, ?, ?, ?)`;
	connection.query(sql, [transaction.nid_partid, transaction.nid_equipo, transaction.nid_stsede, 
		transaction.no_maiusr, transaction.qt_golmar, transaction.qt_golrec, transaction.fl_result], 
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
		return res
	        .status(200)
	        .send(comun.ObjectResponse(params));
	});
}

module.exports = {
    matchOperation
}