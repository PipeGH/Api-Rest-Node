const { Pool } = require('pg');
const multer = require('multer');
const { response } = require('express');

//Conexión con la base de datos---------------------------------

const pool = new Pool({
    host: 'localhost',
    database: 'gimnasio',
    user: 'postgres',
    port: 5432,
    password: '1234'
});


//Definición de las funciones------------------------------------

const selectMision = async (req, res) => {

    try {
        const response = await pool.query('select mision from general_empresa');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }
    } catch (error) {
        res.status(401).json(error.details);
    }

}

const updateMision = async (req, res) => {

    try {
        const id_generales_empresa = 1;
        const { mision } = req.body;
        const response = await pool.query('update general_empresa set mision = $1 where id_generales_empresa = $2',[mision,id_generales_empresa]);
        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Información actualizada con éxito');
        }
    } catch (error) {
        res.status(401).json(error);
    }

}

const selectVision = async (req, res) => {

    try {
        const response = await pool.query('select vision from general_empresa');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }
    } catch (error) {
        res.status(401).json(error.details);
    }

}

const updateVision = async (req, res) => {

    try {
        const id_generales_empresa = 1;
        const { vision } = req.body;
        const response = await pool.query('update general_empresa set vision = $1 where id_generales_empresa = $2',[vision,id_generales_empresa]);
        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Información actualizada con éxito');
        }
    } catch (error) {
        res.status(401).json(error);
    }

}


const selectObjetivo = async (req, res) => {

    try {
        const response = await pool.query('select objetivos from general_empresa');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }
    } catch (error) {
        res.status(401).json(error.details);
    }

}

const updateObjetivo = async (req, res) => {

    try {
        const id_generales_empresa = 1;
        const { objetivos } = req.body;
        const response = await pool.query('update general_empresa set objetivos = $1 where id_generales_empresa = $2',[objetivos,id_generales_empresa]);
        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Información actualizada con éxito');
        }
    } catch (error) {
        res.status(401).json(error);
    }

}



const selectValues = async (req, res) => {

    try {
        const response = await pool.query('select valores from general_empresa');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }
    } catch (error) {
        res.status(401).json(error.details);
    }

}

const updateValues = async (req, res) => {

    try {
        const id_generales_empresa = 1;
        const { valores } = req.body;
        const response = await pool.query('update general_empresa set valores = $1 where id_generales_empresa = $2',[valores,id_generales_empresa]);
        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Información actualizada con éxito');
        }
    } catch (error) {
        res.status(401).json(error);
    }

}

const selectLogoImg = async (req, res) => {

    
        const response = await pool.query('select logo from general_empresa where id_generales_empresa = 1');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            
            res.status(200).json(response.rows);
        }
    

}






//Exportar las variables-----------------------------------------
module.exports = {

    selectMision,
    updateMision,
    selectVision,
    updateVision,
    selectObjetivo,
    updateObjetivo,
    selectValues,
    updateValues,
    selectLogoImg

}