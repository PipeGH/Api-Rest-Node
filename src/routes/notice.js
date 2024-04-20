const express = require('express');
const router = express.Router();

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


//Importar las funciones-----------------------------------------------

const { selectNotices, updateNotice, deleteDate, selectOneNotice, createDate,selectFromDelete, deleteNotice, SelectViewNotice, selectViewOneNotice, selectPreviewNotice, selectDownNotice, selectNoticeTree, viewCortNotice } = require('../controller/notice.controller');
const { route } = require('express/lib/application');

//Definición de las rutas----------------------------------------------

router.get('/selectNotice', selectNotices);
router.post('/selectOneNotice', selectOneNotice);
router.get('/SelectViewNotice', SelectViewNotice);
router.post('/selectViewOneNotice', selectViewOneNotice);
router.post('/selectPreviewNotice', selectPreviewNotice);

router.get('/selectDownNotice', selectDownNotice);

router.post('/updateNotice', updateNotice);

router.post('/deleteDate', deleteDate);
router.post('/deleteNotice', deleteNotice);

router.post('/createDate', createDate);
router.post('/selectFromDelete', selectFromDelete);


router.get('/viewCortNotice', viewCortNotice);


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


router.post('/createNotice', upload.single('file'), async (req, res) => {

    try {
        const fs = require('fs');

        var multimedia = fs.readFileSync(req.file.path);
        const {id_informacion,titulo, descripcion, autor } = req.body;
        const fecha = id_informacion;

        const response = await pool.query('insert into informacion (titulo,descripcion,autor,multimedia,fecha) values ($1,$2,$3,$4,$5)',[titulo, descripcion, autor, multimedia, fecha]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Noticia registrada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

});

//Update ImgNotice----------------------------------------------------


router.post('/updateNoticeImg', upload.single('file'), async (req, res) => {

    try {
        const fs = require('fs');

        var multimedia = fs.readFileSync(req.file.path);
        const { id_informacion, titulo, descripcion } = req.body
        const response = await pool.query('update informacion set titulo=$1, descripcion=$2, multimedia=$3 where id_informacion = $4',[ titulo, descripcion, multimedia, id_informacion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Noticia actualizada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

});


//Exportar las rutas---------------------------------------------------
module.exports = router;