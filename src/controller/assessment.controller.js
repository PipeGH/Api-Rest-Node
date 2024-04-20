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

const createAlergiaNewUser = async (req, res) => {

try {
    const { id_alergias, alergia } = req.body;
    const response = await pool.query('insert into alergias (id_alergias, alergia) values ($1,$2)',[id_alergias,alergia]);

    if(response.error){
        res.status(401).json(response.error);
    }else{
        res.status(200).json('Alergia registrada con exito');
    }

} catch (error) {
    res.status(401).json(error.details);
}

}

const createEnfermedadNewUser = async (req, res) => {

    try {
        const { id_enfermedad, enfermedad } = req.body;
        const response = await pool.query('insert into enfermedades (id_enfermedad, enfermedad) values ($1,$2)',[id_enfermedad,enfermedad]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Enfermedad registrada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const createMedicamentosNewUser = async (req, res) => {

    try {
        const { id_medicamentos, medicamento } = req.body;
        const response = await pool.query('insert into medicamentos (id_medicamentos, medicamento) values ($1,$2)',[id_medicamentos,medicamento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Medicamento registrado');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const createInfoGeneral = async (req, res) => {

    try {
        const { id_info, fuma, alcohol, cafe, ejercicio, cirugias, alergias, medicamentos, enfermedades } = req.body;
        const response = await pool.query('insert into info_general (id_info, fuma, alcohol, cafe, ejercicio, cirugias, alergias, medicamentos, enfermedades) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)',[id_info, fuma, alcohol, cafe, ejercicio, cirugias, alergias, medicamentos, enfermedades]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Info_general registrado con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const updateTipUsers = async (req, res)  => {

    try {
        const { documento_tipo, info_general } = req.body;
        const response = await pool.query('update tipo_usuario set info_general = $1 where documento_tipo = $2',[info_general,documento_tipo]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Users actualizados');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const createMeasures = async (req, res) => {

    try {
        const { id_medidas } = req.body;
        const response = await pool.query('insert into medidas (id_medidas) values ($1)',[id_medidas]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Registro de medidas creado');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }


}

const createAssessmentBasic = async (req, res) => {

    try {
        const { documento_valoracion, id_medidas_valoracion, imc, peso, estatura } = req.body;
        const response = await pool.query('insert into valoracion_basica (documento_valoracion,id_medidas_valoracion,fecha,imc,peso,estatura) values ($1,$2,current_date,$3,$4,$5)',[documento_valoracion, id_medidas_valoracion, imc, peso, estatura]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Valoracion creada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const createMeasuresBasic = async (req, res) => {

    try {
        const { id_medidas, antebrazo_derecho, antebrazo_izquierdo, brazo_derecho, brazo_izquierdo, pecho, abdomen, gluteo, pierna_derecha, pierna_izquierda, pantorrilla_derecha, pantorrilla_izquierda } = req.body;
        
        const response = await pool.query('update medidas set pecho = $1, brazo_derecho=$2, brazo_izquierdo=$3, antebrazo_derecho=$4, antebrazo_izquierdo=$5,abdomen=$6,gluteo=$7,pierna_derecha=$8,pierna_izquierda=$9,pantorrilla_izquierda=$10,pantorrilla_derecha=$11 where id_medidas=$12',[pecho, brazo_derecho, brazo_izquierdo, antebrazo_derecho, antebrazo_izquierdo,abdomen,gluteo,pierna_derecha,pierna_izquierda,pantorrilla_izquierda,pantorrilla_derecha,id_medidas]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Medidas registradas con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const getDocument = async (req, res) => {

    try {
        const { id_medidas_valoracion } = req.body;
        const response = await pool.query('select documento_valoracion from valoracion_basica where id_medidas_valoracion = $1',[id_medidas_valoracion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }
    } catch (error) {
        res.status(401).json(error.details);
    }

}



const cancellAssessmentBasic = async (req, res) => {

    try {
        const { documento_valoracion, id_medidas_valoracion } = req.body;
        const response = await pool.query('delete from valoracion_basica where documento_valoracion = $1 and id_medidas_valoracion = $2',[documento_valoracion,id_medidas_valoracion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Valoracion cancelada');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const deleteMeasures = async (req, res) => {

    try {
        const { id_medidas } = req.body;
        const respuesta = await pool.query('delete from medidas where id_medidas = $1',[id_medidas]);

        if(respuesta.error){
            res.status(401).json(respuesta.error);
        }else{
            res.status(200).json('Valoración eliminada con exito');
        }
    } catch (error) {
        res.status(401).json(error.details);
    }

}


const createGenerales = async (req, res) => {

    try {
        const { id_generales,peso,imc,estatura } = req.body;
        const response = await pool.query('insert into generales (id_generales,peso,imc,estatura) values ($1,$2,$3,$4)',[id_generales,peso,imc,estatura]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Generales registrado con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const createMasa = async(req, res) => {

    try {
        const { id_masa } = req.body;
        const response = await pool.query('insert into masa_muscular (id_masa) values ($1)',[id_masa]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Masa registrada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }
    
}

const createGrasa = async (req, res) => {

    try {
        const { id_grasa } = req.body;
        const response = await pool.query('insert into grasa_corporal (id_grasa) values ($1)',[id_grasa]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Grasa creada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const createAssessmentAdvanced = async (req, res) => {

    try {
        const { documento_valoracion, id_medidas_valoracion, id_generales_valoracion, id_masa_valoracion, id_grasa_valoracion, fech }  = req.body;
        const response = await pool.query('insert into valoracion_avanzada (documento_valoracion, id_medidas_valoracion, id_generales_valoracion, id_masa_valoracion, id_grasa_valoracion, fecha) values ($1,$2,$3,$4,$5,current_date)',[documento_valoracion, id_medidas_valoracion, id_generales_valoracion, id_masa_valoracion, id_grasa_valoracion]);

        if(response.error){
            res.status(401).json(response.error)
        }else{
            res.status(200).json('Valoracion creada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


//Assessment advanced--------------------------------------------------------------->

const updateGenerales = async (req, res) => {

    try {
        const { id_generales, agua_corporal, masa_osea, grasa_visceral, bmr, k_caloria } = req.body;
        const response = await pool.query('update generales set agua_corporal = $1, masa_osea = $2, grasa_visceral = $3, bmr = $4, k_caloria = $5 where id_generales = $6',[ agua_corporal, masa_osea, grasa_visceral, bmr, k_caloria, id_generales]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Actualizacion generales con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const selectAssessmentPhy = async (req, res) => {

    try {
        const response = await pool.query('select * from valoracion_fisica');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const updateMasaCorporal = async (req, res) => {

    try {
        const { id_masa, torso, brazo_derecho, brazo_izquierdo, pierna_derecha, pierna_izquierda, total, valoracion_fisica } = req.body;
        const response = await pool.query('update masa_muscular set torso=$1, brazo_derecho=$2, brazo_izquierdo=$3, pierna_derecha=$4, pierna_izquierda=$5, total=$6, valoracion_fisica=$7 where id_masa = $8',[torso, brazo_derecho, brazo_izquierdo, pierna_derecha, pierna_izquierda, total, valoracion_fisica,id_masa]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Masa corporal actualizada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const updateGrasaCorporal = async (req, res) => {

    try {
        const { id_grasa, torso, brazo_derecho, brazo_izquierdo, pierna_derecha, pierna_izquierda, total } = req.body;
        const response = await pool.query('update grasa_corporal set torso =$1, brazo_derecho=$2, brazo_izquierdo=$3, pierna_derecha=$4, pierna_izquierda=$5, total=$6 where id_grasa = $7',[ torso, brazo_derecho, brazo_izquierdo, pierna_derecha, pierna_izquierda, total,id_grasa]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Actualizacion de grasa corporal realizada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const getDocumentAdvanced = async (req, res) => {

    try {
        const { id_medidas_valoracion } = req.body;
        const response = await pool.query('select documento_valoracion from valoracion_avanzada where id_medidas_valoracion = $1',[id_medidas_valoracion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const deleteAssessmentAdvanced = async (req, res) => {

    try {
        const { documento_valoracion, id_medidas_valoracion, id_generales_valoracion } = req.body;
        const response = await pool.query('delete from valoracion_avanzada where documento_valoracion = $1 and id_medidas_valoracion = $2 and id_generales_valoracion = $3',[documento_valoracion,id_medidas_valoracion,id_generales_valoracion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Valoracion Avanzada eliminada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const deleteGenerales = async (req, res) => {

    try {
        const { id_generales } = req.body;
        const response = await pool.query('delete from generales where id_generales = $1',[id_generales]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Generales eliminado con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const deleteMasa = async (req, res) => {

    try {
        const { id_masa } = req.body;
        const response = await pool.query('delete from masa_muscular where id_masa = $1',[id_masa]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Masa Muscular eliminada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const deleteGrasa = async (req, res) => {

    try {
        const { id_grasa } = req.body;
        const response = await pool.query('delete from grasa_corporal where id_grasa = $1',[id_grasa]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Grasa eliminada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


//Search Assessments for document user---------------------------------------------->

const searchAssessmentBasic = async (req, res) => {

    try {
        const { documento_valoracion } = req.body;
        const response = await pool.query('select id_medidas_valoracion, fecha from valoracion_basica where documento_valoracion = $1',[documento_valoracion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const searchAssessmentAdvanced = async (req, res) => {

    try {
        const { documento_valoracion } = req.body;
        const response = await pool.query('select id_medidas_valoracion, fecha from valoracion_avanzada where documento_valoracion = $1',[documento_valoracion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const selectAssessmentBasic = async (req, res) => {

    try {
        const { id_medidas_valoracion } = req.body;
        const response = await pool.query('SELECT documento_valoracion, id_medidas_valoracion, pecho, brazo_derecho, brazo_izquierdo,antebrazo_derecho, antebrazo_izquierdo,abdomen,gluteo, pierna_derecha, pierna_izquierda, pantorrilla_izquierda, pantorrilla_derecha, fecha, peso, estatura FROM valoracion_basica,medidas, usuarios where documento_valoracion=documento and id_medidas_valoracion=id_medidas and id_medidas_valoracion = $1',[id_medidas_valoracion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const updateWeight = async (req, res) => {

    try {
        const { id_medidas_valoracion, documento_valoracion, imc, peso } = req.body;
        const response = await pool.query('update valoracion_basica set peso = $1, imc=$2 where id_medidas_valoracion=$3 and documento_valoracion=$4',[peso,imc,id_medidas_valoracion,documento_valoracion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Peso actualizado con exito');
        }
    } catch (error) {
        res.status(401).json(error.details);
    }

}

const selectAssessmentAdvanced = async (req, res) => {

    try {
        const { id_medidas_valoracion } = req.body;
        const response = await pool.query('SELECT documento_valoracion,id_medidas,id_masa,id_generales, id_grasa FROM valoracion_avanzada,medidas,grasa_corporal,generales,masa_muscular,usuarios where documento_valoracion=documento and id_medidas_valoracion=id_medidas and id_masa_valoracion=id_masa and id_grasa_valoracion=id_grasa and id_medidas_valoracion=$1',[id_medidas_valoracion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }
    } catch (error) {
        res.status(401).json(error.details);
    }

}

const selectEstatura = async (req,res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query('select estatura from valoracion_avanzada, generales, usuarios where documento_valoracion=documento and id_generales_valoracion=id_generales and documento_valoracion=documento and documento=$1',[documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }


    } catch (error) {
        res.status(401).json(error.details);
    }

}

const selectGenerales = async (req, res) => {

    try {
        const { id_generales } = req.body;
        const response = await pool.query('select * from generales where id_generales = $1',[id_generales]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const updategeneralesTwo = async (req, res) => {

    try {
        const { id_generales, agua_corporal, masa_osea, grasa_visceral, bmr, k_caloria, peso, imc } = req.body;
        const response = await pool.query('update generales set agua_corporal = $1, masa_osea = $2, grasa_visceral = $3, bmr = $4, k_caloria = $5, peso=$6, imc=$7 where id_generales = $8',[ agua_corporal, masa_osea, grasa_visceral, bmr, k_caloria,peso, imc, id_generales]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Actualizacion generales con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const selectMasa = async (req, res) => {

    try {
        const { id_masa } = req.body;
        const response = await pool.query('select * from masa_muscular where id_masa = $1',[id_masa]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }
    } catch (error) {
        res.status(401).json(error.details);
    }

}

const selectGrasa = async (req, res) => {

    try {
        const { id_grasa } = req.body;
        const response = await pool.query('select * from grasa_corporal where id_grasa = $1',[id_grasa]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(response.error);
    }

}

const selectMeasures = async (req, res) => {

    try {
        const { id_medidas } = req.body;
        const response = await pool.query('select * from medidas where id_medidas = $1',[id_medidas]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const getHeight = async (req, res) => {

    try {
        const { documento_valoracion } = req.body;
        const response = await pool.query('select estatura from valoracion_basica where documento_valoracion = $1',[documento_valoracion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }
    } catch (error) {
        res.status(401).json(error.details);
    }

}


const createAssessmentBasicOld = async (req, res) => {

    try {
        const { documento_valoracion, id_medidas_valoracion, estatura } = req.body;
        const response = await pool.query('insert into valoracion_basica (documento_valoracion, id_medidas_valoracion,fecha, estatura) values ($1,$2,current_date,$3)',[documento_valoracion, id_medidas_valoracion, estatura]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Valoracion creada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const createGeneralesOld = async (req, res) => {

    try {
        const { id_generales, estatura } = req.body;
        const response = await pool.query('insert into generales (id_generales,estatura) values ($1,$2)',[id_generales,estatura]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Generales creados con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}



//dashboard the assessment basic------------------------------------------->

const selectMeasuresOfUser = async (req, res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query('select pecho, brazo_derecho, brazo_izquierdo, antebrazo_derecho, antebrazo_izquierdo, abdomen, gluteo,pierna_derecha, pierna_izquierda, pantorrilla_izquierda, pantorrilla_derecha, fecha from valoracion_basica, medidas, usuarios where id_medidas_valoracion=id_medidas and documento_valoracion=documento and documento=$1',[documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const selectImc = async (req, res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query('select imc, peso, estatura, fecha from valoracion_basica, usuarios, medidas where documento_valoracion=documento and id_medidas_valoracion=id_medidas and documento = $1',[documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }
    } catch (error) {
        res.status(401).json(error.details);
    }

}

//Métodos para el avanzado---------------------------------------------------------->

const selectMeasuresUserAdvanced = async (req, res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query('select pecho, brazo_derecho, brazo_izquierdo, antebrazo_derecho, antebrazo_izquierdo, abdomen, gluteo,pierna_derecha, pierna_izquierda, pantorrilla_izquierda, pantorrilla_derecha, fecha from valoracion_avanzada, medidas, usuarios where id_medidas_valoracion=id_medidas and documento_valoracion=documento and documento=$1',[documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const selecGeneralesAdvanced = async (req, res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query('select documento_valoracion, fecha, peso, masa_osea, agua_corporal, grasa_visceral, bmr,k_caloria, imc, estatura, nombre_tipo_genero from valoracion_avanzada, generales, usuarios, genero where documento_valoracion=documento and id_generales_valoracion=id_generales and genero=id_genero and documento = $1',[documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const selectMasaMuscular = async (req, res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query('SELECT documento_valoracion,torso,brazo_derecho,brazo_izquierdo, pierna_derecha, pierna_izquierda,total,rango,fecha,icono FROM valoracion_avanzada, masa_muscular, usuarios, valoracion_fisica where documento_valoracion=documento and id_masa_valoracion=id_masa and valoracion_fisica=id_valoracion_fisica and documento = $1',[documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }
    } catch (error) {
        res.status(401).json(error.details);
    }

}

const selectGrasaCorporalAdvanced = async (req, res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query('SELECT documento_valoracion,age(CURRENT_DATE,fecha_nacimiento) as edad, nombre_tipo_genero,peso, torso, brazo_derecho, brazo_izquierdo, pierna_derecha,pierna_izquierda,total, fecha FROM valoracion_avanzada, grasa_corporal, genero, generales, usuarios where documento_valoracion=documento and id_grasa_valoracion=id_grasa and genero=id_genero and id_generales_valoracion=id_generales and documento = $1',[documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }        
    
    } catch (error) {
        res.status(401).json(error.details);
    }


}



//Quotes ---------------------------------------------------------------------------->

const selectQuotes = async (req, res) => {

    try {
        
        const response = await pool.query('    select id_reservacion_usuario,documento_reservacion,nombres,primer_apellido,segundo_apellido,fecha, horas,nombre_reservacion, tipo_de_estado from reservacion,reservacion_usuario, usuarios, estado,reservacion_hora where id_reservacion_usuario=id_reservacion and documento_reservacion=documento and state = id_tipo and hora=id_hora and state = 2');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const selectViewQuotes = async (req, res) => {

    try {
        const { fecha } = req.body;
        const response = await pool.query('select id_reservacion_usuario,documento_reservacion,nombres,primer_apellido,segundo_apellido,numero_telefono,fecha,hora,nombre_reservacion, horas, tipo_de_estado from  estado, reservacion,reservacion_usuario, usuarios, telefono, reservacion_hora where id_reservacion_usuario=id_reservacion and documento_reservacion=documento and documento_usuario=documento and fecha = $1 and id_hora = hora and state = id_tipo order by hora asc',[fecha]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const selectOneQuotes = async (req, res) => {

    try {
        const { documento, fecha } = req.body;
        const response = await pool.query('select id_reservacion_usuario,documento_reservacion,nombres,primer_apellido,segundo_apellido,numero_telefono,fecha, horas,nombre_reservacion, correo, tipo_de_estado, hora, state from reservacion,reservacion_usuario, usuarios, telefono, estado, reservacion_hora where id_reservacion_usuario=id_reservacion and documento_reservacion=documento and state = id_tipo and documento_usuario=documento and hora=id_hora and documento = $1 and fecha = $2',[documento,fecha]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const searchTypeAssessmentclient = async (req, res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query('select id_valoracion, nombre_valoracion from tipo_valoracion, tipo_usuario, usuarios where id_valoracion_tipo=id_valoracion and documento_tipo=documento and documento= $1',[documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}



const searchAssessmentExt = async (req, res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query('select documento,nombre_valoracion from tipo_usuario, tipo_valoracion, usuarios where id_valoracion_tipo=id_valoracion and documento_tipo=documento and documento = $1 except select documento,nombre_valoracion from tipo_usuario, tipo_valoracion, usuarios, info_general where id_valoracion_tipo=id_valoracion and documento_tipo=documento and info_general=id_info',[documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details)
    }

}









const searchStateQuotes = async (req, res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query("SELECT nombre_reservacion, concat( extract( day from fecha) ||' '||'de'||' '|| to_char(fecha,'TMMonth')||' '||'del'||' '||extract(year from fecha)) as date,fecha, concat(extract( hour from horas) ||':'|| extract (minute from horas)) as hora,tipo_de_estado, id_tipo FROM reservacion_usuario, usuarios, reservacion, reservacion_hora, estado where documento_reservacion=documento and id_reservacion_usuario=id_reservacion and state=id_tipo and hora=id_hora and documento= $1 order by reservacion_usuario.fecha desc limit 1;",[documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const selectAllReservacion = async (req, res) => {

    try {
        const response = await pool.query('select * from reservacion');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const CreateSolicitadAssessment  = async (req, res) => {

    try {
        const { id_reservacion_usuario, documento_reservacion, state } = req.body;
        const hora = 1;
        const response = await pool.query('insert into reservacion_usuario ( id_reservacion_usuario, documento_reservacion, fecha, state, hora ) values ($1,$2,current_date,$3,$4)',[id_reservacion_usuario, documento_reservacion, state, hora]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Solicitud creada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const cancellQuoteAssessment = async (req, res) => {

    try {
        const { documento_reservacion, state } = req.body;
        const response = await pool.query('delete from reservacion_usuario where documento_reservacion = $1 and state = $2',[documento_reservacion,state]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Cita Cancelada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const selectAllQuotesOneUser = async (req, res) => {

    try {
        const { documento } = req.body;
        const response = await pool.query("SELECT nombre_reservacion, concat( extract( day from fecha)||' '||'de'||' '|| to_char(fecha,'TMMonth')||' '||'del'||' '||extract(year from fecha)) as date,fecha, concat(extract( hour from horas) ||':'|| extract (minute from horas)) as hora,tipo_de_estado FROM reservacion_usuario, usuarios, reservacion,reservacion_hora, estado where documento_reservacion=documento and id_reservacion_usuario=id_reservacion and hora=id_hora and state=id_tipo and documento= $1 and not id_tipo=1",[documento]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}









//Método de recepcion------------------------------------------------------------------------

const selectTypeQuote = async (req, res) => {

    try {
        const response = await pool.query('select * from reservacion');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const selectUserQuotes = async (req, res) => {

    try {
        const response = await pool.query('SELECT id_reservacion, nombre_reservacion,documento, nombres, primer_apellido, segundo_apellido FROM reservacion, reservacion_usuario, usuarios, estado where id_reservacion_usuario=id_reservacion and documento_reservacion=documento and state=id_tipo and id_tipo=1');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }
        
    } catch (error) {
        res.status(401).json(error.details);
    }

}

const selectTimeQuote = async (req, res) => {

    try {
        const { fecha } = req.body;
        const response = await pool.query('select id_hora, horas from reservacion_hora except select id_hora,horas from reservacion, reservacion_usuario, reservacion_hora, estado, usuarios where state=id_tipo and hora=id_hora and documento_reservacion=documento and id_reservacion_usuario=id_reservacion and fecha= $1 and state = 2 order by horas asc',[fecha]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            if(response.rowCount == 0){
                res.status(200).json('No hay lugar en la agenda para la cita');
            }else if(response.rowCount >= 1){
                res.status(200).json(response.rows);
            }

        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const assingQuote = async (req, res) => {

    try {
        const { id_reservacion_usuario, documento_reservacion, fecha, hora } = req.body;
        const state  = 2;
        const response = await pool.query('update reservacion_usuario set id_reservacion_usuario = $1, fecha = $2, state = $3, hora = $4 where documento_reservacion = $5',[id_reservacion_usuario, fecha, state, hora,documento_reservacion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Cita agendada con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}

const createNotificationQuote = async (req, res) => {

    try {
        const { id_noti_us, documento_usu } = req.body;
        const response = await pool.query('insert into noti_usu (id_noti_us, documento_usu, fecha, hora) values ($1,$2,current_date,current_time)',[id_noti_us,documento_usu]);

        if(response.error){
            res.status(500).json(response.error);
        }else{
            res.status(200).json('Notificación creada con exito');
        }

    } catch (error) {
        res.status(500).json(error.details);
    }

}


const selectAllTimeConfirm = async (req, res) => {

    try {
        const { fecha } = req.body;
        const response = await pool.query('select id_hora,horas from reservacion_hora, reservacion_usuario except select id_hora,horas from reservacion, reservacion_usuario, reservacion_hora, estado, usuarios where state=id_tipo and hora=id_hora and documento_reservacion=documento and id_reservacion_usuario=id_reservacion and fecha=$1 and state = 2 order by horas asc',[fecha]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const updateStateTemp = async (req, res) => {

    try {
        const { documento_reservacion, state } = req.body;
        const response = await pool.query('update reservacion_usuario set state = $1 where documento_reservacion = $2',[state,documento_reservacion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('Estado actualizado con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const selectAllState = async (req, res) => {

    try {
        const response = await pool.query('select id_tipo, tipo_de_estado from estado where not id_tipo = 6 and not id_tipo = 1 order by id_tipo desc');

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


const updateQuoteAssing = async (req, res) => {

    try {
        const { id_reservacion_usuario, documento_reservacion, fecha, state, hora } = req.body;
        console.log(req.body);
        const response = await pool.query('update reservacion_usuario set id_reservacion_usuario = $1, fecha = $2, state = $3, hora = $4 where documento_reservacion = $5',[id_reservacion_usuario, fecha, state,hora, documento_reservacion]);

        if(response.error){
            res.status(401).json(response.error);
        }else{
            res.status(200).json('La información se actualíz con exito');
        }

    } catch (error) {
        res.status(401).json(error.details);
    }

}


//-------------------------------------------------------------------------------------------

const searchEmailUserAdvanced = async (req, res) => {

    try {
        const { id_medidas_valoracion } = req.body;
        const response = await pool.query('select documento, correo from valoracion_avanzada, usuarios where documento_valoracion = documento and id_medidas_valoracion = $1',[id_medidas_valoracion]);

        if(response.error){
            res.status(500).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(500).json(error.message);
    }

}

const searchEmailUserBasic = async (req, res) => {

    try {
        const { id_medidas_valoracion } = req.body;
        const response = await pool.query('select documento, correo from valoracion_basica, usuarios where documento_valoracion = documento and id_medidas_valoracion = $1',[id_medidas_valoracion]);

        if(response.error){
            res.status(500).json(response.error);
        }else{
            res.status(200).json(response.rows);
        }

    } catch (error) {
        res.status(500).json(error.message);
    }


}



//Exportat los métodos-------------------------------------------------------------->

module.exports = {

    createAlergiaNewUser,
    createEnfermedadNewUser,
    createMedicamentosNewUser,
    createInfoGeneral,
    updateTipUsers,
    createMeasures,
    createAssessmentBasic,
    createMeasuresBasic,
    getDocument,
    cancellAssessmentBasic,
    deleteMeasures,
    createGenerales,
    createMasa,
    createGrasa,
    createAssessmentAdvanced,




    updateGenerales,
    selectAssessmentPhy,
    updateMasaCorporal,
    updateGrasaCorporal,
    getDocumentAdvanced,
    deleteAssessmentAdvanced,
    deleteGenerales,
    deleteMasa,
    deleteGrasa,






    searchAssessmentBasic,
    searchAssessmentAdvanced,
    selectAssessmentBasic,
    updateWeight,
    selectAssessmentAdvanced,
    selectGenerales,
    updategeneralesTwo,
    selectMasa,
    selectGrasa,
    selectMeasures,
    getHeight,
    createAssessmentBasicOld,
    createGeneralesOld,
    selectMeasuresOfUser,
    selectImc,
    selectMeasuresUserAdvanced,
    selecGeneralesAdvanced,
    selectEstatura,
    selectMasaMuscular,
    selectGrasaCorporalAdvanced,




    selectQuotes,
    selectViewQuotes,
    selectOneQuotes,



    searchTypeAssessmentclient,
    searchAssessmentExt,
    searchStateQuotes,
    selectAllReservacion,
    CreateSolicitadAssessment,
    cancellQuoteAssessment,
    selectAllQuotesOneUser,













    selectTypeQuote,
    selectUserQuotes,
    assingQuote,
    selectTimeQuote,
    createNotificationQuote,
    selectAllTimeConfirm,
    updateStateTemp,
    selectAllState,
    updateQuoteAssing,






    searchEmailUserAdvanced,
    searchEmailUserBasic


}