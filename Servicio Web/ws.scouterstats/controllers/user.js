'use strict'

const bcrypt = require('bcrypt');
const axios = require('axios');
const request = require('request');

const db = require('../util/connection');
const config = require('../config');
const comun = require('../util/comun');
const constant = require('../util/constant');
const lang = require('../lang/es');
const service = require('../services/index');

function userOperation(req, res){
	var params = new Array();
	const operation = req.body.command;
	switch(operation){
		case constant.RequestOperation.signinuser:
			SigninUser(req, res);
			break;
		case constant.RequestOperation.signupuser:
			SignupUser(req, res);
			break;
		case constant.RequestOperation.validateuser:
			ValidateUser(req, res);
			break;
		case constant.RequestOperation.changepassworduser:
			ChangePasswordUser(req, res);
			break;
		case constant.RequestOperation.recoverpassword:
			RecoverPassword(req, res);
			break;
		case constant.RequestOperation.loginadmin:
			LoginAdmin(req, res);
			break;
		case constant.RequestOperation.getapps:
			GetApps(req, res);
			break;
		case constant.RequestOperation.getappcode:
			GetAppCode(req, res);
			break;
		case constant.RequestOperation.associatecard:
			AssociateCard(req, res);
			break;
		case constant.RequestOperation.getplanuser:
			GetPlanUser(req, res);
			break;
		case constant.RequestOperation.updateplanuser:
			UpdatePlanUser(req, res);
			break;
		case constant.RequestOperation.validatesubscription:
			ValidateSubscription(req, res);
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

function SigninUser(req, res){
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
				bcrypt.compare(transaction.no_pasusr , result[0][0].no_pasusr)
					.then((validate) =>{
						if(validate){
							if(transaction.co_perfil == result[0][0].co_perfil){
								params[0] = lang.mstrSuccessfullogeo.code;
								params[1] = constant.ResponseCode.success;
								params[2] = lang.mstrSuccessfullogeo.message;
								params[3] = {
									token : service.createToken({ _id : transaction.no_maiusr }),
									result : result,
									fields : fields
								}
							}else{
								params[0] = lang.mstrProfileNotAuthorized.code;
					            params[1] = constant.ResponseCode.error;
					            params[2] = lang.mstrProfileNotAuthorized.message;
							}
						}else{
							params[0] = lang.mstrIncorrectPassword.code;
				            params[1] = constant.ResponseCode.error;
				            params[2] = lang.mstrIncorrectPassword.message;
						}
						return res
				            	.status(200)
				            	.send(comun.ObjectResponse(params));
					})
					.catch((error) => {
                    	params[0] = lang.mstrErrorComparePassword.code;
			            params[1] = constant.ResponseCode.error;
			            params[2] = lang.mstrErrorComparePassword.message + ":" + error;
			            return res
			            	.status(200)
			            	.send(comun.ObjectResponse(params));
	                });
			}
		}
	});
}

