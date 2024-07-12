const {json} = require("body-parser");
const res = require("express/lib/response");
const {Pool} = require("pg");

const Cryptr = require("cryptr");

//Conexión a la base de datos------------------------------------------------------>

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "gimnasio",
  port: 5432,
});

//Definición de variables de encriptación---------------------------------------------->

const cryptr = new Cryptr("WmZq4t7w9z$C&FJ@NcRfUjXn2r5u8x/");

//Definición de los métodos--------------------------------------------------------->

const createPoll = async (req, res) => {
  console.log("Datos recibidos en createPoll:", req.body); // Log para verificar los datos recibidos

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const responses = req.body;

    for (const response of responses) {
      const {id_pregu, documento_en, respuesta} = response;

      if (!id_pregu || !documento_en || !respuesta) {
        console.log("Datos incompletos:", response);
        await client.query("ROLLBACK");
        return res.status(400).json({error: "Datos incompletos"});
      }

      const existingResponse = await client.query(
        "SELECT * FROM encuesta WHERE id_pregu = $1 AND documento_en = $2",
        [id_pregu, documento_en]
      );

      if (existingResponse.rowCount >= 1) {
        console.log("Actualizando respuesta existente:", {
          id_pregu,
          documento_en,
          respuesta,
        });
        const updateResponse = await client.query(
          "UPDATE encuesta SET respuesta = $1 WHERE id_pregu = $2 AND documento_en = $3",
          [respuesta, id_pregu, documento_en]
        );

        if (updateResponse.error) {
          console.log("Error al actualizar:", updateResponse.error);
          await client.query("ROLLBACK");
          return res.status(500).json(updateResponse.error);
        }
      } else {
        console.log("Insertando nueva respuesta:", {
          id_pregu,
          documento_en,
          respuesta,
        });
        const insertResponse = await client.query(
          "INSERT INTO encuesta (id_pregu, documento_en, respuesta) VALUES ($1, $2, $3)",
          [id_pregu, documento_en, respuesta]
        );

        if (insertResponse.error) {
          console.log("Error al insertar:", insertResponse.error);
          await client.query("ROLLBACK");
          return res.status(500).json(insertResponse.error);
        }
      }
    }

    await client.query("COMMIT");
    res.status(200).json("Respuestas registradas con éxito");
  } catch (error) {
    console.log("Error en el catch:", error);
    await client.query("ROLLBACK");
    res.status(500).json({error: error.message});
  } finally {
    client.release();
  }
};

const selectGenderUserPoll = async (req, res) => {
  try {
    const {documento} = req.body;
    const response = await pool.query(
      "SELECT documento, nombre_tipo_genero FROM usuarios, genero where genero=id_genero and documento= $1",
      [documento]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const validateExercise = async (req, res) => {
  try {
    const {documento_en} = req.body;

    // Consulta para contar las respuestas del usuario en específico
    const response = await pool.query(
      "SELECT COUNT(*) as count FROM encuesta WHERE documento_en = $1",
      [documento_en]
    );

    // Verificar si hubo un error en la consulta
    if (response.error) {
      return res.status(500).json(response.error);
    }

    // Convertir el resultado de la consulta a número entero
    const count = parseInt(response.rows[0].count, 10);

    // Verificar el conteo y devolver el mensaje correspondiente
    if (count === 7) {
      res.status(200).json("Preguntas completas");
    } else {
      res.status(200).json("Faltan preguntas");
    }
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

const updatePassword = async (req, res) => {
  try {
    const {documento, password_new} = req.body;
    const password = cryptr.encrypt(password_new);
    const response = await pool.query(
      "update usuarios set password = $1 where documento = $2",
      [password, documento]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Contraseña actualizada con exito");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

//Métodos para activar contraseña del personal de la organización--------------------------

const updatePasswordPersonal = async (req, res) => {
  try {
    const {documento, password_new} = req.body;
    const password = cryptr.encrypt(password_new);
    const response = await pool.query(
      "update usuarios set password = $1 where documento = $2",
      [password, documento]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Contraseña actualizada con exito");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

//-----------------------------------------------------------------------------------------

//Exportar métodos------------------------------------------------------------------>
module.exports = {
  createPoll,
  selectGenderUserPoll,
  validateExercise,
  updatePassword,

  updatePasswordPersonal,
};
