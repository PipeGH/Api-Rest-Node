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
  createUsers,
  updateUsers,
  updateState,
  selectHistory,
  promedioAssist,
  meanOneMonth,
  selectDays,
  selectClient,
  selectImgUser,
  profileUser,
  selectVerifyImg,
  deleteImgProfile,
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
router.get("/selectDocument", selectDocument);
router.get("/selectRol", selectRol);
router.get("/selectAllRole", selectAllRole);
router.get("/selectGender", selectGender);

router.post("/selectUser", selectUser);
router.post("/createUsers", createUsers);

router.post("/updateUsers", updateUsers);

router.put("/updateState", updateState);

router.post("/selectHistory", selectHistory);

router.post("/selectMean", promedioAssist);

router.post("/meanOneMonth", meanOneMonth);

router.post("/selectDays", selectDays);

router.get("/selectClient", selectClient);

router.post("/selectImgUser", selectImgUser);

router.post("/profileUser", profileUser);
router.post("/selectVerifyImg", selectVerifyImg);
router.post("/deleteImgProfile", deleteImgProfile);
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
  database: "gimnasio",
  user: "postgres",
  port: 5432,
  password: "1234",
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

    var foto_personal = fs.readFileSync(req.file.path);
    const {id_foto} = req.body;

    const response = await pool.query(
      "update foto set foto_personal = $1 where id_foto = $2",
      [foto_personal, id_foto]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Imagen actualizada con éxito");
    }
  } catch (error) {
    res.status(401).json(error);
  }
});

//----------------------------------------------------------------------->

//Exportar las variables--------------------------------------------------------->
module.exports = router;
