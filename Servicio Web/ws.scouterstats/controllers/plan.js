const axios = require('axios');
const config = require('../config');
const comun = require('../util/comun');
const constant = require('../util/constant');
const lang = require('../lang/es');
const service = require('../services/index');
const request = require('request');

function planOperation(req, res){
	var params = new Array();
	const operation = req.body.command;
	switch(operation){
		case constant.RequestOperation.getplans:
			GetPlans(req, res);
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

function GetPlans(req, res) {
    var params = new Array();
    const transaction = req.body.transaction;
    var headers = {
        'Authorization': `Bearer ${config.culqi_apisecret}`
    }
    var options = {
        url: 'https://api.culqi.com/v2/plans',
        method: 'GET',
        jar: true,
        headers: headers
    }
    //Step 3 - do the request
    request(options, function (error, response, body) {
        if (!error) {
            const data = JSON.parse(body)
            params[0] = lang.mstrSuccessfulRequest.code;
			params[1] = constant.ResponseCode.success;
            params[2] = lang.mstrSuccessfulRequest.message;
            params[3] = data.data;
			return res
		        .status(200)
                .send(comun.ObjectResponse(params));
        } else {
            params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = error;
			return res
		        .status(200)
                .send(comun.ObjectResponse(params));
        }
    });
}

module.exports = {
    planOperation
}