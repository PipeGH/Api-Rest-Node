const { json } = require('body-parser');
const res = require('express/lib/response');
const { Pool } = require('pg');

const Cryptr = require('cryptr');

//Conexión a la base de datos------------------------------------------------------>

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'gimnasio',
    port: 5432
});

//Definición de variables de encriptación---------------------------------------------->

const cryptr = new Cryptr('WmZq4t7w9z$C&FJ@NcRfUjXn2r5u8x/');

//Definición de los métodos--------------------------------------------------------->

const createPoll = async (req, res) => {

    try {
        const { id_pregu, documento_en, respuesta, observacion } = req.body;
        
        const response = await pool.query('select * from encuesta where id_pregu = $1 and documento_en = $2',[id_pregu,documento_en]);

        if(response.rowCount == 0){

            if(observacion == ''){

                const response = await pool.query('insert into encuesta (id_pregu, documento_en, respuesta) values ($1,$2,$3)',[id_pregu, documento_en, respuesta]);
    
                if(response.error){
                    res.status(401).json(response.error);
                }else{
                    res.status(200).json('Respuesta registrada con exito');
                }
    
            }else{
    
                const response = await pool.query('insert into encuesta (id_pregu, documento_en, respuesta, observacion) values ($1,$2,$3,$4)',[id_pregu, documento_en, respuesta, observacion]);
    
                if(response.error){
                    res.status(401).json(response.error);
                }else{
                    res.status(200).json('Respuesta registrada con exito');
                }
    
            }

        }else if(response.rowCount >= 1){

            if(observacion == ''){

                const response = await pool.query('update encuesta set respuesta = $1 where id_pregu = $2 and documento_en = $3',[respuesta,id_pregu, documento_en]);
    
                if(response.error){
                    res.status(401).json(response.error);
                }else{
                    res.status(200).json('Respuesta actualizada con exito');
                }
    
            }else{
    
                const response = await pool.query('update encuesta set respuesta = $1, observacion = $2 where id_pregu = $3 and documento_en = $4',[respuesta, observacion, id_pregu, documento_en]);
    
                if(response.error){
                    res.status(401).json(response.error);
                }else{
                    res.status(200).json('Respuesta actualizada con exito');
                }
    
            }


        }



    } catch (error) {
        res.status(401).json(error.details
            );
    }

}

const selectGenderUserPoll = async (req, res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query('SELECT documento, nombre_tipo_genero FROM usuarios, genero where genero=id_genero and documento= $1',[documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const validateHistory = async (req, res) => {

    try {
        const { documento_en, genero } = req.body;
        const response = await pool.query('select * from encuesta where documento_en = $1',[documento_en]);

        if(response.error){
            res.status(401).json(response.error);
        }else{

            if(response.rowCount < 6){
                res.json('Faltan preguntas');
            }else if(response.rowCount >= 6){

                if(genero == 'Masculino'){
                    res.json('Completo');
                }else if(genero == 'Femenino'){
                    res.json('Completo');
                }

            }

        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const validateExams = async (req, res) => {

    try {
        const { documento_en, genero } = req.body;
        const response = await pool.query('select * from encuesta where documento_en = $1',[documento_en]);

        if(response.error){
            res.status(401).json(response.error);
        }else{

            if(genero == 'Masculino'){

                if(response.rowCount < 15){
                    res.status(200).json('Faltan preguntas');
                }else if(response.rowCount >= 15){
                    res.status(200).json('Preguntas completas');
                }

            }else if (genero == 'Femenino'){

                if(response.rowCount < 17){
                    res.status(200).json('Faltan preguntas');
                }else if(response.rowCount >= 17){
                    res.status(200).json('Preguntas completas');
                }

            }

        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const validateExercise = async (req, res) => {

    try {
        const { documento_en, genero } = req.body;
        const response = await pool.query('select * from encuesta where documento_en = $1',[documento_en]);

        if(response.error){
            res.status(401).json(response.error);
        }else{

            if(genero == 'Masculino'){

                if(response.rowCount < 16){
                    res.status(200).json('Faltan preguntas');
                }else if(response.rowCount >= 16){

                    if(response.rowCount == 16){
                        res.status(200).json('Preguntas completas');
                    }else if(response.rowCount > 16 && response.rowCount < 20){
                        res.status(200).json('Faltan preguntas');
                    }else if(response.rowCount >= 20){
                        res.status(200).json('Preguntas completas');
                    }
                    
                }

            }else if(genero == 'Femenino'){

                if(response.rowCount < 18){
                    res.status(200).json('Faltan preguntas');
                }else if(response.rowCount >= 18){

                    if(response.rowCount == 18){
                        res.status(200).json('Preguntas completas');
                    }else if(response.rowCount > 18 && response.rowCount < 22){
                        res.status(200).json('Faltan preguntas');
                    }else if(response.rowCount >= 22){
                        res.status(200).json('Preguntas completas');
                    }

                    
                }


            }


        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const updatePassword = async (req, res) => {

    try {
        const { documento, password_new } = req.body;
        const password = cryptr.encrypt(password_new);
        const response = await pool.query('update usuarios set password = $1 where documento = $2',[password,documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Contraseña actualizada con exito');
        }
        
    } catch (error) {
        res.status(401).json(error.details);
    }

}




//Métodos para activar contraseña del personal de la organización--------------------------

const updatePasswordPersonal = async (req, res) => {

    try {
        const { documento, password_new } = req.body;
        const password = cryptr.encrypt(password_new);
        const response = await pool.query('update usuarios set password = $1 where documento = $2',[password,documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Contraseña actualizada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

//-----------------------------------------------------------------------------------------


//Exportar métodos------------------------------------------------------------------>
module.exports = {

    createPoll,
    selectGenderUserPoll,
    validateHistory,
    validateExams,
    validateExercise,
    updatePassword,







    updatePasswordPersonal

}