'use strict'

const express = require('express'),
	bodyParser = require('body-parser'),
	hbs = require('express-handlebars'),
	cors = require('cors'),
	path = require('path'),
	methodOverride = require('method-override');

const route = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.use(methodOverride());
app.use(cors());
app.use(route);
//app.use(express.static('/static'));
app.use('/static', express.static(__dirname + '/public'));

module.exports = app