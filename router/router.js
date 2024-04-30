const {Router}=require("express")
const rutas=Router("/");
const control=require("../controllers/controllers.js")
const cors=require("cors")
/**/
const express = require('express');
const multer = require('multer');
const path = require('path');  // Asegúrate de que esta línea está presente
const fs = require('fs');
const db = require('../sql_table/db');

const imagenesDir = path.join(__dirname, '../imagenes');
if (!fs.existsSync(imagenesDir)) {
    fs.mkdirSync(imagenesDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagenesDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const enviarArchivo = multer({ storage: storage });
rutas.get("/",control.inicio)
rutas.post("/registrar_planilimitado",enviarArchivo.single('imagenPlanIlimitado'),control.registrar_planIlimitado)
rutas.post("/editar_planilimitado",enviarArchivo.single('imagenPlanIlimitado'),control.editar_planilimitado)
rutas.post("/eliminar_planilimitado",control.eliminar_planilimitado)
/* */

module.exports=rutas;