'use strict'

const config = require('../config');

let params = new Array();

const mailOperation = (req, res) =>{
	let params = new Array();
	let email = req.body.email;
	let msg = "";
	let code = "";
	let html = "";
	if(typeof(email) === "undefined"){
		msg = "No se han recibido datos.";
		code = "error";
		html = '<div class="alert alert-danger"><p><i class="fa fa-exclamation-triangle"></i>' + msg + '</p></div>';
	}else if(email == ""){
		msg = "Por favor introduzca una dirección email válida.";
		code = "warning";
		html = '<div class="alert alert-danger"><p><i class="fa fa-exclamation-triangle"></i>' + msg + '</p></div>';
	}else{
		msg = "Su email se ha guardado con éxito.";
		code = "success";
		html = '<div class="alert alert-success"><p><i class="fa fa-check"></i> ' + msg + '</p></div>';
	}
	return res
		.status(200)
		.send({ "code" : code, "message" : msg, "transactionResponse" : { "html" : html } });

}

module.exports = {
	mailOperation
}