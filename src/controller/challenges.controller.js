const { response } = require('express');
const res = require('express/lib/response');
const { Pool } = require('pg');

//Conexión con la base de datos-----------------------------------------

const pool = new Pool({
    host: 'localhost',
    database: 'gimnasio',
    user: 'postgres',
    port: 5432,
    password: '1234'
});

//Definición de funciones------------------------------------------------

const selectTraining = async (req, res) => {

    try {
        const { id_retos_ej } = req.body;
        const response = await pool.query('SELECT id_ejercicios_ej,nombre_ejercicios,nombre_categoria,nombre_sub FROM retos_ejecicios, retos, categoria, sub_categoria, categoria_sub, ejercicios where id_retos_ej=id_retos and id_ejercicios_ej=id_ejercicios and id_categoria_cat=id_categoria and id_sub_cat= id_sub and categoria = id_sub and id_retos= $1',[id_retos_ej]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const insertTraining = async (req, res) => {

    try {
        const { id_retos_ej, id_ejercicios_ej } = req.body;
        const response = await pool.query('insert into retos_ejecicios (id_retos_ej, id_ejercicios_ej) values ($1,$2)',[id_retos_ej, id_ejercicios_ej]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Ejercicio registrados con exito');
        }

    } catch (error) {
        
        if(error.code == 23505){
            res.json('El ejercicio ya se encuentra registrado, intente nuevamente');
        }

    }

}

const deleteTraining = async (req, res) => {

    try {
        const { id_retos_ej, id_ejercicios_ej } = req.body;
        const response = await pool.query('delete from retos_ejecicios where id_retos_ej = $1 and id_ejercicios_ej = $2',[id_retos_ej,id_ejercicios_ej]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Ejercicio eliminado con exito')
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const cancelChallenges = async (req, res) => {

    try {
        const { id_retos_ej } = req.body;
        console.log(id_retos_ej);
        const response = await pool.query('delete from retos_ejecicios where id_retos_ej = $1',[id_retos_ej]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            const id_retos = id_retos_ej;
            const respuesta = await pool.query('delete from retos where id_retos = $1',[id_retos]);

            if(respuesta.error){
                res.status(401).json(respuesta.error);
            }else{
                res.status(200).json('Reto cancelado con exito');
            }

        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const selectAllChallenges = async (req, res) => {

    try {
        const response  = await pool.query('select * from retos, estado_reto where state=id_estado order by id_estado=1 asc');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const updateStateChallenges = async (req, res) => {

    try {
        const { id_retos, state } = req.body;
        const response = await pool.query('update retos set state = $1 where id_retos = $2',[state,id_retos]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Estado actualizado con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const selectClientRegistered = async (req, res) => {

    try {
        const { id_retos } = req.body;
        const response = await pool.query('select documento, nombres, primer_apellido, segundo_apellido, numero_telefono, correo from usuarios, retos_usuarios, retos, telefono,  rol where id_retos_us=id_retos and documento_us=documento and documento_usuario=documento and rol=id_rol and rol=5 and id_retos = $1',[id_retos]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const selectClientNoRegistered = async (req, res) => {

    try {
        const { id_retos } = req.body;
        const response = await pool.query('select documento, nombres, primer_apellido, segundo_apellido, numero_telefono, correo from usuarios, telefono,  rol where documento_usuario=documento and rol=id_rol and rol=5 except select documento, nombres, primer_apellido, segundo_apellido, numero_telefono, correo from usuarios, retos_usuarios, retos, telefono,  rol where id_retos_us=id_retos and documento_us=documento and documento_usuario=documento and rol=id_rol and rol=5 and id_retos = $1 ',[id_retos]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }


    } catch (error) {
        res.status(401).json(error.details);
    }

}


const registeredClientToChallenges = async (req, res) => {

    try {
        const { id_retos_us, documento_us } = req.body;
        const response = await pool.query('insert into retos_usuarios (id_retos_us,documento_us) values ($1,$2)',[id_retos_us,documento_us]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Usuario registrado con éxito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const searchOneUser = async (req, res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query('SELECT documento, correo, nombres, primer_apellido, segundo_apellido, nombre_tipo_documento,numero_telefono, nombre_tipo_genero, foto_personal FROM usuarios, telefono, tipo_documento, foto , genero where tipo_de_documento=id_documento and genero=id_genero and documento_usuario=documento and img=id_foto and documento = $1',[documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const searchDataChallenges = async (req, res) => {

    try {
        const { id_retos } = req.body;
        const response = await pool.query('select * from retos where id_retos = $1',[id_retos]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const selectState = async (req, res) => {

    try {
        const response = await pool.query('select * from estado_reto');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const updateChallengesNoImg = async (req, res) => {

    try {
        const { id_retos,nombre_reto, descripcion, fecha, state, hora } = req.body;
        const response = await pool.query('update retos set nombre_reto = $1, descripcion = $2, fecha = $3, state = $4, hora = $5  where id_retos = $6',[nombre_reto, descripcion, fecha, state, hora,id_retos]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Reto actualizado con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}






const selectDataFromChallenges = async (req, res) => {

    try {
        const { id_retos } = req.body;
        const response = await pool.query('select id_retos, nombre_reto, descripcion, imagen, fecha, hora, estado_reto.estado from retos, estado_reto where state=id_estado and id_retos = $1',[id_retos]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details)
    }

}


const selectTrainingFromChallenges = async (req, res) => {

    try {
        const { id_retos } = req.body;
        const response = await pool.query('SELECT id_ejercicios, nombre_ejercicios, ejercicios.imagen, categoria, nombre_categoria, nombre_sub FROM ejercicios, categoria_sub, retos_ejecicios, retos, categoria, sub_categoria where categoria=id_sub and id_categoria_cat=id_categoria and id_sub_cat=id_sub and id_retos_ej=id_retos and id_ejercicios_ej=id_ejercicios and id_retos=$1',[id_retos]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details)
    }

}




//Metodos del cliente--------------------------------------------------------

const selectStateChallengesUser = async (req, res) => {

    try {
        const response = await pool.query("SELECT id_retos,nombre_reto, descripcion,imagen, concat(extract(day from fecha)||' '||'de'||' '|| to_char(fecha,'TMMonth')||' '||'del'||' '||extract(year from fecha)||'a las'||' '||extract(hour from hora)||':'||extract(minute from hora)),estado FROM retos,estado_reto where state=id_estado and state=1;");

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const selectTrainingChallenges = async (req, res) => {

    try {
        const { id_retos } = req.body;
        const response = await pool.query('select id_ejercicio,nombre_ejercicios, nombre_categoria, nombre_sub, nombre_ejecucion, numero_series,nombre_series,nombre_repeticion, ejercicios.imagen from repeticiones, series,retos_ejecicios, retos,plan_entrenamiento, entrenamiento, sub_categoria,ejercicios, categoria, categoria_sub, tipo_ejecucion where id_plan_entrenamiento=id_entrenamiento and id_ejercicio=id_ejercicios and id_categoria_cat=id_categoria and id_sub_Cat=id_sub and id_tipo_de_ejecucion=id_ejecucion and id_serie=id_series and id_repes=id_repeticiones and categoria=id_sub_cat and id_retos_ej=id_retos and id_ejercicios_ej=id_ejercicios and id_retos = $1',[id_retos]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const selectOneTrainingChallenges = async (req, res) => {

    try {
        const { id_retos, id_ejercicios } = req.body;
        const response = await pool.query('select nombre_ejercicios, nombre_categoria, nombre_sub, nombre_ejecucion, numero_series,nombre_series,nombre_repeticion, ejercicios.imagen, video, ejercicios.descripcion from repeticiones, series,retos_ejecicios, retos,plan_entrenamiento, entrenamiento, sub_categoria,ejercicios, categoria, categoria_sub, tipo_ejecucion where id_plan_entrenamiento=id_entrenamiento and id_ejercicio=id_ejercicios and id_categoria_cat=id_categoria and id_sub_Cat=id_sub and id_tipo_de_ejecucion=id_ejecucion and id_serie=id_series and id_repes=id_repeticiones and categoria=id_sub_cat and id_retos_ej=id_retos and id_ejercicios_ej=id_ejercicios and id_retos=$1 and id_ejercicios = $2 limit 1',[id_retos,id_ejercicios]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }


}


const registeredClientChallenges = async (req, res) => {

    try {
        const { id_retos_us, documento_us } = req.body;
        const response = await pool.query('insert into retos_usuarios (id_retos_us, documento_us) values ($1,$2)',[id_retos_us, documento_us]);

        if(response.error){
            res.status(401).json(response.error.details);
        }else{
            res.status(200).json('Usuario registrado con exito');
        }

    } catch (error) {

        if(error.length == 251){

            res.json('Ya te encuentras registrado');

        }


    }

}


const validateUserAndChallenges = async (req, res) => {

    try {
        const { id_retos_us, documento_us } = req.body;
        const response = await pool.query('select * from retos_usuarios where id_retos_us = $1 and documento_us = $2',[id_retos_us,documento_us]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}



//---------------------------------------------------------------------------

//Exportar métodos-------------------------------------------------------
module.exports = {

    selectTraining,
    insertTraining,
    deleteTraining,
    cancelChallenges,
    selectAllChallenges,
    updateStateChallenges,
    selectClientRegistered,
    selectClientNoRegistered,
    registeredClientToChallenges,
    searchOneUser,
    searchDataChallenges,
    selectState,
    updateChallengesNoImg,
    selectDataFromChallenges,
    selectTrainingFromChallenges,






    selectStateChallengesUser,
    selectTrainingChallenges,
    selectOneTrainingChallenges,
    registeredClientChallenges,
    validateUserAndChallenges

};