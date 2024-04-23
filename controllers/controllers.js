//const cuerpo = require('../DB/cuerpo');
const db = require("../sql_table/db")
exports.inicio = async (req, res) => {
  try {
    if(req.cookies.nombre){
      res.redirect(302,"/home") 
     }else{
        res.render('inicio/home', {
            Earriba: 'home.css',
            Econtenido: "home.css",
            Eizquierda: "home.css",
            scripts: 'home.js',
            ingresante: "Login",
            imagen: 'uno.jpg',
          });
     }
  } catch (error) {
    console.log('error en ' + error);
  }
};