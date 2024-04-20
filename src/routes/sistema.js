const express = require('express');
const router = express.Router();

//Importar las variables del controlador-----------------------------------
const { selectMision, updateMision, selectVision, updateVision, selectObjetivo, updateObjetivo, selectValues, updateValues, selectLogoImg } = require('../controller/sistema.controller');

//Definición de las rutas--------------------------------------------------

router.get('/selectMision', selectMision);
router.put('/updateMision', updateMision);

router.get('/selectVision', selectVision);
router.put('/updateVision', updateVision);

router.get('/selectObjetivo', selectObjetivo);
router.put('/updateObjetivo', updateObjetivo);

router.get('/selectValues', selectValues);
router.put('/updateValues', updateValues);

router.get('/selectLogoImg', selectLogoImg);



//Exportar las rutas-------------------------------------------------------
module.exports = router;