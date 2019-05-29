const axios = require('axios');
const config = require('../config');
const db = require('../util/connection');
const comun = require('../util/comun');
const constant = require('../util/constant');
const lang = require('../lang/es');
const service = require('../services/index');
const request = require('request');

function customerOperation(req, res){
	var params = new Array();
	const operation = req.body.command;
	switch(operation){
		case constant.RequestOperation.getcustomer:
			GetCustomer(req, res);
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

function GetCustomer(req, res) {
    var params = new Array();
    const transaction = req.body.transaction;
    var connection = db.mysqlconnection();
    let sql = `CALL sps_login_user(?)`;
    connection.query(sql, transaction.no_maiusr, (error, result, fields) =>{
        if (error) {
            params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			return res
				.status(200)
				.send(comun.ObjectResponse(params));
        } else {
            if(result[0].length == 0){
                params[0] = lang.mstrNotFoundUser.code;
				params[1] = constant.ResponseCode.success;
				params[2] = lang.mstrNotFoundUser.message;
				return res
					.status(200)
					.send(comun.ObjectResponse(params));
            } else {
				var headers = {
                    'Authorization': `Bearer ${config.culqi_apisecret}`
                }
                var options = {
                    url: `${config.culqiuri}/customers/${result[0][0].nid_culqid}`,
                    method: 'GET',
                    jar: true,
                    headers: headers
                }
                //Step 3 - do the request
                request(options, function (err, response, body) {
                    if (!err) {
                        const data = JSON.parse(body);
                        params[0] = lang.mstrSuccessfulRequest.code;
                        params[1] = constant.ResponseCode.success;
                        params[2] = lang.mstrSuccessfulRequest.message;
                        params[3] = [data];
                        return res
                            .status(200)
                            .send(comun.ObjectResponse(params));
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

module.exports = {
    customerOperation
}