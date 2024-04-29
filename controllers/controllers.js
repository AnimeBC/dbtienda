const db = require('../sql_table/db')
const fs = require('fs') // Asegúrate de usar las promesas de FS.
const path = require('path') // Asegúrate de que esta línea está presente
const imagenesDir = path.join(__dirname, '../imagenes')
if (!fs.existsSync(imagenesDir)) {
  fs.mkdirSync(imagenesDir, { recursive: true })
}
exports.inicio = async (req, res) => {
  const datos = await db.query('select * from planMovil_IliFla')
  const listaTablas = datos.rows
  try {
    if (req.cookies.nombre) {
      res.redirect(302, '/home')
    } else {
      res.render('inicio/home', {
        Earriba: 'home.css',
        Datos: listaTablas,
        Econtenido: 'home.css',
        Eizquierda: 'home.css',
        scripts: 'home.js',
        ingresante: 'Login',
        imagen: 'uno.jpg',
      })
    }
  } catch (error) {
    console.log('error en ' + error)
  }
}
exports.registrar_planIlimitado = async (req, res) => {
  console.log('si entre')
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
      gbpromocionacumulables,
    } = req.body
    // Consulta para insertar datos
    const result = await db.query(
      `INSERT INTO planmovil_ilifla (Tipo_Plan, VPromocion, Tiempo_Promocion_Descuento, Tiempo_Promocion_Gb, Descuento, Llamadas_Ilimitadas, Internet_Ilimitado, Tipo_Chip, Bono_Tiktok, Precio_Base, Precio_Promocional, Gb_Acumulables, Gb_Spotify, Gb_TV360,Gb_promocion_acumulables) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15) RETURNING Id`,
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
        gbpromocionacumulables,
      ]
    )
    let imageUrl = null
    const planId = result.rows[0].id
    if (req.file) {
      const originalPath = req.file.path
      const newName = `${planId}-${tipoPlan}${path.extname(
        req.file.originalname
      )}`
      const newPath = path.join(imagenesDir, newName)
      await fs.promises.rename(originalPath, newPath)
      imageUrl = `/imagenes/${newName}`
      // Actualiza la base de datos para incluir la URL de la imagen
      await db.query(`UPDATE planmovil_ilifla SET Imagen = $1 WHERE Id = $2`, [
        imageUrl,
        planId,
      ])
    }
    res.redirect('/')
  } catch (err) {
    console.error('Error al registrar el plan:', err.message)
    res.status(500).send('Error al procesar la solicitud.')
  }
}
exports.eliminar_planilimitado = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({ error: 'El ID es necesario para la eliminación.' });
  }
  
  try {
    // Primero, obtenemos la URL de la imagen del registro a eliminar
    const plan = await db.query('SELECT Imagen FROM planmovil_ilifla WHERE id = $1', [id]);
    if (plan.rows.length === 0) {
      return res.status(404).json({ message: 'No se encontró el plan con el ID proporcionado.' });
    }

    // Intentamos eliminar el archivo de imagen si existe
    const imageUrl = plan.rows[0].Imagen;
    if (imageUrl) {
      const imagePath = path.join(__dirname, '../public', imageUrl); // Ajusta esta ruta si es necesario
      if (fs.existsSync(imagePath)) {
        await fs.promises.unlink(imagePath);
      }
    }

    // Ahora eliminamos el registro de la base de datos
    const result = await db.query('DELETE FROM planmovil_ilifla WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'No se pudo eliminar el plan con el ID proporcionado.' });
    }
    
    res.status(200).json({ message: 'Plan eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar el plan:', error);
    res.status(500).json({ error: 'Error interno al intentar eliminar el plan.' });
  }
}
exports.editar_planilimitado = async (req, res) => {
  try {
    const {
      id,
      tipoPlan,
      vpromocion, // Este valor debe ser 'true' o 'false' como string
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
      gbpromocionacumulables,
    } = req.body
    if (vpromocion === undefined) {
      return res.status(400).send('El valor de vPromocion no puede ser nulo.')
    }

    // Convertir valores booleanos de string a boolean
    const vPromocionBoolean = vpromocion === 'true'
    const llamadasIlimitadasBoolean = llamadasIlimitadas === 'true'
    const internetIlimitadoBoolean = internetIlimitado === 'true'
    const query = `
      UPDATE planmovil_ilifla
      SET
        Tipo_Plan = $1,
        VPromocion = $2,
        Tiempo_Promocion_Descuento = $3,
        Tiempo_Promocion_Gb = $4,
        Descuento = $5,
        Llamadas_Ilimitadas = $6,
        Internet_Ilimitado = $7,
        Tipo_Chip = $8,
        Bono_Tiktok = $9,
        Precio_Base = $10,
        Precio_Promocional = $11,
        Gb_Acumulables = $12,
        Gb_Spotify = $13,
        Gb_TV360 = $14,
        Gb_promocion_acumulables = $16
        WHERE Id = $15
    `
    const values = [
      tipoPlan,
      vPromocionBoolean,
      parseInt(tiempoPromocionDescuento, 10),
      parseInt(tiempoPromocionGb, 10),
      parseInt(descuento, 10),
      llamadasIlimitadasBoolean,
      internetIlimitadoBoolean,
      tipoChip,
      parseInt(bonoTiktok, 10),
      parseFloat(precioBase),
      parseFloat(precioPromocional),
      parseInt(gbAcumulables, 10),
      parseInt(gbSpotify, 10),
      parseInt(gbTV360, 10),
      id,
      parseInt(gbpromocionacumulables, 10),
    ]

    await db.query(query, values)
    return res.status(303).redirect('/')
  } catch (error) {
    console.error('Error al actualizar el plan móvil:', error)
    return res.status(500).send('Error al actualizar el plan móvil')
  }
}
