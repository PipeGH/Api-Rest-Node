const express = require('express');
const router = express.Router();

//importar metodos-------------------------------------------

const { selectPlans, selectOnePlan, createPlans, updatePlan } = require('../controller/plans.controller');

//Definición de las rutas-------------------------------------

router.get('/selectPlans', selectPlans);
router.post('/selectOnePlan', selectOnePlan);
router.post('/createPlans', createPlans);
router.put('/updatePlan', updatePlan);

//Exportar las rutas------------------------------------------
module.exports = router;