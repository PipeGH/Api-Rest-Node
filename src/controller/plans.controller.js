const res = require('express/lib/response');
const { Pool } = require('pg');

//Conexión con la base de datos---------------------------------

const pool = new Pool({
    host: 'localhost',
    database: 'gimnasio',
    user: 'postgres',
    port: 5432,
    password: '1234'
});


//Definición de los métodos-------------------------------------

const selectPlans = async (req, res) => {

    try {
        const response = await pool.query('select * from suscripcion');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const selectOnePlan = async (req, res) => {

    try{
        const { id_suscripcion } = req.body;
        const response = await pool.query('SELECT * FROM suscripcion where id_suscripcion = $1', [id_suscripcion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }


}



const createPlans = async (req, res) => {

    try {
        const { titulo_suscripcion, descripcion, precio,duracion } = req.body;
        const response = await pool.query('insert into suscripcion (titulo_suscripcion, descripcion, precio,duracion) values ($1,$2,$3,$4)',[titulo_suscripcion, descripcion, precio, duracion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Plan registrado con éxito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const updatePlan = async (req, res) => {

    try {
        const { id_suscripcion, titulo_suscripcion, descripcion, precio} = req.body;
        const response = await pool.query('update suscripcion set titulo_suscripcion = $1, descripcion = $2, precio = $3 where id_suscripcion = $4',[ titulo_suscripcion, descripcion, precio, id_suscripcion] );

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Plan actualizado');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


//Exportar variables--------------------------------------------
module.exports = {

    selectPlans,
    selectOnePlan,
    createPlans,
    updatePlan


}