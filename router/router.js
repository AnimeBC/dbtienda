const {Router}=require("express")
const rutas=Router("/");
const control=require("../controllers/controllers.js")
const cors=require("cors")
/**/
rutas.get("/",control.inicio)

/* */

module.exports=rutas;