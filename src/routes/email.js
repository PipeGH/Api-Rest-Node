const express = require('express');
const router = express.Router();

//Importar los métodos----------------------------------------------------------------------

const { sendEmailWelcome, sendEmailChangePassword, sendEmailAssingPlanNutrition, sendEmailRegisteredAssessment, sendEmailUpdateAssessment, sendEmailAssingPlanTraining, sendEmailCodeUpdatePassword, sendEmailActivatedAcount, sendEmailAssingQuote, sendEmailUpdateQuote, sendEmailUpdatePlans, sendEmailUpdateTypeAssessment, sendEmailUpdateInfoUser, sendEmailUpdateTimePago, sendEmailUpdateStateActived, sendEmailUpdateStateBlocked, sendEmailResetPassword, sendEmailContact, sendEmailBuzon } = require('../controller/email.controller');

//Definir las rutas-------------------------------------------------------------------------

router.post('/sendEmailWelcome', sendEmailWelcome);
router.post('/sendEmailChangePassword', sendEmailChangePassword);
router.post('/sendEmailAssingPlanNutrition', sendEmailAssingPlanNutrition);
router.post('/sendEmailRegisteredAssessment', sendEmailRegisteredAssessment);
router.post('/sendEmailUpdateAssessment', sendEmailUpdateAssessment);
router.post('/sendEmailAssingPlanTraining', sendEmailAssingPlanTraining);
router.post('/sendEmailCodeUpdatePassword', sendEmailCodeUpdatePassword);
router.post('/sendEmailActivatedAcount', sendEmailActivatedAcount);
router.post('/sendEmailAssingQuote', sendEmailAssingQuote);
router.post('/sendEmailUpdateQuote', sendEmailUpdateQuote);
router.post('/sendEmailUpdatePlans', sendEmailUpdatePlans);
router.post('/sendEmailUpdateTypeAssessment', sendEmailUpdateTypeAssessment);
router.post('/sendEmailUpdateInfoUser', sendEmailUpdateInfoUser);
router.post('/sendEmailUpdateTimePago', sendEmailUpdateTimePago);
router.post('/sendEmailUpdateStateActived', sendEmailUpdateStateActived);
router.post('/sendEmailUpdateStateBlocked', sendEmailUpdateStateBlocked);
router.post('/sendEmailResetPassword', sendEmailResetPassword);

router.post('/sendEmailContact', sendEmailContact);
router.post('/sendEmailBuzon', sendEmailBuzon);

//Exportar las rutas------------------------------------------------------------------------
module.exports = router;