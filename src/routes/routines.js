const express = require('express');
const router = express.Router();

//Importar los métodos-----------------------------------------------------------

const { createRoutine, selectDay, selectSeries, selectRepetitions, selectTipoEjecucion, createTraining, deleteTraining, selectTrainingPlan, finishRoutine, cancellRoutine, cancellRoutinePlan, selectRoutines, seletOneRoutine, updateNameRoutine, cleanTraining, asssingRoutine, createRoutinePersonal, selectTrainingOfUser, validatePlanUser, searchOneTraining, createPlanPersonalUser, cancelRoutinePlanPersonal } = require('../controller/routines.controller');

//Definición de las rutas--------------------------------------------------------

router.post('/createRoutine', createRoutine);
router.get('/selectDay', selectDay);
router.get('/selectSeries', selectSeries);
router.get('/selectRepetitions', selectRepetitions);
router.get('/selectTipoEjecucion', selectTipoEjecucion);
router.post('/createTraining', createTraining);
router.post('/deleteTraining', deleteTraining);
router.post('/selectTrainingPlan', selectTrainingPlan);
router.post('/finishRoutine', finishRoutine);
router.post('/cancellRoutine', cancellRoutine);
router.post('/cancellRoutinePlan', cancellRoutinePlan);
router.post('/cancelRoutinePlanPersonal', cancelRoutinePlanPersonal);

router.get('/selectRoutines', selectRoutines);
router.post('/seletOneRoutine', seletOneRoutine);
router.post('/updateNameRoutine', updateNameRoutine);
router.post('/cleanTraining', cleanTraining);



router.post('/asssingRoutine', asssingRoutine);
router.post('/createRoutinePersonal', createRoutinePersonal);






router.post('/selectTrainingOfUser', selectTrainingOfUser);
router.post('/validatePlanUser', validatePlanUser);
router.post('/searchOneTraining', searchOneTraining);

router.post('/createPlanPersonalUser', createPlanPersonalUser);

//Exportar las rutas-------------------------------------------------------------
module.exports = router;