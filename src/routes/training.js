const express = require("express");
const router = express.Router();

//Importar métodos---------------------------------------------->

const {
  selectTraining,
  selectCategory,
  selectSubCategory,
  selectOneTraining,
  selectOneTrainingUpdate,
  updateTraining,
  deleteTraining,
} = require("../controller/training.controller");

//Definicion de rutas------------------------------------------->

router.get("/selectTraining", selectTraining);
router.get("/selectCategory", selectCategory);
router.post("/selectSubCategory", selectSubCategory);
router.post("/selectOneTraining", selectOneTraining);
router.post("/selectOneTrainingUpdate", selectOneTrainingUpdate);
router.post("/updateTraining", updateTraining);
router.delete("/deleteTraining", deleteTraining);

//Funciones de imagen-------------------------------------------->

const {Pool} = require("pg");
const multer = require("multer");

//Conexión con la base de datos---------------------------------

const pool = new Pool({
  host: "localhost",
  database: "gimnasio",
  user: "postgres",
  port: 5432,
  password: "1234",
});

var storage = multer.diskStorage({
  /*destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },*/
  filename: (req, file, callBack) => {
    callBack(null, file.fileRaw + "-" + Date.now() + ".png");
  },
});

var upload = multer({
  storage: storage,
});

router.post("/createTraining", upload.single("file"), async (req, res) => {
  try {
    const fs = require("fs");
    var imagen = fs.readFileSync(req.file.path);
    const {nombre_ejercicios, descripcion, categoria, video} = req.body;

    const response = await pool.query(
      "insert into ejercicios (nombre_ejercicios, descripcion,imagen,categoria,video) values ($1,$2,$3,$4,$5)",
      [nombre_ejercicios, descripcion, imagen, categoria, video]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Ejercicio creado con exito");
    }
  } catch (error) {
    res.status(401).json(error);
  }
});

router.post("/updateTrainingImg", upload.single("file"), async (req, res) => {
  try {
    const fs = require("fs");
    var imagen = fs.readFileSync(req.file.path);
    const {id_ejercicios, nombre_ejercicios, descripcion, video} = req.body;
    console.log(req.body);

    if (video == "") {
      const response = await pool.query(
        "update ejercicios set nombre_ejercicios = $1, descripcion =$2, imagen = $3 where id_ejercicios = $4",
        [nombre_ejercicios, descripcion, imagen, id_ejercicios]
      );

      if (response.error) {
        res.status(401).json(response.error);
      } else {
        res.status(200).json("Ejercicio actualizado con exito");
      }
    } else {
      const response = await pool.query(
        "update ejercicios set nombre_ejercicios = $1, descripcion =$2, imagen = $3, video =$4 where id_ejercicios = $5",
        [nombre_ejercicios, descripcion, imagen, video, id_ejercicios]
      );

      if (response.error) {
        res.status(401).json(response.error);
      } else {
        res.status(200).json("Ejercicio actualizado con exito");
      }
    }
  } catch (error) {
    res.status(401).json(error);
  }
});
router.delete("/deleteTraining/:id", async (req, res) => {
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
});

//Exportar rutas------------------------------------------------->
module.exports = router;
