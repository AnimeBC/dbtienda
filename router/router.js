const {Router}=require("express")
const rutas=Router("/");
const control=require("../controllers/controllers.js")
const cors=require("cors")
/**/
rutas.get("/",control.inicio)
rutas.post("/registrar_panIlimitado",control.registrar_panIlimitado)

/* */

module.exports=rutas;