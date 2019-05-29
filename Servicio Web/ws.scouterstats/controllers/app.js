'use strict'
const multer  = require('multer')
const db = require('../util/connection');
const config = require('../config');
const comun = require('../util/comun');
const constant = require('../util/constant');
const lang = require('../lang/es');
const service = require('../services/index');

var upload = multer({ dest: 'fileserver/upgrade' })

function appUpload(req, res){
    var params = new Array();
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './fileserver/upgrade')
        },
        filename: function(req, file, cb){
            cb(null, req.body.filename)
        }
    })

    var upload = multer({ storage: storage}).single('file')
    upload(req, res, function(err) {
        if(err){
            params[0] = lang.mstrUploadError.code;
            params[1] = constant.ResponseCode.error;
            params[2] = `${lang.mstrUploadError.message}: ${err}`;
            return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
        } else {
            var connection = db.mysqlconnection();
            let sql = `CALL spu_set_app(?,?)`;
            connection.query(sql, [req.body.app, req.body.name], (error, result, fields) =>{
				if(error){
					params[0] = lang.mstrErrorOperationDB.code;
					params[1] = constant.ResponseCode.error;
					params[2] = `${lang.mstrErrorOperationDB.message}: ${error}`;
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
    })
}

function appDownload(req, res){
    return res.download(`./fileserver/upgrade/${req.params.id}.apk`, `${req.params.id}.apk`, (err) => {
        if(err){
            console.log('error', err)
        }
    });
}

function appGet(req, res){
	var params = new Array();
	const transaction = req.body.transaction;
	var connection = db.mysqlconnection();
	let sql = `CALL sps_get_app_by_code(?)`;
	connection.query(sql, req.params.id, (error, result, fields) =>{
		if(error){
			params[0] = lang.mstrErrorOperationDB.code;
			params[1] = constant.ResponseCode.error;
			params[2] = lang.mstrErrorOperationDB.message + ":" + error;
			return res
		        .status(200)
		        .send(comun.ObjectResponse(params));
		}else{
			return res
		        .status(200)
		        .send(result[0][0]);
		}
	});
}

module.exports = {
    appUpload,
    appDownload,
    appGet
}