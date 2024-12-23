const express = require("express");
const router = express.Router();

//Definición de las variables exportadas por el controlador---------------------->
const {
  selectUsers,
  selectDocument,
  selectRol,
  selectAllRole,
  selectGender,
  selectUser,
  selectTeam,
  selectEmployee,
  selectOneEmpl,
  createUsers,
  createEmployee,
  updateUsers,
  updateEmployees,
  updateState,
  selectHistory,
  promedioAssist,
  meanOneMonth,
  selectDays,
  selectClient,
  selectImgUser,
  profileUser,
  selectVerifyImg,
  selectImgEmp,
  deleteImgProfile,
  deleteImgEmp,
  deleteUser,
  updateProfile,
  selectPasswordProfile,
  updatePassword,
  selectUsersPlan,
  selectOldUsersFirstPart,
  selectNewUsers,
  selectOldUsersSecondtPart,
  selectInfoGeneralUser,
  selectGenderUser,
  registeredAssist,
  confirmAssist,
  selectNumberDays,
  selectDataUserDateInitAndFinish,
  selectAllClient,
  searchSuscription,
  updateStateClient,
  selectPlanSuscription,
  selectTypeValoracion,
  createNewUser,
  searchPerfilUser,
  validateDateFin,
  updatePlanUserm,
  updateTypeAssessmentUser,
  updateDatePerfil,
  updateTimePago,
  searchEmailUser,
  searchDateUserToResetPassword,
  resetPassword,
  selecUserFromRol,
  searchOnePersonalTitle,
  searchOnePersonalInfo,
} = require("../controller/users.controller");

//Definición de las rutas-------------------------------------------------------->
router.post("/selectUsers", selectUsers);
router.post("/selectTeam", selectTeam);
router.post("/selectEmployee", selectEmployee);
router.get("/selectDocument", selectDocument);
router.get("/selectRol", selectRol);
router.get("/selectAllRole", selectAllRole);
router.get("/selectGender", selectGender);

router.post("/selectUser", selectUser);
router.post("/createUsers", createUsers);
router.post("/createEmployee", createEmployee);

router.post("/updateUsers", updateUsers);
router.post("/updateEmployees", updateEmployees);

router.put("/updateState", updateState);

router.post("/selectHistory", selectHistory);

router.post("/selectMean", promedioAssist);

router.post("/meanOneMonth", meanOneMonth);

router.post("/selectDays", selectDays);

router.get("/selectClient", selectClient);

router.post("/selectImgUser", selectImgUser);

router.post("/profileUser", profileUser);
router.post("/selectVerifyImg", selectVerifyImg);
router.post("/selectImgEmp", selectImgEmp);

router.post("/deleteImgProfile", deleteImgProfile);
router.post("/deleteImgEmp", deleteImgEmp);
router.delete("/deleteUser", deleteUser);
router.post("/updateProfile", updateProfile);
router.post("/selectPasswordProfile", selectPasswordProfile);
router.post("/updatePassword", updatePassword);

router.get("/selectUsersPlan", selectUsersPlan);

router.get("/selectNewUsers", selectNewUsers);
router.get("/selectOldUsersFirstPart", selectOldUsersFirstPart);
router.get("/selectOldUsersSecondtPart", selectOldUsersSecondtPart);
router.post("/selectInfoGeneralUser", selectInfoGeneralUser);
router.post("/selectGenderUser", selectGenderUser);

router.post("/registeredAssist", registeredAssist);
router.post("/confirmAssist", confirmAssist);
router.post("/selectNumberDays", selectNumberDays);
router.post(
  "/selectDataUserDateInitAndFinish",
  selectDataUserDateInitAndFinish
);

router.get("/selectAllClient", selectAllClient);
router.post("/searchSuscription", searchSuscription);
router.post("/updateStateClient", updateStateClient);
router.get("/selectPlanSuscription", selectPlanSuscription);
router.get("/selectTypeValoracion", selectTypeValoracion);
router.post("/createNewUser", createNewUser);
router.post("/searchPerfilUser", searchPerfilUser);
router.post("/validateDateFin", validateDateFin);
router.post("/updatePlanUserm", updatePlanUserm);
router.post("/updateTypeAssessmentUser", updateTypeAssessmentUser);
router.post("/updateDatePerfil", updateDatePerfil);
router.post("/updateTimePago", updateTimePago);

router.post("/searchEmailUser", searchEmailUser);

router.post("/searchDateUserToResetPassword", searchDateUserToResetPassword);

router.post("/resetPassword", resetPassword);

router.post("/selecUserFromRol", selecUserFromRol);
router.post("/searchOnePersonalInfo", searchOnePersonalInfo);
router.post("/searchOnePersonalTitle", searchOnePersonalTitle);

//Profile User----------------------------------------------------------->

const {Pool} = require("pg");
const multer = require("multer");
const Cryptr = require("cryptr");
//Conexión con la base de datos

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "gimnasio",
  port: 5432,
});

//Metodos-------------------------
const cryptr = new Cryptr("WmZq4t7w9z$C&FJ@NcRfUjXn2r5u8x/");

var storage = multer.diskStorage({
  filename: (req, file, callBack) => {
    callBack(null, file.fileRaw + "-" + Date.now() + ".png");
  },
});

