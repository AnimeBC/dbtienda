//const cuerpo = require('../DB/cuerpo');
const db = require("../sql_table/db");
exports.inicio = async (req, res) => {
  const datos = await db.query("select * from planMovil_IliFla");
  const listaTablas=datos.rows;
  try {
    if (req.cookies.nombre) {
      res.redirect(302, "/home");
    } else {
      res.render("inicio/home", {
        Earriba: "home.css",
        Datos: listaTablas,
        Econtenido: "home.css",
        Eizquierda: "home.css",
        scripts: "home.js",
        ingresante: "Login",
        imagen: "uno.jpg",
      });
    }
  } catch (error) {
    console.log("error en " + error);
  }
};
exports.registrar_panIlimitado = async (req, res) => {
  try {
    const {
      tipoPlan,
      vpromocion,
      tiempoPromocionDescuento,
      tiempoPromocionGb,
      descuento,
      llamadasIlimitadas,
      internetIlimitado,
      tipoChip,
      bonoTiktok,
      precioBase,
      precioPromocional,
      gbAcumulables,
      gbSpotify,
      gbTV360,
    } = req.body;

    // Consulta para insertar datos
    const result = await db.query(
      `INSERT INTO planmovil_ilifla (Tipo_Plan, VPromocion, Tiempo_Promocion_Descuento, Tiempo_Promocion_Gb, Descuento, Llamadas_Ilimitadas, Internet_Ilimitado, Tipo_Chip, Bono_Tiktok, Precio_Base, Precio_Promocional, Gb_Acumulables, Gb_Spotify, Gb_TV360) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING Id`,
      [
        tipoPlan,
        vpromocion,
        tiempoPromocionDescuento,
        tiempoPromocionGb,
        descuento,
        llamadasIlimitadas,
        internetIlimitado,
        tipoChip,
        bonoTiktok,
        precioBase,
        precioPromocional,
        gbAcumulables,
        gbSpotify,
        gbTV360,
      ]
    );

    console.log(result.rows[0]); // Muestra el ID del plan insertado
    return res.status(300).redirect("/")
  } catch (err) {
    console.error("Error al registrar el plan:", err.message);
    res.status(500).send("Error al procesar la solicitud.");
  }
};
