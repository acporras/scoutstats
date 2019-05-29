'use strict'

const services = require('../services/index');
const lang = require('../lang/es');
const constant = require('../util/constant');
const comun = require('../util/comun');

function ensureAuthenticated(req, res, next) {
  var params = new Array();
  if(!req.headers.authorization) {
    params[0] = lang.mstrNotAuthorizationHeader.code;
    params[1] = constant.ResponseCode.error;
    params[2] = lang.mstrNotAuthorizationHeader.message;
    return res
      .status(200)
      .send(comun.ObjectResponse(params));
  }
  const token = req.headers.authorization.split(" ")[1];
  services.decodeToken(token)
    .then(response =>{
      req.user = response
      next()
    })
    .catch(response =>{
      params[0] = lang.mstrErrorValidateToken.code;
      params[1] = constant.ResponseCode.error;
      params[2] = lang.mstrErrorValidateToken.message;
      params[3] = response;
      return res
        .status(response.response.status)
        .send(comun.ObjectResponse(params));
    })
}

function secureRequest(req, res, next){
  var params = new Array();
  if(!req.query.token) {
    params[0] = lang.mstrNotAuthorizationHeader.code;
    params[1] = constant.ResponseCode.error;
    params[2] = lang.mstrNotAuthorizationHeader.message;
    return res
      .status(200)
      .send(comun.ObjectResponse(params));
  }
  const token = req.query.token;
  services.decodeToken(token)
    .then(response =>{
      req.user = response
      next()
    })
    .catch(response =>{
      params[0] = lang.mstrErrorValidateToken.code;
      params[1] = constant.ResponseCode.error;
      params[2] = lang.mstrErrorValidateToken.message;
      params[3] = response;
      return res
        .status(response.response.status)
        .send(comun.ObjectResponse(params));
    })
}

module.exports = {
  ensureAuthenticated,
  secureRequest
}