const express = require("express");
const router = express.Router();

//Importar los métodos--------------------------------------------

const {
  selectNewUsers,
  selectOldUsers,
  selectNutritionGeneral,
  searchOnePlanNutrition,
  assingNutritionForNewUser,
  assingNutritionForOldUser,
  selectNameNutrition,
  selectDateNutrition,
  updateNutrition,
  createPlanNutrition,
  createPlanNutritionPersonal,
  selectAlimento,
  selectIngredientes,
  createAlimento,
  validateBreakfast,
  cancellPocess,
  cancellPocessPersonal,
  assingNutritionOldUser,
  selectRegisteredNutrition,
  selectOneRegisteredNutrition,
  deleteDataNutrition,
  searchNameNutrition,
  selectDataNutritionPersonal,
  selectInfoGeneralUser,
  selectRegisteredAlimentoUsers,
  searchIDNutrition,
  selectEmailUserNutrition,
} = require("../controller/nutrition.controller");

//Definir rutas----------------------------------------------------

router.get("/selectNewUsers", selectNewUsers);
router.get("/selectOldUsers", selectOldUsers);

router.get("/selectNutritionGeneral", selectNutritionGeneral);
router.post("/searchOnePlanNutrition", searchOnePlanNutrition);

router.post("/assingNutritionForNewUser", assingNutritionForNewUser);
router.post("/assingNutritionForOldUser", assingNutritionForOldUser);

router.post("/selectNameNutrition", selectNameNutrition);
router.post("/selectDateNutrition", selectDateNutrition);
router.post("/updateNutrition", updateNutrition);
router.post("/createPlanNutrition", createPlanNutrition);
router.post("/createPlanNutritionPersonal", createPlanNutritionPersonal);
router.get("/selectAlimento", selectAlimento);
router.post("/selectIngredientes", selectIngredientes);
router.post("/createAlimento", createAlimento);
router.post("/validateBreakfast", validateBreakfast);
router.post("/cancellPocess", cancellPocess);
router.post("/cancellPocessPersonal", cancellPocessPersonal);
router.post("/assingNutritionOldUser", assingNutritionOldUser);
router.post("/selectRegisteredNutrition", selectRegisteredNutrition);
router.post("/selectOneRegisteredNutrition", selectOneRegisteredNutrition);
router.post("/updateDataNutrition", deleteDataNutrition);

router.post("/searchNameNutrition", searchNameNutrition);
router.post("/selectDataNutritionPersonal", selectDataNutritionPersonal);
router.post("/selectInfoGeneralUser", selectInfoGeneralUser);
router.post("/selectRegisteredAlimentoUsers", selectRegisteredAlimentoUsers);

router.post("/searchIDNutrition", searchIDNutrition);

router.post("/selectEmailUserNutrition", selectEmailUserNutrition);

//Exportar las rutas-----------------------------------------------
module.exports = router;
