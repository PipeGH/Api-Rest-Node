const express = require('express');
const router = express.Router();

//Importar métodos-------------------------------------------------------

const { selectTraining, insertTraining, deleteTraining, cancelChallenges, selectAllChallenges, updateStateChallenges, selectClientRegistered, selectClientNoRegistered, registeredClientToChallenges, searchOneUser, searchDataChallenges, selectState, updateChallengesNoImg, selectDataFromChallenges, selectTrainingFromChallenges, selectStateChallengesUser, selectTrainingChallenges, selectOneTrainingChallenges, registeredClientChallenges, validateUserAndChallenges } = require('../controller/challenges.controller');

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

//Rutas----------------------------------------------------------


var storage = multer.diskStorage({
    /*destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },*/
    filename: (req, file, callBack) => {
        callBack(null, file.fileRaw + '-' + Date.now() + ".png");
    }
})
 
var upload = multer({
    storage: storage
});



router.post('/createChallenges', upload.single('file'),  async (req, res) => {
    
    const fs = require('fs');
    var imagen = fs.readFileSync(req.file.path);

try {
    
    const { id_retos, nombre_reto, descripcion, fecha, hora } = req.body;
    console.log(req.body);
    const state = 1;
    const response = await pool.query('insert into retos (id_retos, nombre_reto, descripcion, imagen, fecha, state, hora) values ($1,$2,$3,$4,$5,$6,$7)',[id_retos, nombre_reto, descripcion, imagen, fecha, state, hora]);
    
    if(response.error){
        res.status(401).json(response.error);
    }else{
        res.status(200).json('Reto creado con exito');        
    }

} catch (error) {
    res.status(401).json(error.details);
}

});



router.post('/updateChallengesImg', upload.single('file'),  async (req, res) => {
    
    const fs = require('fs');
    var imagen = fs.readFileSync(req.file.path);

try {
    
    const { id_retos, nombre_reto, descripcion, fecha, state ,hora } = req.body;
    const response = await pool.query('update retos set nombre_reto = $1, descripcion = $2, imagen = $3, fecha = $4, state = $5, hora = $6  where id_retos = $7',[nombre_reto, descripcion, imagen, fecha, state, hora,id_retos]);
    
    if(response.error){
        res.status(401).json(response.error);
    }else{
        res.status(200).json('Reto actualizado con exito');        
    }

} catch (error) {
    res.status(401).json(error.details);
}

});



router.post('/selectTraining', selectTraining);
router.post('/insertTraining', insertTraining);
router.post('/deleteTraining', deleteTraining);
router.post('/cancelChallenges', cancelChallenges);
router.get('/selectAllChallenges', selectAllChallenges);
router.post('/updateStateChallenges', updateStateChallenges);
router.post('/selectClientRegistered', selectClientRegistered);
router.post('/selectClientNoRegistered', selectClientNoRegistered);
router.post('/registeredClientToChallenges', registeredClientToChallenges);
router.post('/searchOneUser', searchOneUser);
router.post('/searchDataChallenges', searchDataChallenges);
router.get('/selectState', selectState);
router.post('/updateChallengesNoImg', updateChallengesNoImg);
router.post('/selectDataFromChallenges', selectDataFromChallenges);
router.post('/selectTrainingFromChallenges', selectTrainingFromChallenges);





router.get('/selectStateChallengesUser', selectStateChallengesUser);
router.post('/selectTrainingChallenges', selectTrainingChallenges);
router.post('/selectOneTrainingChallenges',selectOneTrainingChallenges);
router.post('/registeredClientChallenges', registeredClientChallenges);
router.post('/validateUserAndChallenges', validateUserAndChallenges);


//Exportar las rutas-----------------------------------------------------
module.exports = router;