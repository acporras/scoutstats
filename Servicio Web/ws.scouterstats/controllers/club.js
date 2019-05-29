'use strict'

const db = require('../util/connection');
const config = require('../config');
const comun = require('../util/comun');
const constant = require('../util/constant');
const lang = require('../lang/es');
const service = require('../services/index');
const puppeteer = require('puppeteer');
const cloudinary = require('cloudinary');
const fs = require('fs');

cloudinary.config({ 
	cloud_name: config.cloudname, 
	api_key: config.cloudinarykey, 
	api_secret: config.cloudinarysecret 
});

function clubOperation(req, res){
	var params = new Array();
	const operation = req.body.command;
	switch(operation){
		case constant.RequestOperation.registerclub:
			RegisterClub(req, res);
			break;
		case constant.RequestOperation.getstatistics:
			GetStatistics(req, res);
			break;
		case constant.RequestOperation.sendstatistics:
			SendStatistics(req, res);
			break;
		case constant.RequestOperation.getreportstatistics:
			GenerateReport(req, res);
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

function GetClub(no_maiusr){
	var params = new Array();
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_club(?)`;
	const club = new Promise((resolve, reject) =>{
		try{
			connection.query(sql, no_maiusr, (error, result, fields) =>{
				if(error){
					params[0] = lang.mstrErrorOperationDB.code;
					params[1] = constant.ResponseCode.error;
					params[2] = lang.mstrErrorOperationDB.message + ":" + error;
					reject(comun.ObjectResponse(params));
				}else{
					params[0] = lang.mstrSuccessfulRequest.code;
					params[1] = constant.ResponseCode.success;
					params[2] = lang.mstrSuccessfulRequest.message;
					params[3] = result[0];
					resolve(comun.ObjectResponse(params));
				}
			});
		}catch(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			reject(comun.ObjectResponse(params));
		}
	});

	return club;
}

function GetSeat(nid_stsede){
	var params = new Array();
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_seat(?)`;
	const seat = new Promise((resolve, reject) =>{
		try{
			connection.query(sql, nid_stsede, (error, result, fields) =>{
				if(error){
					params[0] = lang.mstrErrorOperationDB.code;
					params[1] = constant.ResponseCode.error;
					params[2] = lang.mstrErrorOperationDB.message + ":" + error;
					reject(comun.ObjectResponse(params));
				}else{
					params[0] = lang.mstrSuccessfulRequest.code;
					params[1] = constant.ResponseCode.success;
					params[2] = lang.mstrSuccessfulRequest.message;
					params[3] = result[0];
					resolve(comun.ObjectResponse(params));
				}
			});
		}catch(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			reject(comun.ObjectResponse(params));
		}
	});

	return seat;
}

function GetTeam(no_maiusr, nid_equipo, nid_stsede){
	var params = new Array();
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_equipo(?, ?, ?)`;
	const team = new Promise((resolve, reject) =>{
		try{
			connection.query(sql, [no_maiusr, nid_equipo, nid_stsede], (error, result, fields) =>{
				if(error){
					params[0] = lang.mstrErrorOperationDB.code;
					params[1] = constant.ResponseCode.error;
					params[2] = lang.mstrErrorOperationDB.message + ":" + error;
					reject(comun.ObjectResponse(params));
				}else{
					params[0] = lang.mstrSuccessfulRequest.code;
					params[1] = constant.ResponseCode.success;
					params[2] = lang.mstrSuccessfulRequest.message;
					params[3] = result[0];
					resolve(comun.ObjectResponse(params));
				}
			});
		}catch(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			reject(comun.ObjectResponse(params));
		}
	});

	return team;
}


function RegisterClub(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL spi_register_club(?, ?, ?, ?)`;
	connection.query(sql, [transaction.no_nomclu, transaction.no_nomcon, transaction.no_telcon, transaction.no_maiusr], 
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

function SendStatistics(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	const token = req.headers.authorization.split(" ")[1];
	params[0] = lang.mstrSuccessfulRequest.code;
	params[1] = constant.ResponseCode.success;
	params[2] = lang.mstrSuccessfulRequest.message;
	let objectparams = {
		_id : "statistics",
		transaction : transaction
	}
	let hash = service.createTokenObject(objectparams);
	var msg = "Se ha recibido correctamente su solicitud de reporte, el cual podra visualizar y descargar desde el siguiente link: <br/>" + 
	`<a href='${config.uriservice}/report?token=${hash}' target='_blank'> Click Aqui </a>`;
	msg += "<br/><br/><br/> Equipo de Perú Fútbol Stats"
	service.SendMail(transaction.no_maiusr, 'Solicitud de Reporte - Perú Fútbol Stats', 'text/html', msg);

	return res
		.status(200)
		.send(comun.ObjectResponse(params));
}

function GetStatistics(req, res){
	let params = req.query.token;
	params = service.decodeTokenObject(params).response.payload.transaction;
	if(params.co_report == 1){
		params.list_sedes = '';
		params.qt_sedes = 0;
		params.nid_stsede = 0;
		params.list_equipos = '';
		params.qt_equipos = 0;
		params.nid_equipo = 0;
		params.list_jugadores = '';
		params.qt_jugadores = 0;
		getStatisticsSeats(params, req, res);
	} else if(params.co_report == 2){
		var sedes = '';
		params.arr_lstsed.forEach(element =>{
			sedes += element.nid_stsede + ','
		});
		params.list_sedes = sedes.slice(0, -1);
		params.qt_sedes = params.arr_lstsed.length;
		params.nid_stsede = 0;
		params.list_equipos = '';
		params.qt_equipos = 0;
		params.nid_equipo = 0;
		params.list_jugadores = '';
		params.qt_jugadores = 0;
		getStatisticsSeats(params, req, res);
	} else if(params.co_report == 3){
		params.list_sedes = '';
		params.qt_sedes = 0;
		params.list_equipos = '';
		params.qt_equipos = 0;
		params.nid_equipo = 0;
		params.list_jugadores = '';
		params.qt_jugadores = 0;
		getStatisticsSeats(params, req, res);
	} else if(params.co_report == 4){
		var equipos = '';
		params.arr_lstequ.forEach(element =>{
			equipos += element.nid_equipo + ','
		});
		params.list_sedes = '';
		params.qt_sedes = 0;
		params.list_equipos = equipos.slice(0, -1);
		params.qt_equipos = params.arr_lstequ.length;
		params.nid_equipo = 0;
		params.list_jugadores = '';
		params.qt_jugadores = 0;
		getStatisticsSeats(params, req, res);
	} else if(params.co_report == 5){
		var jugadores = '';
		params.arr_jugado.forEach(element =>{
			jugadores += element.nid_jugado + ','
		});
		params.list_sedes = '';
		params.qt_sedes = 0;
		params.list_equipos = '';
		params.qt_equipos = 0;
		params.list_jugadores = jugadores.slice(0, -1);
		params.qt_jugadores = params.arr_jugado.length;
		getStatisticsSeats(params, req, res);
	}
}
function getStatisticsSeats(object, req, res){
	var params = new Array();
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_statistics_club(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
	connection.query(sql, [object.no_maiusr, 
		object.list_sedes, object.qt_sedes, object.nid_stsede, 
		object.list_equipos, object.qt_equipos, object.nid_equipo,
		object.list_jugadores, object.qt_jugadores,
		comun.ShortDate(object.fe_fecini), comun.ShortDate(object.fe_fecfin)], 
	(error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
		}else{
			params[0] = lang.mstrSuccessfulRequest.code;
			params[1] = constant.ResponseCode.success;
			params[2] = lang.mstrSuccessfulRequest.message;
			var report = new Object();
			var clubes = new Array();
			var sedes = new Array();
			var equipos = new Array();
			var partidos = new Array();
			var jugadores = new Array();
			var acciones = new Array();
			var estadisticas = new Array();
			result[0].forEach(element => {
				if(element.nid_cluapp != null){
					clubes.push(
						{ 
							nid_cluapp : element.nid_cluapp, 
							no_nomclu : element.no_nomclu 
						});
				}
				if(element.nid_stsede != null){
					sedes.push(
						{ 
							nid_cluapp : element.nid_cluapp, 
							nid_stsede : element.nid_stsede, 
							no_stsede : element.no_stsede 
						});
				}
				if(element.nid_equipo != null){
					equipos.push(
						{ 
							nid_cluapp : element.nid_cluapp, 
							nid_stsede : element.nid_stsede, 
							nid_equipo : element.nid_equipo, 
							no_equipo : element.no_descri 
						});
				}
				if(element.nid_partid != null){
					partidos.push(
						{ 
							nid_cluapp : element.nid_cluapp, 
							nid_stsede : element.nid_stsede, 
							nid_equipo : element.nid_equipo, 
							nid_partid : element.nid_partid, 
							no_equcon : element.no_equcon, 
							no_equcon : element.no_equcon, 
							qt_golmar : element.qt_golmar, 
							qt_golrec : element.qt_golrec, 
							fl_result : element.fl_result, 
							fl_parter : element.fl_parter, 
							fe_fecpar : element.fe_fecpar 
						});
				}
				if(element.nid_jugado != null){
					jugadores.push(
						{
							nid_cluapp : element.nid_cluapp, 
							nid_stsede : element.nid_stsede, 
							nid_equipo : element.nid_equipo,
							nid_jugado : element.nid_jugado,
							no_jugado : element.no_jugado,
						});
				}
				if(element.nid_accion != null){
					acciones.push(
						{
							nid_accion : element.nid_accion,
							no_accion : element.no_accion,
						});
				}
				if(element.nid_jugacc != null){
					estadisticas.push(
						{
							nid_jugacc : element.nid_jugacc, 
							nid_cluapp : element.nid_cluapp, 
							nid_stsede : element.nid_stsede, 
							nid_equipo : element.nid_equipo,
							nid_partid : element.nid_partid, 
							nid_jugado : element.nid_jugado,
							nid_accion : element.nid_accion,
							qt_accion : element.qt_accion,
						});
				}
			});
			clubes = comun.removeDuplicates(clubes, "nid_cluapp");
			sedes = comun.removeDuplicates(sedes, "nid_stsede");
			equipos = comun.removeDuplicates(equipos, "nid_equipo");
			partidos = comun.removeDuplicates(partidos, "nid_partid");
			partidos = partidos.sort(function (a, b) {
				if (a.nid_partid < b.nid_partid) { return 1; }
				if (a.nid_partid > b.nid_partid) { return -1; }
				return 0;
			});
			jugadores = comun.removeDuplicates(jugadores, "nid_jugado");
			acciones = comun.removeDuplicates(acciones, "nid_accion");
			estadisticas = comun.removeDuplicates(estadisticas, "nid_jugacc");
			report.clubes = new Array();
			report.acciones = new Array();
			clubes.forEach(element => {
				var club_sedes = new Array();
				club_sedes = sedes.filter(sede => sede.nid_cluapp == element.nid_cluapp);
				var club = new Object();
				club.nid_cluapp = element.nid_cluapp;
				club.no_nomclu = element.no_nomclu;
				club.sedes = new Array();
				club_sedes.forEach(a => {
					var sede_equipos = new Array();
					sede_equipos = equipos.filter(equipo => equipo.nid_stsede == a.nid_stsede);
					var sede = new Object();
					sede.nid_stsede = a.nid_stsede;
					sede.no_stsede = a.no_stsede;
					sede.equipos = new Array();
					sede_equipos.forEach(b => {
						var equipo_partidos = new Array()
						var equipo_jugadores = new Array();
						equipo_partidos = partidos.filter(partido => partido.nid_equipo == b.nid_equipo);
						equipo_jugadores = jugadores.filter(jugador => jugador.nid_equipo == b.nid_equipo) 
						var equipo = new Object();
						equipo.nid_equipo = b.nid_equipo;
						equipo.no_equipo = b.no_equipo;
						equipo.partidos = new Array();
						equipo.jugadores = new Array();
						equipo_partidos.forEach(par => {
							var partido_estadisticas = new Array();
							partido_estadisticas = estadisticas.filter(estadistica => estadistica.nid_partid == par.nid_partid);
							var partido = new Object();
							partido.nid_partid = par.nid_partid;
							partido.fe_fecpar = comun.ShortDate(par.fe_fecpar);
							partido.no_equcon = par.no_equcon;
							partido.qt_golmar = par.qt_golmar;
							partido.qt_golrec = par.qt_golrec;
							partido.fl_result = par.fl_result;
							partido.fl_parter = par.fl_parter;
							partido.estadisticas = new Array();
							partido_estadisticas.forEach(est => {
								var estadistica = new Object();
								estadistica.nid_jugado = est.nid_jugado;
								estadistica.nid_accion = est.nid_accion;
								estadistica.qt_accion = est.qt_accion;
								partido.estadisticas.push(estadistica);
							});
							equipo.partidos.push(partido);
						});
						equipo_jugadores.forEach(d => {
							var jugador = new Object();
							jugador.nid_jugado = d.nid_jugado;
							jugador.no_jugado = d.no_jugado;
							equipo.jugadores.push(jugador);
						})
						sede.equipos.push(equipo);
					});
					club.sedes.push(sede);
				});
				report.clubes.push(club);
			});
			acciones.forEach(element => {
				var accion = new Object();
				accion.nid_accion = element.nid_accion;
				accion.no_accion = element.no_accion;
				report.acciones.push(accion);
			});
			report.type = object.fl_tiprep;
			report.data = JSON.stringify(report);
			params[3] = report;
		}
		return res.render("report", comun.ObjectResponse(params));
	});
}

async function createPDF(req, res) {
	var params = new Array();
	const browser = await puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});
	var f = new Date();
	var name = 'report' + 
		f.getDate().toString() + (f.getMonth() +1).toString() + f.getFullYear().toString() + 
		f.getHours().toString() + f.getMinutes().toString() + f.getSeconds().toString() + '.pdf'
	const page = await browser.newPage();
	const options = {
		path: 'fileserver/' + name,
		format: 'A4'
	}
	const uri = req.body.transaction.uri;
	await page.goto(uri, { waitUntil : 'networkidle2' })
	await page.pdf(options)

	await browser.close();
	cloudinary.uploader.upload("fileserver/" + name,(result) => {
		var filePath = 'fileserver/' + name; 
		fs.unlinkSync(filePath);
		params[0] = lang.mstrSuccessfulRequest.code;
		params[1] = constant.ResponseCode.success;
		params[2] = lang.mstrSuccessfulRequest.message;
		params[3] = result;
		return res
			.send(comun.ObjectResponse(params));
	});

}

function GenerateReport(req, res){
	createPDF(req, res)
}

module.exports = {
	clubOperation,
	GetStatistics
}