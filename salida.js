const express = require('express');
const aplicacion = express();
const rutas = require('./router/router');
const db = require('./sql_table/db');
const hbs = require('express-handlebars');
const path = require('path');
const cors = require('cors');
const coockies=require("cookie-parser")
//db();
aplicacion.use(express.json({ limit: '50mb' }));
aplicacion.use(coockies())
aplicacion.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000,
  }),
);
//// Middleware para servir archivos estáticos
aplicacion.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));
aplicacion.use(express.static(path.join(__dirname, 'public')));
aplicacion.set('view engine', '.hbs');
aplicacion.set('views', path.join(__dirname + '/views'));
const aHbs = hbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(aplicacion.get('views'), 'layouts'),
  partialsDir: path.join(aplicacion.get('views'), 'estaticos'),
});
aplicacion.engine('.hbs', aHbs.engine);
//
aplicacion.use(cors());
//
aplicacion.use('/', rutas);
module.exports = aplicacion;