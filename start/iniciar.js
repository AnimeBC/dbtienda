const aplicacion=require("../salida.js")
aplicacion.listen((process.env.PORT||9001),()=>{
    console.log("Iniciado")
})