'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');
const helper = require('sendgrid').mail;

function createToken(user){
  const payload = {
    "sub" : user._id,
    "iat" : moment().unix(),
    "exp": moment().add(config.expvalue, config.exptype).unix(),
  };
  return jwt.encode(payload, config.token);
};

function createTokenObject(object){
	object.sub = object._id;
	object.iat = moment().unix();
	object.exp = moment().add(config.expvalue, config.exptype).unix();
	const payload = object;
	return jwt.encode(payload, config.token);
};

function decodeToken(token){
	var params = new Object();
	params.code = 'ERROR'
	const decoded = new Promise((resolve, reject) =>{
		try{
			const payload = jwt.decode(token, config.token);
			if(payload.exp <= moment().unix()) {
				params.message = 'El token a expirado'
				params.response = {
					status : 401,
					message : 'error'
				}
				reject(params);
			}
			params.code = 'SUCCESS'
			params.message = null
			params.response = {
				payload : payload.sub
			}
			resolve(params);
		}catch(err){
			params.message = err
			params.response = {
				status : 500,
				message: 'Invalid token'
			}
			reject(params);
		}
	});

	return decoded;
}

function decodeTokenObject(token){
	var params = new Object();
	params.code = 'ERROR'
		try{
			const payload = jwt.decode(token, config.token);
			if(payload.exp <= moment().unix()) {
				params.message = 'El token a expirado'
			}
			params.code = 'SUCCESS'
			params.message = null
			params.response = {
				payload : payload
			}
		}catch(err){
			params.message = 'Invalid token' + err
		}

	return params;
};

function SendMail(to_email, subject, type, content){
	var from_email = new helper.Email(config.mailerremi);
	var to_email = new helper.Email(to_email);
	var subject = subject;
	var content = new helper.Content(type, content);
	var mail = new helper.Mail(from_email, subject, to_email, content);

	var sg = require('sendgrid')(config.sendgridkey);
	var request = sg.emptyRequest({
	  method: 'POST',
	  path: '/v3/mail/send',
	  body: mail.toJSON(),
	});

	sg.API(request, function(error, response) {
	  console.log(response.statusCode);
	  console.log(response.body);
	  console.log(response.headers);
	});
}

module.exports = {
	createToken,
	decodeToken,
	SendMail,
	createTokenObject,
	decodeTokenObject
}