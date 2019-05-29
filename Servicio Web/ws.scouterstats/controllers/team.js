'use strict'

const request = require('request');

const db = require('../util/connection');
const config = require('../config');
const comun = require('../util/comun');
const constant = require('../util/constant');
const lang = require('../lang/es');
const service = require('../services/index');

function teamOperation(req, res){
	var params = new Array();
	const operation = req.body.command;
	switch(operation){
		case constant.RequestOperation.getteam:
			GetTeam(req, res);
			break;
		case constant.RequestOperation.getteambysede:
			GetTeamBySede(req, res);
			break;
		case constant.RequestOperation.getteamseatcoach:
			GetTeamSeatCoach(req, res);
			break;
		case constant.RequestOperation.registerteam:
			RegisterTeam(req, res);
			break;
		case constant.RequestOperation.updateteam:
			UpdateTeam(req, res);
			break;
		case constant.RequestOperation.updatepaymentteam:
			UpdatePaymentTeam(req, res);
			break;
		case constant.RequestOperation.deleteteam:
			DeleteTeam(req, res);
			break;
		case constant.RequestOperation.deleteteamcoach:
			DeleteTeamCoach(req, res);
			break;
		case constant.RequestOperation.registerteamcoach:
			RegisterTeamCoach(req, res);
			break;
		case constant.RequestOperation.getteambyclub:
			GetTeamByClub(req, res);
			break;
		case constant.RequestOperation.getteambymanager:
			GetTeamByManager(req, res);
			break;
		case constant.RequestOperation.getteambycoach:
			GetTeamByCoach(req, res);
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

function GetTeam(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_equipo(?, ?, ?)`;
	connection.query(sql, [transaction.no_maiusr, transaction.nid_equipo, transaction.nid_stsede], 
		(error, result, fields) =>{
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

function GetTeamBySede(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_equipo_by_sede(?)`;
	connection.query(sql, transaction.nid_stsede, (error, result, fields) =>{
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

function GetTeamByClub(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_equipo_by_club(?)`;
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

function GetTeamByManager(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_equipo_by_manager(?)`;
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

function GetTeamByCoach(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_equipo_by_coach(?)`;
	connection.query(sql, transaction.nid_entren, (error, result, fields) =>{
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

function GetTeamSeatCoach(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_equipo_sede_entrenador(?, ?, ?)`;
	connection.query(sql, [transaction.no_maiusr, transaction.nid_entren, transaction.nid_stsede], 
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

function RegisterTeam(req, res){
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
										// Se consulta el plan con el ID obtenido
										let options = {
											url: `${config.culqiuri}/plans/${result_subs[0][0].nid_plansu}`,
											method: 'GET',
											jar: true,
											headers: headers
										}

										request(options, function (err, response, body) {
											if (!err) {
												let data = JSON.parse(body);
												let quantity = data.metadata.quantity
												// Obtener cantidad de equipos registrados
												sql = `CALL sps_get_teams(?)`;
												connection.query(sql, transaction.no_maiusr, (error1, result1, fields1) =>{
													if (error1) {
														params[0] = lang.mstrErrorOperationDB.code;
														params[1] = constant.ResponseCode.error;
														params[2] = lang.mstrErrorOperationDB.message + ":" + error1;
														return res
															.status(200)
															.send(comun.ObjectResponse(params));
													} else {
														let equipos = result1[0].length
														if (equipos < quantity) {
															sql = `CALL spi_register_equipo(?, ?, ?, ?)`;
						
															connection.query(sql, [transaction.no_maiusr, transaction.no_descri, transaction.nid_stsede, comun.ShortDate(transaction.fe_fecpag)], 
															(error2, result, fields) =>{
																if (error2) {
																	params[0] = lang.mstrErrorOperationDB.code;
																	params[1] = constant.ResponseCode.error;
																	params[2] = lang.mstrErrorOperationDB.message + ":" + error2;
																	return res
																		.status(200)
																		.send(comun.ObjectResponse(params));
																} else {
																	//Recuperar el ultimo ID Insertado
																	sql = `SELECT MAX(nid_equipo) as nid_equipo from tbl_equipo`;
																	connection.query(sql, (error3, result3, fields) =>{
																			if(error3){
																				params[0] = lang.mstrErrorOperationDB.code;
																				params[1] = constant.ResponseCode.error;
																				params[2] = lang.mstrErrorOperationDB.message + ":" + error3;
																			}else{
																				params[0] = lang.mstrSuccessfulRequest.code;
																				params[1] = constant.ResponseCode.success;
																				params[2] = lang.mstrSuccessfulRequest.message;
																				params[3] = result3[0];
																			}
																			return res
																				.status(200)
																				.send(comun.ObjectResponse(params));
																	});
																}
															});
														} else {
															params[0] = lang.mstrCanNotRegisterMoreTeams.code;
															params[1] = constant.ResponseCode.error;
															params[2] = lang.mstrCanNotRegisterMoreTeams.message;
						
															return res
																.status(200)
																.send(comun.ObjectResponse(params));
														}
													}
												});
											} else {
												params[0] = lang.mstrErrorOperationDB.code;
												params[1] = constant.ResponseCode.error;
												params[2] = err;
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

function UpdateTeam(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spu_set_equipo(?, ?)`;
	connection.query(sql, [transaction.nid_equipo, transaction.no_descri], 
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

function UpdatePaymentTeam(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spu_reset_payment_team(?, ?)`;
	connection.query(sql, [transaction.nid_equipo, transaction.nid_stsede], 
		(error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
		}else{
			let sql2 = `CALL sps_get_equipo_by_sede(?)`;
			connection.query(sql2, transaction.nid_stsede, (error, result, fields) =>{
				if(error){
					params[0] = lang.mstrErrorOperationDB.code;
					params[1] = constant.ResponseCode.error;
					params[2] = `${lang.mstrErrorOperationDB.message}: ${error}`;
					return res
						.status(200)
						.send(comun.ObjectResponse(params));
				}else{
					var equipo = result[0].filter(
						element => element.nid_equipo == transaction.nid_equipo
					)
					var msg = "Ha enviado un nuevo pago: <br>"
					msg += `Club: ${equipo[0].no_nomclu} <br>`
					msg += `Sede: ${equipo[0].no_stsede} <br>`
					msg += `Equipo: ${equipo[0].no_descri} <br>`
					msg += `Administrador: ${equipo[0].no_nomcon} <br>`
					msg += `Monto: S/ 58.88 <br>`
					msg += "<br/><br/><br/> Equipo de Perú Fútbol Stats"
					service.SendMail(result[0][0].no_maiadm, 'Pago Enviado - Perú Fútbol Stats', 'text/html', msg);
					msg = "Ha recibido un nuevo pago: <br>"
					msg += `Club: ${equipo[0].no_nomclu} <br>`
					msg += `Sede: ${equipo[0].no_stsede} <br>`
					msg += `Equipo: ${equipo[0].no_descri} <br>`
					msg += `Administrador: ${equipo[0].no_nomcon} <br>`
					msg += `Monto: S/ 58.88 <br>`
					msg += "<br/><br/><br/> Equipo de Perú Fútbol Stats"
					service.SendMail(config.mailerrece, 'Pago Recibido - Perú Fútbol Stats', 'text/html', msg);
					params[0] = lang.mstrSuccessfulupdate.code;
					params[1] = constant.ResponseCode.success;
					params[2] = lang.mstrSuccessfulupdate.message;
					return res
						.status(200)
						.send(comun.ObjectResponse(params));
				}
			});
		}
	});
}

function DeleteTeam(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spd_delete_equipo(?)`;
	connection.query(sql, transaction.nid_equipo, (error, result, fields) =>{
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

function DeleteTeamCoach(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spd_delete_entrenador_equipo(?)`;
	connection.query(sql, transaction.nid_equipo, (error, result, fields) =>{
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

function RegisterTeamCoach(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spi_register_entrenador_equipo(?, ?, ?, ?)`;
	connection.query(sql, [transaction.nid_equipo, transaction.nid_stsede, transaction.no_maiusr, transaction.nid_entren], 
		(error, result, fields) =>{
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
    teamOperation
}