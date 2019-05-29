'use strict'

// Iniciamos las rutas de nuestro servidor/API
const express = require('express');
const api = express.Router();
const usermiddleware = require('../middleware/user.js');

const comun = require('../util/comun');
const lang = require('../lang/es');
const constant = require('../util/constant');
//Controladores
const mail = require('../controllers/mail');
const user = require('../controllers/user');
const app = require('../controllers/app');
const club = require('../controllers/club');
const position = require('../controllers/position');
const incharge = require('../controllers/incharge');
const seat = require('../controllers/seat');
const team = require('../controllers/team');
const coach = require('../controllers/coach');
const player = require('../controllers/player');
const match = require('../controllers/match');
const action = require('../controllers/action');
const training = require('../controllers/training');
const plan = require('../controllers/plan');
const customer = require('../controllers/customer');

//Peticiones
api.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

//Get
api.get('/',function(req, res){res.render("index");});
api.get('/login', function(req, res){res.render("login")});
api.get('/:id/download', app.appDownload);
api.get('/:id/info', app.appGet);
//Get Seguras
api.get('/dashboard', usermiddleware.secureRequest,function(req, res){res.render("dashboard")});
api.get('/report', usermiddleware.secureRequest, club.GetStatistics);
api.get('/changePassword', usermiddleware.secureRequest, user.ChangePassword);
api.get('/changePassword', usermiddleware.secureRequest, user.ChangePassword);

//Post
api.post('/sendmail/', mail.mailOperation);// SendMail
api.post('/user/', user.userOperation);// user
api.post('/app/upload', usermiddleware.ensureAuthenticated, app.appUpload);// user
api.post('/usersecurity/', usermiddleware.ensureAuthenticated, user.userOperation);// user
api.post('/club/', usermiddleware.ensureAuthenticated, club.clubOperation);// club
api.post('/position/', usermiddleware.ensureAuthenticated, position.positionOperation);// position
api.post('/incharge/', usermiddleware.ensureAuthenticated, incharge.inchargeOperation);// incharge
api.post('/seat/', usermiddleware.ensureAuthenticated, seat.seatOperation);// seat
api.post('/team/', usermiddleware.ensureAuthenticated, team.teamOperation);// team
api.post('/coach/', usermiddleware.ensureAuthenticated, coach.coachOperation);// coach
api.post('/player/', usermiddleware.ensureAuthenticated, player.playerOperation);// player
api.post('/match/', usermiddleware.ensureAuthenticated, match.matchOperation);// match
api.post('/action/', usermiddleware.ensureAuthenticated, action.actionOperation);// action
api.post('/training/', usermiddleware.ensureAuthenticated, training.trainingOperation);// training
api.post('/plan/', plan.planOperation);// plan
api.post('/customer/', customer.customerOperation);// customer

//Aplicativo

module.exports = api