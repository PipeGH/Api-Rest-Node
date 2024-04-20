const express = require('express');
const router = express.Router();

//Importar métodos---------------------------------------------------------->

const { createAlergiaNewUser, createEnfermedadNewUser, createMedicamentosNewUser, createInfoGeneral, updateTipUsers, createMeasures, createAssessmentBasic, createMeasuresBasic, cancellAssessmentBasic, getDocument, deleteMeasures, createGenerales, createMasa, createGrasa, createAssessmentAdvanced, updateGenerales, selectAssessmentPhy, updateMasaCorporal, updateGrasaCorporal, getDocumentAdvanced, deleteAssessmentAdvanced, deleteGenerales, deleteGrasa, deleteMasa, searchAssessmentBasic, searchAssessmentAdvanced, selectAssessmentBasic, updateWeight, selectAssessmentAdvanced, selectGenerales, updategeneralesTwo, selectMasa, selectGrasa, selectMeasures, getHeight, createAssessmentBasicOld, createGeneralesOld, selectMeasuresOfUser, selectImc, selectMeasuresUserAdvanced, selecGeneralesAdvanced, selectEstatura, selectMasaMuscular, selectGrasaCorporalAdvanced, selectQuotes, selectViewQuotes, selectOneQuotes, searchAssessmentExt, searchTypeAssessmentclient, searchStateQuotes, selectAllReservacion, CreateSolicitadAssessment, cancellQuoteAssessment, selectAllQuotesOneUser, selectTypeQuote, selectUserQuotes, assingQuote, selectTimeQuote, createNotificationQuote, selectAllTimeConfirm, updateStateTemp, selectAllState, searchEmailUserAdvanced, searchEmailUserBasic, updateQuoteAssing } = require('../controller/assessment.controller');

//Definición de las rutas--------------------------------------------------->

router.post('/createAlergiaNewUser', createAlergiaNewUser);
router.post('/createEnfermedadNewUser', createEnfermedadNewUser);
router.post('/createMedicamentosNewUser', createMedicamentosNewUser);
router.post('/createInfoGeneral', createInfoGeneral);
router.post('/updateTipUsers', updateTipUsers);
router.post('/createMeasures', createMeasures);
router.post('/createAssessmentBasic', createAssessmentBasic);
router.post('/createMeasuresBasic', createMeasuresBasic);
router.post('/getDocument', getDocument);
router.post('/cancellAssessmentBasic', cancellAssessmentBasic);
router.post('/deleteMeasures', deleteMeasures);


//Create assessment advanced------------------------------------------------------------->
router.post('/createGenerales', createGenerales);
router.post('/createMasa', createMasa);
router.post('/createGrasa', createGrasa);
router.post('/createAssessmentAdvanced', createAssessmentAdvanced);
router.post('/updateGenerales', updateGenerales);
router.get('/selectAssessmentPhy', selectAssessmentPhy);
router.post('/updateMasaCorporal', updateMasaCorporal);
router.post('/updateGrasaCorporal', updateGrasaCorporal);
router.post('/getDocumentAdvanced', getDocumentAdvanced);
router.post('/deleteAssessmentAdvanced', deleteAssessmentAdvanced);
router.post('/deleteGenerales', deleteGenerales);
router.post('/deleteGrasa', deleteGrasa);
router.post('/deleteMasa', deleteMasa);


//Update assessment Basic------------------------------------------------------------------>
router.post('/searchAssessmentBasic', searchAssessmentBasic);
router.post('/selectAssessmentBasic', selectAssessmentBasic);
router.post('/updateWeight', updateWeight);


//Update assessment Advanced--------------------------------------------------------------->
router.post('/searchAssessmentAdvanced', searchAssessmentAdvanced);
router.post('/selectAssessmentAdvanced', selectAssessmentAdvanced);
router.post('/selectGenerales', selectGenerales);
router.post('/updategeneralesTwo', updategeneralesTwo);
router.post('/selectMasa', selectMasa);
router.post('/selectGrasa', selectGrasa);
router.post('/selectMeasures', selectMeasures);
router.post('/getHeight', getHeight);
router.post('/createAssessmentBasicOld', createAssessmentBasicOld);
router.post('/createGeneralesOld', createGeneralesOld);
router.post('/selectEstatura', selectEstatura);


//Dasboard of the assessment the users----------------------------------------------------->

router.post('/selectMeasuresOfUser', selectMeasuresOfUser);
router.post('/selectImc', selectImc);

//Dashboard of the assessment advanced------------------------

router.post('/selectMeasuresUserAdvanced', selectMeasuresUserAdvanced);
router.post('/selecGeneralesAdvanced', selecGeneralesAdvanced);
router.post('/selectMasaMuscular', selectMasaMuscular);
router.post('/selectGrasaCorporalAdvanced', selectGrasaCorporalAdvanced);
router.post('/CreateSolicitadAssessment', CreateSolicitadAssessment);
//-------------------------------------------------------------


//Quotes------------------------------------------------------------------

router.get('/selectQuotes', selectQuotes);
router.post('/selectViewQuotes', selectViewQuotes);
router.post('/selectOneQuotes', selectOneQuotes);
router.get('/selectAllReservacion', selectAllReservacion);

//------------------------------------------------------------------------


//Metodos del cliente----------------------------------------------------------

router.post('/searchTypeAssessmentclient', searchTypeAssessmentclient);
router.post('/searchAssessmentExt', searchAssessmentExt);
router.post('/searchStateQuotes', searchStateQuotes);
router.post('/cancellQuoteAssessment', cancellQuoteAssessment);
router.post('/selectAllQuotesOneUser', selectAllQuotesOneUser);

//-----------------------------------------------------------------------------

//Metodos de recepcion-----------------------------------------------------------

router.get('/selectTypeQuote', selectTypeQuote);
router.get('/selectUserQuotes', selectUserQuotes);
router.post('/assingQuote', assingQuote);
router.post('/selectTimeQuote', selectTimeQuote);
router.post('/createNotificationQuote', createNotificationQuote);
router.post('/selectAllTimeConfirm', selectAllTimeConfirm);
router.post('/updateStateTemp', updateStateTemp);
router.get('/selectAllState', selectAllState);
router.post('/updateQuoteAssing', updateQuoteAssing);

//_------------------------------------------------------------------------------

router.post('/searchEmailUserAdvanced', searchEmailUserAdvanced);
router.post('/searchEmailUserBasic', searchEmailUserBasic);



//Exportar las rutas----------------------------------------------------------------------->
module.exports = router;