const express = require("express");
const router = express.Router();
const counterController = require("../controller/counter.controller");

// Ruta para obtener las estadísticas semanales
router.get("/weekly", counterController.getWeeklyRegistrations);
router.get("/today", counterController.getTodayRegistrations);

module.exports = router;
