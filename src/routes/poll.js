const express = require('express');
const router = express.Router();

//Importar métodos------------------------------------------------------>

const { createPoll, selectGenderUserPoll, validateHistory, validateExams, validateExercise, updatePassword, updatePasswordPersonal } = require('../controller/poll.controller');

//Definición de las rutas----------------------------------------------->

router.post('/createPoll', createPoll);
router.post('/selectGenderUserPoll', selectGenderUserPoll);
router.post('/validateHistory', validateHistory);
router.post('/validateExams', validateExams);
router.post('/validateExercise', validateExercise);
router.post('/updatePassword', updatePassword);



router.post('/updatePasswordPersonal', updatePasswordPersonal);


//Métodos para registrar los documentos del personal---------------------------------------

const { Pool } = require('pg');
const multer = require('multer');

//Conexión con la base de datos---------------------------------

const pool = new Pool({
    host: 'localhost',
    database: 'gimnasio',
    user: 'postgres',
    port: 5432,
    password: '1234'
});


var storage = multer.diskStorage({
    filename: (req, file, callBack) => {
        callBack(null, file.fileRaw + '-' + Date.now() + ".png");
    }
})
 
var upload = multer({
    storage: storage
});

router.post('/registerDocumentPerson', upload.single('file'), async (req, res) => {

    try {
    const fs = require('fs');
    var adjunto = fs.readFileSync(req.file.path);

    const { documento_usuarios_titulo, id_educacion, titulo } = req.body;
    const response = await pool.query('insert into educacion (id_educacion, titulo, adjunto) values ($1,$2,$3)',[id_educacion,titulo,adjunto]);

    if(response.error){
        res.status(401).json(response.error);
    }else{
        const id_titulo = id_educacion;
        const response = await pool.query('insert into educacion_usuarios (documento_usuarios_titulo,id_titulo) values ($1,$2)',[documento_usuarios_titulo, id_titulo]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Documento insertado con exito');
        }

    }
        
    } catch (error) {
        res.status(401).json(error.details);
    }

});

//-----------------------------------------------------------------------------------------

//Exportar rutas-------------------------------------------------------->
module.exports = router;