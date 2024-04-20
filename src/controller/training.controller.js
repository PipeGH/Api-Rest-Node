const { Pool } = require('pg');

//Conexión con la base de datos-------------------------------------------------------->

const pool = new Pool({
        host: 'localhost',
        database: 'gimnasio',
        user: 'postgres',
        port: 5432,
        password: '1234'
});

//Definición de métodos----------------------------------------------------------------->

const selectTraining = async (req, res) => {

    try {
        const response = await pool.query('SELECT id_ejercicios, nombre_ejercicios, descripcion, imagen, video, nombre_categoria,nombre_sub FROM ejercicios, sub_categoria, categoria, categoria_sub where categoria= id_sub and id_categoria_cat=id_categoria and id_sub_cat=id_sub');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }


}

const selectCategory = async (req, res) => {

    try {
        const response = await pool.query('select * from categoria');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const selectSubCategory = async (req, res) => {

    try {
        const { id_categoria } = req.body;
        const response = await pool.query('select id_categoria, id_sub, nombre_sub from sub_categoria, categoria, categoria_sub where id_categoria_cat=id_categoria and id_sub_cat=id_sub and id_categoria = $1',[id_categoria]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const selectOneTraining = async (req, res) => {

    try {
        const { id_ejercicios } = req.body;
        const response = await pool.query('SELECT id_ejercicios, nombre_ejercicios, descripcion, imagen, video, nombre_categoria,nombre_sub FROM ejercicios, sub_categoria, categoria, categoria_sub where categoria= id_sub and id_categoria_cat=id_categoria and id_sub_cat=id_sub and id_ejercicios = $1',[id_ejercicios]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const selectOneTrainingUpdate = async (req, res) => {

    try {
        const { id_ejercicios } = req.body;
        const response = await pool.query('SELECT id_ejercicios, nombre_ejercicios, descripcion, imagen, video,id_categoria, id_sub, nombre_categoria,nombre_sub FROM ejercicios, sub_categoria, categoria, categoria_sub where categoria= id_sub and id_categoria_cat=id_categoria and id_sub_cat=id_sub and id_ejercicios = $1',[id_ejercicios]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const updateTraining = async (req, res) => {

    try {
        const { id_ejercicios, nombre_ejercicios, descripcion, video } = req.body;
 
        if(video == ''){

            const response = await pool.query('update ejercicios set nombre_ejercicios = $1, descripcion = $2 where id_ejercicios = $3',[nombre_ejercicios, descripcion, id_ejercicios]);

            if(response.error){
                res.status(401).json(response.error);
            }else{
                res.status(200).json('Training actualizado con exito');
            }

        }else{

            const response = await pool.query('update ejercicios set nombre_ejercicios = $1, descripcion = $2, video=$3 where id_ejercicios = $4',[nombre_ejercicios, descripcion, video, id_ejercicios]);

            if(response.error){
                res.status(401).json(response.error);
            }else{
                res.status(200).json('Training actualizado con exito');
            }

        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}






//Exportar métodos---------------------------------------------------------------------->
module.exports = {

    selectTraining,
    selectCategory,
    selectSubCategory,
    selectOneTraining,
    selectOneTrainingUpdate,
    updateTraining

}