var upload = multer({
  storage: storage, //Definición de variables de encriptación---------------------------------------------->
});

router.post("/createImgProfile", upload.single("file"), async (req, res) => {
  try {
    const fs = require("fs");

    var foto_personal = fs.readFileSync(req.file.path);
    const {id_foto, documento} = req.body;

    const response = await pool.query(
      "insert into foto (id_foto,foto_personal) values ($1,$2)",
      [id_foto, foto_personal]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      const img = id_foto;
      const respuesta = await pool.query(
        "update usuarios set img = $1 where documento =$2",
        [img, documento]
      );

      if (respuesta.error) {
        res.status(401).json(respuesta.error);
      } else {
        res.status(200).json("Imagen creada y usuario actualizado");
      }
    }
  } catch (error) {
    res.status(401).json(error);
  }
});

router.post("/updateImgProfile", upload.single("file"), async (req, res) => {
  try {
    const fs = require("fs");

    const foto_personal = fs.readFileSync(req.file.path);
    const {documento} = req.body;

    // Obtener id_foto correspondiente al documento
    const userResponse = await pool.query(
      "SELECT img FROM usuarios WHERE documento = $1",
      [documento]
    );

    if (userResponse.rows.length === 0) {
      return res.status(404).json("Usuario no encontrado");
    }

    const id_foto = userResponse.rows[0].img;

    // Actualizar la imagen en la tabla foto
    const response = await pool.query(
      "UPDATE foto SET foto_personal = $1 WHERE id_foto = $2",
      [foto_personal, id_foto]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Imagen actualizada con éxito");
    }
  } catch (error) {
    res.status(500).json("Error al actualizar la imagen");
  }
});
router.post("/createImgEmployee", upload.single("file"), async (req, res) => {
  try {
    const fs = require("fs");

    var foto_empleado = fs.readFileSync(req.file.path);
    const {id_foto, documento} = req.body;

    const foto = id_foto;
    const respuesta = await pool.query(
      "update equipo_trabajo set id_foto= $1, foto_empleado = $2 where documento =$3",
      [foto, foto_empleado, documento]
    );

    if (respuesta.error) {
      res.status(401).json(respuesta.error);
    } else {
      res.status(200).json("Imagen creada y empleado  actualizado");
    }
  } catch (error) {
    res.status(401).json(error);
  }
});
router.post("/updateEmpAndImage", upload.single("file"), async (req, res) => {
  try {
    const fs = require("fs");

    const foto_empleado = fs.readFileSync(req.file.path);
    const {documento} = req.body;

    // Obtener id_foto correspondiente al documento
    const userResponse = await pool.query(
      "SELECT id_foto FROM equipo_trabajo WHERE documento = $1",
      [documento]
    );
    console.log("mirame aqui perro setenta");
    if (userResponse.rows.length === 0) {
      return res.status(404).json("Empleado no encontrado");
    }

    const id_foto = userResponse.rows[0].id_foto;

    // Actualizar la imagen en la tabla foto
    const response = await pool.query(
      "UPDATE equipo_trabajo SET foto_empleado = $1 WHERE id_foto = $2",
      [foto_empleado, id_foto]
    );

    if (response.error) {
      res.status(401).json(response.error);
      console.log("mirame aqui perro setenta 2");
    } else {
      res.status(200).json("Imagen actualizada con éxito");
    }
  } catch (error) {
    res.status(500).json("Error al actualizar la imagen");
  }
});

router.delete("/deleteUser/:documento", async (req, res) => {
  try {
    const {documento} = req.params;
    console.log("Documento recibido:", documento);
    await pool.query("BEGIN"); // Inicia la transacción

    const deleteQuery = `
      WITH deleted_pagos AS (
        DELETE FROM pago WHERE documento_usuarios_pago = $1
      ),
      deleted_planes AS (
        DELETE FROM plan_entre_usuario WHERE documento_entre = $1
      ),
      deleted_telefonos AS (
        DELETE FROM telefono WHERE documento_usuario = $1
      ),
      deleted_tipos AS (
        DELETE FROM tipo_usuario WHERE documento_tipo = $1
      ),
      deleted_valoracion_basic AS (
        DELETE FROM valoracion_basica WHERE documento_valoracion = $1
      ),
       deleted_valoracion_av AS (
        DELETE FROM valoracion_avanzada WHERE documento_valoracion = $1
      ),
      deleted_plan_nutricional AS (
        DELETE FROM plan_nutricional_usuarios WHERE documento_plan = $1
      ),
       deleted_educacion AS (
        DELETE FROM educacion_usuarios WHERE documento_usuarios_titulo = $1
      )
      DELETE FROM usuarios WHERE documento = $1;
    `;

    await pool.query(deleteQuery, [documento]);

    await pool.query("COMMIT"); // Finaliza la transacción

    res.status(200).json("Usuario eliminado con éxito");
  } catch (error) {
    await pool.query("ROLLBACK"); // Revierte la transacción en caso de error
    res.status(401).json(error.details);
  }
});

//----------------------------------------------------------------------->

//Exportar las variables--------------------------------------------------------->
module.exports = router;