function SignupUser(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_login_user(?)`;
	//Se verifica si el usuario ya existe
	connection.query(sql, transaction.no_maiusr, (error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}else{
			if(result[0].length == 0){
				//Se verifica que exista el codigo de perfil
				sql = `CALL sps_get_perfil_by_code(?)`;
				connection.query(sql, transaction.co_perfil, (error, result, fields) =>{
					if(error){
						params[0] = lang.mstrErrorOperationDB.code;
						params[1] = constant.ResponseCode.error;
						params[2] = lang.mstrErrorOperationDB.message + ":" + error;
						return res
					        .status(200)
					        .send(comun.ObjectResponse(params));
					} else {
						if(result[0].length == 0) {
							params[0] = lang.mstrNotFoundPerfil.code;
				            params[1] = constant.ResponseCode.error;
				            params[2] = lang.mstrNotFoundPerfil.message;
				            return res
				            	.status(200)
				            	.send(comun.ObjectResponse(params));
						} else {
							// Se realiza la insercción del usuario en culqi si es que es administrador
							let firstname = ""
							let lastname = ""
							if (transaction.co_perfil == 'ADMIN') {
								const name = transaction.no_contac.split(' ');
								if (name.length <= 1) {
									params[0] = 'error';
									params[1] = constant.ResponseCode.error;
									params[2] = 'El nombre del encargado debe contener el nombre y apellido';
									return res
										.status(200)
										.send(comun.ObjectResponse(params));
								} else {
									if (name.length == 2) {
										firstname = name[0]
										lastname = name[1]
									} else if (name.length == 3) {
										firstname = name[0]
										lastname = `${name[1]} ${name[2]}`
									} else if (name.length == 4) {
										firstname = `${name[0]} ${name[1]}`
										lastname = `${name[2]} ${name[3]}`
									}
								}
								const Config = {
									headers: {
										Authorization: `Bearer ${config.culqi_apisecret}`
									}
								}
								axios.post(`${config.culqiuri}/customers`, {
									"first_name": firstname,
									"last_name": lastname,
									"email": transaction.no_maiusr,
									"address": "Av. Brasil 123",
									"address_city": "Lima",
									"country_code": "PE",
									"phone_number": transaction.no_telefo,
								}, Config)
									.then(resp_client => {
										// Se asocia la tarjeta enviada por medio del token
										axios.post(`${config.culqiuri}/cards`, {
											"customer_id": resp_client.data.id,
											"token_id": transaction.token
										}, Config)
											.then(resp_card => {
												// Se registra la tarjeta en la base de datos
												sql = `CALL spi_register_card(?, ?, ?)`
												let object = resp_card.data.source || resp_card.data.token
												connection.query(sql, [resp_card.data.id, resp_client.data.id, object.card_number], (error, result, fields) =>{
													if (error) {
														console.log(error)
													} else {
														// Se crea la suscripción a la tarjeta asociada
														axios.post(`${config.culqiuri}/subscriptions`, {
															"card_id" : resp_card.data.id,
															"plan_id" : transaction.plan
														}, Config)
															.then(resp_subsc => {
																sql = `CALL spi_register_suscription(?, ?, ?, ?)`
																connection.query(sql, [resp_subsc.data.id, resp_card.data.id, transaction.plan, resp_client.data.id], (error1, result1, fields1) => {
																	if (error1) {
																		console.log(error1)
																	} else {
																		console.log("Suscripción creada correctamente")
																	}
																});
															})
															.catch(err => {
																console.log(err.response.data.merchant_message)
															})
													}
												});
											})
											.catch(err => {
												console.log(err.response.data.merchant_message)
											})
										createClient(req, res, resp_client.data);
									})
									.catch(err => {
										params[0] = err.response.status;
										params[1] = constant.ResponseCode.error;
										params[2] = err.response.data.merchant_message;
										return res
											.status(200)
											.send(comun.ObjectResponse(params));
									})
							} else {
								createClient(req, res, null);
							}
						}
					}
				});
			}else{
				params[0] = lang.mstrUserAlreadyRegistered.code;
				params[1] = constant.ResponseCode.error;
				params[2] = lang.mstrUserAlreadyRegistered.message;
				return res
			        .status(200)
			        .send(comun.ObjectResponse(params));
			}
		}
	});
}

function LoginAdmin(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_login_admin(?)`;
	connection.query(sql, transaction.email, (error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}else{
			if(result[0].length == 0){
				params[0] = lang.mstrNotFoundUser.code;
				params[1] = constant.ResponseCode.error;
				params[2] = lang.mstrNotFoundUser.message;
				return res
			        .status(200)
			        .send(comun.ObjectResponse(params));
			}else{
				bcrypt.compare(transaction.password , result[0][0].no_pasusr)
					.then((validate) =>{
						if(validate){
							params[0] = lang.mstrSuccessfullogeo.code;
							params[1] = constant.ResponseCode.success;
							params[2] = lang.mstrSuccessfullogeo.message;
							params[3] = {
								token : service.createToken({ _id : transaction.email }),
								result : result,
								fields : fields
							}
						}else{
							params[0] = lang.mstrIncorrectPassword.code;
				            params[1] = constant.ResponseCode.error;
				            params[2] = lang.mstrIncorrectPassword.message;
						}
						return res
				            	.status(200)
				            	.send(comun.ObjectResponse(params));
					})
					.catch((error) => {
                    	params[0] = lang.mstrErrorComparePassword.code;
			            params[1] = constant.ResponseCode.error;
			            params[2] = lang.mstrErrorComparePassword.message + ":" + error;
			            return res
			            	.status(200)
			            	.send(comun.ObjectResponse(params));
	                });
			}
		}
	});
}

function ValidateUser(req, res){
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
		}else{
			if(result[0].length == 0){
				params[0] = lang.mstrNotFoundUser.code;
				params[1] = constant.ResponseCode.success;
				params[2] = lang.mstrNotFoundUser.message;
				return res
					.status(200)
					.send(comun.ObjectResponse(params));
			} else {
				params[0] = lang.mstrFoundUser.code;
				params[1] = constant.ResponseCode.success;
				params[2] = lang.mstrFoundUser.message;
				return res
					.status(200)
					.send(comun.ObjectResponse(params));
			}
		}
	});
}

