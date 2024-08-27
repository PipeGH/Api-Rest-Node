const {Pool} = require("pg");

//Conexión con la base de datos-------------------------------------------------------->

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "gimnasio",
  port: 5432,
});

//Definición de métodos----------------------------------------------------------------->
const selectTraining = async (req, res) => {
  try {
    const {categoria} = req.query;

    let query = `
      SELECT 
        e.id_ejercicios, 
        e.nombre_ejercicios, 
        e.descripcion, 
        e.imagen, 
        e.video, 
        c.nombre_categoria, 
        s.nombre_sub
      FROM 
        ejercicios e
      JOIN 
        sub_categoria s ON e.categoria = s.id_sub
      JOIN 
        categoria_sub cs ON s.id_sub = cs.id_sub_cat
      JOIN 
        categoria c ON cs.id_categoria_cat = c.id_categoria
    `;

    const queryParams = [];

    if (categoria && categoria !== "0") {
      query += ` WHERE c.nombre_categoria = $1`;
      queryParams.push(categoria);
    }

    query += ` ORDER BY e.id_ejercicios ASC`;

    // Realiza la consulta de ejercicios
    const exercisesResponse = await pool.query(query, queryParams);

    res.json({
      exercises: exercisesResponse.rows, // Enviar todos los ejercicios al frontend
    });
  } catch (error) {
    console.error("Error in selectTraining:", error);
    res.status(401).json({message: error.message});
  }
};

const selectCategory = async (req, res) => {
  try {
    const response = await pool.query("select * from categoria");

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const selectSubCategory = async (req, res) => {
  try {
    const {id_categoria} = req.body;
    const response = await pool.query(
      "select id_categoria, id_sub, nombre_sub from sub_categoria, categoria, categoria_sub where id_categoria_cat=id_categoria and id_sub_cat=id_sub and id_categoria = $1",
      [id_categoria]
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

const selectOneTraining = async (req, res) => {
  try {
    const {id_ejercicios} = req.body;
    const response = await pool.query(
      "SELECT id_ejercicios, nombre_ejercicios, descripcion, imagen, video, nombre_categoria,nombre_sub FROM ejercicios, sub_categoria, categoria, categoria_sub where categoria= id_sub and id_categoria_cat=id_categoria and id_sub_cat=id_sub and id_ejercicios = $1",
      [id_ejercicios]
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

const selectOneTrainingUpdate = async (req, res) => {
  try {
    const {id_ejercicios} = req.body;
    const response = await pool.query(
      "SELECT id_ejercicios, nombre_ejercicios, descripcion, imagen, video,id_categoria, id_sub, nombre_categoria,nombre_sub FROM ejercicios, sub_categoria, categoria, categoria_sub where categoria= id_sub and id_categoria_cat=id_categoria and id_sub_cat=id_sub and id_ejercicios = $1",
      [id_ejercicios]
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

const updateTraining = async (req, res) => {
  try {
    const {id_ejercicios, nombre_ejercicios, descripcion, video} = req.body;

    if (video == "") {
      const response = await pool.query(
        "update ejercicios set nombre_ejercicios = $1, descripcion = $2 where id_ejercicios = $3",
        [nombre_ejercicios, descripcion, id_ejercicios]
      );

      if (response.error) {
        res.status(401).json(response.error);
      } else {
        res.status(200).json("Training actualizado con exito");
      }
    } else {
      const response = await pool.query(
        "update ejercicios set nombre_ejercicios = $1, descripcion = $2, video=$3 where id_ejercicios = $4",
        [nombre_ejercicios, descripcion, video, id_ejercicios]
      );

      if (response.error) {
        res.status(401).json(response.error);
      } else {
        res.status(200).json("Training actualizado con exito");
      }
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};
const deleteTraining = async (req, res) => {
  try {
    const {id} = req.params;

    const response = await pool.query(
      "DELETE FROM ejercicios WHERE id_ejercicios = $1",
      [id]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Ejercicio eliminado con éxito");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};
//Exportar métodos---------------------------------------------------------------------->
module.exports = {
  selectTraining,
  selectCategory,
  selectSubCategory,
  selectOneTraining,
  selectOneTrainingUpdate,
  updateTraining,
  deleteTraining,
};
