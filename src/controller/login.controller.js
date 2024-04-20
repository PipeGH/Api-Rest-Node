const { route } = require('express/lib/router');
const { json } = require('express/lib/response');

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

//Definición de variables que contienen funciones---------------------------------->


const testLogin = (req, res) =>{
    res.json('Login on');
};

const comparePassword = async (req, res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query('select password from usuarios where documento = $1',[documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{

            const password_act = cryptr.decrypt(response.rows[0].password);
            if(password_act == documento){

                res.status(200).json('Si es la primera session');

            }else if(password_act != documento){

                res.status(200).json('No es primera session');

            }    


        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const searchEmailUser = async (req, res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query('select correo from usuarios where documento = $1',[documento]);

        if(response.error){
            res.status(500).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.message);
    }

}




//Exportar variables--------------------------------------------------------------->
module.exports = {

    testLogin,
    comparePassword,
    searchEmailUser

}