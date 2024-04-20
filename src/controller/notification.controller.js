const { Pool } = require('pg');

//Conexión a la base de datos------------------------------------------------------>

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'gimnasio',
    port: 5432
});

//Definición de los métodos--------------------------------------------------------->

const selectAllNotification = async (req, res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query("select date_part('month', age(current_date, fecha))as mes,(current_date-fecha)/7 as semanas ,date_part('day', age(current_date,fecha))as dias, concat(extract(day from fecha)||' '||'de'||' '|| to_char(fecha,'TMMonth')||' '||'del'||' '||extract(year from fecha)) as fechas, hora, id_noti, texto from noti_usu, usuarios, notificaciones where id_noti=id_noti_us and documento_usu=documento and documento = $1 order by fecha desc, hora desc",[documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }
    

}

const countRowsNotifications = async (req, res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query('select count(documento) as conteo from notificaciones,noti_usu, usuarios where id_noti_us=id_noti and documento_usu=documento and documento= $1',[documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const deleteNotificationUser = async (req, res) => {

    try {
        const { id_noti_us, documento_usu } = req.body;
        const response = await pool.query('delete from noti_usu where id_noti_us = $1 and documento_usu = $2',[id_noti_us,documento_usu]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Notificación eliminada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const createNotification = async (req, res) => {

    try {
        const { id_noti, documento_usu, texto } = req.body;
        const response = await pool.query('insert into notificaciones (id_noti,texto) values ($1,$2)',[id_noti,texto]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            const id_noti_us = id_noti;
            const respuesta = await pool.query('insert into noti_usu (id_noti_us,documento_usu,fecha,hora) values ($1,$2,current_date,current_time)',[id_noti_us,documento_usu]);

            if(respuesta.error){
                res.status(401).json(respuesta.error);
            }else{
                res.status(200).json('Notificación creada con exito');
            }

        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}




//Métodos para recepcion---------------------------------------------------------------

const selectAllNotifications = async (req, res) => {

    try {
        const response = await pool.query('select * from notificaciones');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const createNotifications = async (req, res) => {

    try {
        const { id_noti, texto } = req.body;
        const response = await pool.query('insert into notificaciones (id_noti, texto) values ($1,$2)',[id_noti,texto]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Notificacion creada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const createMultipleNotifications = async (req, res) => {

    try {
        const { documentos_usu, id_noti_us } = req.body;

        let response = '';
        for(let x of documentos_usu){
            response = await pool.query('insert into noti_usu (id_noti_us,documento_usu,fecha,hora) values ($1,$2,current_date,current_time)',[id_noti_us,x]); 
        }

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Notificaciones creadas con exito');
        }



    } catch (error) {
        res.status(401).json(error.details);
    }

}

const sendOneNotification = async (req, res) => {

    try {
        const { id_noti_us, documento_usu } = req.body;
        console.log(req.body);
        const response = await pool.query('insert into noti_usu (id_noti_us,documento_usu,fecha,hora) values ($1,$2,current_date,current_time)',[id_noti_us,documento_usu]); 

        if(response.error){
            res.status(500).json(response.error);
        }else{
            res.status(200).json('Notificacion enviada con exito');
        }

    } catch (error) {
        res.status(500).json(error.details);
    }

}


//--------------------------------------------------------------------------------------



//Exportar los métodos-------------------------------------------------------------->

module.exports = {

    selectAllNotification,
    countRowsNotifications,
    deleteNotificationUser,
    createNotification,







    selectAllNotifications,
    createNotifications,
    createMultipleNotifications,
    sendOneNotification

}