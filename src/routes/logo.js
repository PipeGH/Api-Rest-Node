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



router.post('/updateLogoImg', upload.single('file'),  async (req, res) => {
    //console.log(req.file);

    const fs = require('fs');
    //const logo = fs.readFileSync(req.file.path, {encoding: 'base64'});

    var logo = fs.readFileSync(req.file.path);
    //console.log(logo.toString('base64'));
    
    //console.log(Buffer.from(logo, 'base64').toString('ascii'));
try {
    
    const response = await pool.query('update general_empresa set logo = $1 where id_generales_empresa = 1', [logo]);
    
    if(response.error){
        res.status(401).json(response.error);
    }else{
        res.status(200).json('Imagen actualizada con éxito');        
    }

} catch (error) {
    res.status(401).json(error);
}

});






module.exports = router;