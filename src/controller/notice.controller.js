const { response } = require('express');
const { Pool } = require('pg');

//Conexión con la base de datos---------------------------------

const pool = new Pool({
    host: 'localhost',
    database: 'gimnasio',
    user: 'postgres',
    port: 5432,
    password: '1234'
});

//Definición de funciones---------------------------------------




const selectNotices = async (req, res) => {

    try {
        const response = await pool.query('SELECT id_informacion, titulo, substring(descripcion from 1 for 200) as descripcion, nombres, primer_apellido, segundo_apellido, multimedia, fecha_informacion FROM informacion, usuarios, fecha_informacion where autor=documento and fecha=id_fecha');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const selectOneNotice = async (req, res) => {

    try {
        const { id_informacion } = req.body;
        const response = await pool.query('SELECT id_informacion, titulo, descripcion, nombres, primer_apellido, segundo_apellido, multimedia, fecha_informacion FROM informacion, usuarios, fecha_informacion where autor=documento and fecha=id_fecha and id_informacion =$1',[id_informacion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const selectFromDelete = async (req, res) => {

    try {
        const { id_informacion } = req.body;
        const response = await pool.query('SELECT fecha from informacion where id_informacion =$1',[id_informacion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}




const deleteDate = async (req, res) => {

    try {
        const { id_fecha } = req.body;
        const response = await pool.query('delete from fecha_informacion where id_fecha=$1',[id_fecha]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Fecha borrada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }   

}

const deleteNotice = async (req, res) => {

    try {
        const { id_informacion } = req.body;
        const response = await pool.query('delete from informacion where id_informacion=$1',[id_informacion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Noticia borrada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }   

}


const createDate = async (req, res) => {

    try {
        const {id_fecha } = req.body
        const response = await pool.query('insert into fecha_informacion (id_fecha,fecha_informacion) values ($1,current_date)',[id_fecha]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Fecha Creada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }


}

const updateNotice = async (req, res) => {

    try {
        const { id_informacion, titulo, descripcion} = req.body;
        const response = await pool.query('update informacion set titulo = $1, descripcion =$2 where id_informacion = $3',[titulo,descripcion,id_informacion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Noticia actualizada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const SelectViewNotice = async (req, res) => {

    try {
        const response = await pool.query('SELECT id_informacion, titulo, substring(descripcion from 1 for 200) as descripcion, nombres, primer_apellido, segundo_apellido, multimedia, fecha_informacion FROM informacion, usuarios, fecha_informacion where autor=documento and fecha=id_fecha order by id_informacion desc');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const selectViewOneNotice = async (req, res) => {

    try {
        const { id_informacion } = req.body;
        const response = await pool.query('SELECT id_informacion, titulo, descripcion, nombres, primer_apellido, segundo_apellido, img, multimedia, fecha_informacion, foto_personal FROM foto, informacion, usuarios, fecha_informacion where img= id_foto and autor=documento and fecha=id_fecha and id_informacion = $1',[id_informacion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}






const selectPreviewNotice = async (req, res) => {

    try {
        const { id_informacion } = req.body;
        const response = await pool.query('SELECT id_informacion, titulo, descripcion, nombres, primer_apellido, segundo_apellido, multimedia, fecha_informacion FROM informacion, usuarios, fecha_informacion where autor=documento and fecha=id_fecha and not id_informacion = $1 order by id_informacion DESC LIMIT 3',[id_informacion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}







const selectDownNotice = async (req, res) => {

    try{
        const response = await pool.query('SELECT id_informacion, titulo, substring(descripcion from 1 for 13), nombres, primer_apellido, segundo_apellido, multimedia, fecha_informacion FROM informacion, usuarios, fecha_informacion where autor=documento and fecha=id_fecha and id_informacion = (SELECT MAX(id_informacion) FROM informacion)');


        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }
    }catch(error){
        res.status(401).json(error.details);
    }


}











const viewCortNotice = async (req, res) => {

    try {
        const response = await pool.query('SELECT id_informacion, titulo, substring(descripcion from 1 for 13) as texto, multimedia, fecha_informacion FROM informacion, fecha_informacion where fecha=id_fecha order by fecha_informacion desc limit 4');
    
        if(response.error){
            res.status(500).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(500).json(error.message);
    }

}




//Exportar variables--------------------------------------------
module.exports = {

    selectNotices,
    deleteDate,
    selectOneNotice,
    createDate,
    selectFromDelete,
    deleteNotice,
    updateNotice,
    SelectViewNotice,
    selectViewOneNotice,
    selectPreviewNotice,
    selectDownNotice,





    viewCortNotice


}