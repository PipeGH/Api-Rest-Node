const express = require("express");
const router = express.Router();

//Draclaración de variables-------------------------------------------------------->
const {Pool} = require("pg");
const jwt = require("jsonwebtoken");

const Cryptr = require("cryptr");

//Conexión con la base de datos----------------------------------------------------->

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "gimnasio",
  port: 5432,
});

//Definición de variables de encriptación---------------------------------------------->

const cryptr = new Cryptr("WmZq4t7w9z$C&FJ@NcRfUjXn2r5u8x/");

//Importar variables con las funciones---------------------------------------------->
const {
  testLogin,
  comparePassword,
  searchEmailUser,
} = require("../controller/login.controller");

//Asignaciónd las funciones a las rutas
router.get("/testLogin", testLogin);

router.post("/login", async (req, res) => {
  try {
    const {correo, password} = req.body;
    const response = await pool.query(
      "select password from usuarios where correo = $1",
      [correo]
    );

    if (response.error) {
      res.status(500).json(response.error);
    } else {
      if (response.rowCount == 0) {
        res.status(200).json("Correo incorrecto");
      } else if (response.rowCount >= 1) {
        const password_act = cryptr.decrypt(response.rows[0].password);
        if (password == password_act) {
          const respuesta = await pool.query(
            "select documento, nombres, primer_apellido, segundo_apellido, nombre_rol, estado from usuarios, rol where rol = id_rol and correo = $1",
            [correo]
          );

          if (respuesta.error) {
            res.status(500).json(respuesta.error);
          } else {
            let data = JSON.stringify(respuesta.rows[0]);
            const token = jwt.sign(data, process.env.secretK);
            res.status(200).json({token});
          }
        } else if (password != password_act) {
          res.status(200).json("Contraseña incorrecta");
        }
      }
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
});

router.post("/test", verifyToken, (req, res) => {
  res.json("información secreta");
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).JSON("No autorizado");
  }

  const token = req.headers.authorization.substr(7);

  if (token !== "") {
    const content = jwt.verify(token, process.env.secretK);
    req.data = content;
    next();
  } else {
    res.status(401).json("Token Vacio");
  }
}

router.post("/comparePassword", comparePassword);
router.post("/searchEmailUser", searchEmailUser);

//Exportar las rutas
module.exports = router;