function ChangePasswordUser(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var object = service.decodeTokenObject(transaction.token);
	transaction.no_maiusr = object.user;
	var connection = db.mysqlconnection();
	let sql = `CALL spu_upd_change_password(?, ?)`;
	bcrypt.hash(transaction.no_pasusr, config.salt)
		.then((hashedPassword) =>{
			connection.query(sql, [object.response.payload.user, hashedPassword], (error, result, fields) =>{
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
		})
		.catch((err) =>{
			params[0] = lang.mstrErrorHashedPassword.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorHashedPassword.message + ":" + err;
			return res
				.status(200)
				.send(comun.ObjectResponse(params));
		});
}

function GetApps(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_apps()`;
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

function GetAppCode(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_app_by_code(?)`;
	connection.query(sql, transaction.co_aplica, (error, result, fields) =>{
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

function RecoverPassword(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	let objectParams = {
		_id : "changePassword",
		user : transaction.no_maiusr
	}
	let hash = service.createTokenObject(objectParams);
	let msg = "<br/><br/>Por favor realize el cambio de su contraseña desde el siguiente link: <br/>" + 
		`<a href='${config.uriservice}/changePassword?token=${hash}' target='_blank'> Click Aqui </a>`;
	msg += "<br/><br/><br/> Equipo de Perú Fútbol Stats"
	service.SendMail(transaction.no_maiusr, 'Cambio de contraseña - Perú Fútbol Stats', 'text/html', 
		'Hola: <br/>' + transaction.no_maiusr +
		msg);
	params[0] = lang.mstrSuccessfulRequest.code;
	params[1] = constant.ResponseCode.success;
	params[2] = lang.mstrSuccessfulRequest.message;
	return res
		.status(200)
		.send(comun.ObjectResponse(params));

}

function ChangePassword(req, res){
	return res.render("changePassword", { });
}

function createClient(req, res, culqid) {
	var params = new Array();
	let id = null;
	if (culqid != null) {
		id = culqid.id
	}
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spi_register_user(?, ?, ?, ?)`;
	bcrypt.hash(transaction.no_pasusr, config.salt)
		.then((hashedPassword) =>{
			connection.query(sql, [transaction.no_maiusr, hashedPassword, transaction.co_perfil, id], 
				(error, result, fields) =>{
				if(error){
					params[0] = lang.mstrErrorOperationDB.code;
					params[1] = constant.ResponseCode.error;
					params[2] = lang.mstrErrorOperationDB.message + ":" + error;
					return res
						.status(200)
						.send(comun.ObjectResponse(params));
				}else{
					let token = service.createToken({ _id : transaction.no_maiusr });
					let objectParams = {
						_id : "changePassword",
						user : transaction.no_maiusr
					}
					let hash = service.createTokenObject(objectParams);
					let msg = (transaction.co_perfil == "ADMIN") ? "" : "<br/><br/>Por favor realize el cambio de su contraseña desde el siguiente link: <br/>" + 
					`<a href='${config.uriservice}/changePassword?token=${hash}' target='_blank'> Click Aqui </a>`;
					msg += "<br/><br/><br/> Equipo de Perú Fútbol Stats"
					service.SendMail(transaction.no_maiusr, 'Bienvenido a Perú Fútbol Stats', 'text/html', 
						'Hola, Se ha creado su cuenta correctamente: <br/>' + transaction.no_maiusr +
						msg);
					params[0] = lang.mstrSuccessfulregistration.code;
					params[1] = constant.ResponseCode.success;
					params[2] = lang.mstrSuccessfulregistration.message;
					params[3] = {
						token: token,
						result: result,
						fields: fields
					}
					return res
						.status(200)
						.send(comun.ObjectResponse(params));
				}
			});
		})
		.catch((err) =>{
			params[0] = lang.mstrErrorHashedPassword.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorHashedPassword.message + ":" + err;
			return res
				.status(200)
				.send(comun.ObjectResponse(params));
		});
}

function AssociateCard(req, res) {
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
				// Se consulta la información del cliente
				var headers = {
					'Authorization': `Bearer ${config.culqi_apisecret}`
				}
				var options = {
					url: `${config.culqiuri}/customers/${result[0][0].nid_culqid}`,
					method: 'GET',
					jar: true,
					headers: headers
				}

				request(options, function (err, response, body) {
					if (!err) {
						const client = JSON.parse(body);
						const cards = client.cards;
						if (cards.length > 0) {
							// Se eliminan las tarjetas existentes y las suscripciones activas
							cards.forEach(card => {
								var options_card = {
									url: `${config.culqiuri}/customers/${card.id}`,
									method: 'DELETE',
									jar: true,
									headers: headers
								}
								request(options_card, (err_card, resp_card, body_card) => {
									if (err_card) {
										console.log(err_card)
									}
								});
							});
						}

						const Config = {
							headers: {
								Authorization: `Bearer ${config.culqi_apisecret}`
							}
						}
						// Se asocia la nueva tarjeta
						axios.post(`${config.culqiuri}/cards`, {
							"customer_id": result[0][0].nid_culqid,
							"token_id": transaction.token
						}, Config)
							.then(resp_card => {
								// Se registra la tarjeta en la base de datos
								sql = `CALL spi_register_card(?, ?, ?)`
								let object = resp_card.data.source || resp_card.data.token
								connection.query(sql, [resp_card.data.id, result[0][0].nid_culqid, object.card_number], (error_card, result_card, fields_card) =>{
									if (error_card) {
										params[0] = lang.mstrErrorOperationDB.code;
										params[1] = constant.ResponseCode.error;
										params[2] = `${lang.mstrErrorOperationDB.message}: ${error_card}`;
										return res
											.status(200)
											.send(comun.ObjectResponse(params));
									} else {
										// Se verifica si el cliente y la tarjeta previa tenian suscripciones activas
										sql = `CALL sps_get_suscriptions(?)`
										connection.query(sql, result[0][0].nid_culqid, (error_subs, result_subs, fields_subs) =>{
											if (error_subs) {
												console.log(error_subs);
											} else {
												if(result_subs[0].length > 0){
													// Se cancela suscripcion anterior
													var options_subs = {
														url: `${config.culqiuri}/subscriptions/${result_subs[0][0].nid_suscri}`,
														method: 'DELETE',
														jar: true,
														headers: headers
													}
													request(options_subs, (err_subs, resp_subs, body_subs) => {
														if (err_subs) {
															console.log(err_subs)
														}
													});
													// Se crea la nueva suscripción a la tarjeta asociada
													axios.post(`${config.culqiuri}/subscriptions`, {
														"card_id" : resp_card.data.id,
														"plan_id" : result_subs[0][0].nid_plansu
													}, Config)
														.then(resp_subsc => {
															sql = `CALL spi_register_suscription(?, ?, ?, ?)`
															connection.query(sql, [resp_subsc.data.id, resp_card.data.id, transaction.plan, resp_client.data.id], (error1, result1, fields1) => {
																if (error1) {
																	console.log(error1)
																} else {
																	console.log("Suscripción creada correctamente")
																}
															});
														})
														.catch(err => {
															console.log(err.response.data.merchant_message)
														})
												}
											}
										});
										// Se retorna la creación de exito sin importar si la suscripción cae en error
										params[0] = lang.mstrSuccessfulRequest.code;
										params[1] = constant.ResponseCode.success;
										params[2] = lang.mstrSuccessfulRequest.message
										return res
											.status(200)
											.send(comun.ObjectResponse(params));
									}
								});
							})
							.catch(err => {
								params[0] = lang.mstrErrorOperationDB.code;
								params[1] = constant.ResponseCode.error;
								params[2] = err.response.data.merchant_message;
								return res
									.status(200)
									.send(comun.ObjectResponse(params));
							})
						
					} else {
						params[0] = lang.mstrErrorOperationDB.code;
						params[1] = constant.ResponseCode.error;
						params[2] = err;
						return res
							.status(200)
							.send(comun.ObjectResponse(params));
					}
				});
			}
		}
	});
}

function GetPlanUser(req, res) {
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
							// Se consulta el plan con el ID obtenido
							var headers = {
								'Authorization': `Bearer ${config.culqi_apisecret}`
							}
							
							var options_plan = {
								url: `${config.culqiuri}/plans/${result_subs[0][0].nid_plansu}`,
								method: 'GET',
								jar: true,
								headers: headers
							}
							request(options_plan, (err_plan, resp_plan, body_plan) => {
								if (err_plan) {
									params[0] = lang.mstrErrorOperationDB.code;
									params[1] = constant.ResponseCode.error;
									params[2] = err_plan;
									return res
										.status(200)
										.send(comun.ObjectResponse(params));
								} else {
									const data = JSON.parse(body_plan);
									params[0] = lang.mstrSuccessfulRequest.code;
									params[1] = constant.ResponseCode.success;
									params[2] = lang.mstrSuccessfulRequest.message
									params[3] = [data]
									return res
										.status(200)
										.send(comun.ObjectResponse(params));
								}
							});
						} else {
							params[0] = lang.mstrSuccessfulRequest.code;
							params[1] = constant.ResponseCode.success;
							params[2] = lang.mstrSuccessfulRequest.message
							params[3] = []
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

function UpdatePlanUser(req, res) {
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
				let headers = {
					'Authorization': `Bearer ${config.culqi_apisecret}`
				}
				let options_plan = {
					url: `${config.culqiuri}/plans/${transaction.token}`,
					method: 'GET',
					jar: true,
					headers: headers
				}

				request(options_plan, function (err_plan, response_plan, body_plan) {
					if(!err_plan) {
						let data_plan = JSON.parse(body_plan);
						let quantity = data_plan.metadata.quantity;
						if (quantity.toString().toLowerCase() == "x") {
							quantity = 9999999
						}
						// Obtener cantidad de equipos registrados
						sql = `CALL sps_get_teams(?)`;
						connection.query(sql, transaction.no_maiusr, (error_t, result_t, fields_t) =>{
							if (error_t) {
								params[0] = lang.mstrErrorOperationDB.code;
								params[1] = constant.ResponseCode.error;
								params[2] = lang.mstrErrorOperationDB.message + ":" + error1;
								return res
									.status(200)
									.send(comun.ObjectResponse(params));
							} else {
								let equipos = result_t[0].length
								if (equipos > quantity) {
									params[0] = lang.mstrDeleteTeams.code;
									params[1] = constant.ResponseCode.error;
									params[2] = lang.mstrDeleteTeams.message.replace("[QUANTITY]", quantity);
									return res
										.status(200)
										.send(comun.ObjectResponse(params));
								} else {
									//Se consulta las suscripciones activas
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
												// Se cancela la suscripción activa
												var options_subs = {
													url: `${config.culqiuri}/subscriptions/${result_subs[0][0].nid_suscri}`,
													method: 'DELETE',
													jar: true,
													headers: headers
												}
												request(options_subs, (err_subs, resp_subs, body_subs) => {
													if (err_subs) {
														console.log(err_subs)
													} else {
														const data = JSON.parse(body_subs);
													}
												});
											}
											// Se obtiene la tarjeta actual del cliente
											sql = `CALL sps_get_cards(?)`
											connection.query(sql, result[0][0].nid_culqid, (error_card, result_card, fields_card) =>{
												if (error_card) {
													params[0] = lang.mstrErrorOperationDB.code;
													params[1] = constant.ResponseCode.error;
													params[2] = lang.mstrErrorOperationDB.message + ":" + error_card;
													return res
														.status(200)
														.send(comun.ObjectResponse(params));
												} else {
													if (result_card[0].length > 0) {
														// Se crea la nueva suscripción
														const Config = {
															headers: {
																Authorization: `Bearer ${config.culqi_apisecret}`
															}
														}
														axios.post(`${config.culqiuri}/subscriptions`, {
															"card_id": result_card[0][0].nid_tarjet,
															"plan_id": transaction.token
														}, Config)
															.then(resp_subsc => {
																sql = `CALL spi_register_suscription(?, ?, ?, ?)`
																connection.query(sql, [resp_subsc.data.id, result_card[0][0].nid_tarjet, transaction.token, result[0][0].nid_culqid], (error1, result1, fields1) => {
																	if (error1) {
																		params[0] = lang.mstrErrorOperationDB.code;
																		params[1] = constant.ResponseCode.error;
																		params[2] = lang.mstrErrorOperationDB.message + ":" + error1;
																		return res
																			.status(200)
																			.send(comun.ObjectResponse(params));
																	} else {
																		params[0] = lang.mstrSuccessfulRequest.code;
																		params[1] = constant.ResponseCode.success;
																		params[2] = lang.mstrSuccessfulRequest.message;
																		return res
																			.status(200)
																			.send(comun.ObjectResponse(params));
																	}
																});
															})
															.catch(err => {
																params[0] = lang.mstrErrorOperationDB.code;
																params[1] = constant.ResponseCode.error;
																params[2] = lang.mstrErrorOperationDB.message + ":" + err;
																return res
																	.status(200)
																	.send(comun.ObjectResponse(params));
															})
													} else {
														params[0] = lang.mstrErrorOperationDB.code;
														params[1] = constant.ResponseCode.error;
														params[2] = "Error: Debe tener asociada una tarjeta";
														return res
															.status(200)
															.send(comun.ObjectResponse(params));
													}
												}
											});
										}
									});
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
			}
		}
	});
}

function ValidateSubscription(req, res) {
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
										params[0] = lang.mstrActiveSubscription.code;
										params[1] = constant.ResponseCode.success;
										params[2] = lang.mstrActiveSubscription.message;
										return res
											.status(200)
											.send(comun.ObjectResponse(params));
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

module.exports = {
	userOperation,
	ChangePassword
}