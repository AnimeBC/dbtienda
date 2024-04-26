const {Router}=require("express")
const rutas=Router("/");
const control=require("../controllers/controllers.js")
const cors=require("cors")
/**/
rutas.get("/",control.inicio)
rutas.post("/registrar_planilimitado",control.registrar_planIlimitado)
rutas.post("/editar_planilimitado",control.editar_planilimitado)
rutas.post("/eliminar_planilimitado",control.eliminar_planilimitado)
/* */

module.exports=rutas;