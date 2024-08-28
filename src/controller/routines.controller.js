const {Pool} = require("pg");

//Conexión con la base de datos----------------------------------------->

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "gimnasio",
  port: 5432,
});

//Definición de los métodos--------------------------------------------->

const createRoutine = async (req, res) => {
  try {
    const {id_plan_entrenamiento, nombre_entrenamiento} = req.body;
    const id_entrenamiento = id_plan_entrenamiento;
    const tipo_valoracion = 1;
    const id_repes = 1;
    const id_serie = 1;

    const response = await pool.query(
      "insert into plan_entrenamiento (id_entrenamiento,nombre_entrenamiento, tipo_valoracion, id_repes, id_serie) values ($1,$2,$3,$4,$5)",
      [
        id_entrenamiento,
        nombre_entrenamiento,
        tipo_valoracion,
        id_repes,
        id_serie,
      ]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Rutina creada con exito");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const selectDay = async (req, res) => {
  try {
    const response = await pool.query("select * from dias");

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const selectSeries = async (req, res) => {
  try {
    const response = await pool.query("select * from series");

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(401);
  }
};

const selectRepetitions = async (req, res) => {
  try {
    const response = await pool.query("select * from repeticiones");

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const selectTipoEjecucion = async (req, res) => {
  try {
    const response = await pool.query("select * from tipo_ejecucion");

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const createTraining = async (req, res) => {
  try {
    const {
      id_ejercicio,
      id_plan_entrenamiento,
      id_tipo_de_ejecucion,
      dias_entre,
      posicion_ejer,
    } = req.body;

    // Verificar si la posición ya existe para el plan de entrenamiento y el día
    const existingPositionQuery = await pool.query(
      "SELECT posicion_ejer FROM entrenamiento WHERE id_plan_entrenamiento = $1 AND dias_entre = $2",
      [id_plan_entrenamiento, dias_entre]
    );

    // Comprobar si la posición ya está en uso
    const existingPositions = existingPositionQuery.rows.map(
      (row) => row.posicion_ejer
    );
    if (existingPositions.includes(posicion_ejer)) {
      return res.status(400).json("Posición ya existe");
    }

    // Insertar el nuevo ejercicio
    const response = await pool.query(
      "INSERT INTO entrenamiento (id_ejercicio, id_plan_entrenamiento, id_tipo_de_ejecucion, dias_entre, posicion_ejer) VALUES ($1, $2, $3, $4, $5)",
      [
        id_ejercicio,
        id_plan_entrenamiento,
        id_tipo_de_ejecucion,
        dias_entre,
        posicion_ejer,
      ]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Ejercicio insertado con exito");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const updateExercisePosition = async (req, res) => {
  try {
    const {id_ejercicio, posicion_ejer} = req.body;
    const response = await pool.query(
      "UPDATE entrenamiento SET posicion_ejer = $1 WHERE id_ejercicio = $2",
      [posicion_ejer, id_ejercicio]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Posición actualizada con éxito");
    }
  } catch (error) {
    res.status(500).json({message: "Error al actualizar la posición"});
  }
};
const deleteTraining = async (req, res) => {
  console.log("Mirame aqui perro, no llores");

  try {
    const {id_ejercicio, id_plan_entrenamiento, dias_entre} = req.body;
    console.log(req.body);

    // Eliminar el ejercicio
    await pool.query(
      "DELETE FROM entrenamiento WHERE id_ejercicio = $1 AND id_plan_entrenamiento = $2",
      [id_ejercicio, id_plan_entrenamiento]
    );

    // Reordenar las posiciones de los ejercicios restantes
    await pool.query(
      `UPDATE entrenamiento
       SET posicion_ejer = subquery.new_pos
       FROM (
         SELECT id_ejercicio,
                ROW_NUMBER() OVER (PARTITION BY id_plan_entrenamiento, dias_entre ORDER BY posicion_ejer) AS new_pos
         FROM entrenamiento
         WHERE id_plan_entrenamiento = $1 AND dias_entre = $2
       ) subquery
       WHERE entrenamiento.id_ejercicio = subquery.id_ejercicio`,
      [id_plan_entrenamiento, dias_entre]
    );

    res.status(200).json("Ejercicio eliminado");
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const selectTrainingPlan = async (req, res) => {
  try {
    const {id_entrenamiento, dias_entre} = req.body;
    const response = await pool.query(
      "select id_ejercicios, nombre_ejercicios, nombre_categoria, nombre_sub, nombre_ejecucion, numero_series,nombre_series,nombre_repeticion, posicion_ejer from repeticiones, series,plan_entrenamiento, entrenamiento, sub_categoria,ejercicios, categoria, categoria_sub, tipo_ejecucion where id_plan_entrenamiento=id_entrenamiento and id_ejercicio=id_ejercicios and id_categoria_cat=id_categoria and id_sub_Cat=id_sub and id_tipo_de_ejecucion=id_ejecucion and id_serie=id_series and id_repes=id_repeticiones and categoria=id_sub_cat and id_entrenamiento=$1 and dias_entre=$2 order by posicion_ejer ASC",
      [id_entrenamiento, dias_entre]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const finishRoutine = async (req, res) => {
  try {
    const {id_entrenamiento, id_repes, id_serie} = req.body;
    const response = await pool.query(
      "update plan_entrenamiento set id_repes = $1, id_serie = $2 where id_entrenamiento = $3",
      [id_repes, id_serie, id_entrenamiento]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Registro completado");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const cancellRoutine = async (req, res) => {
  try {
    const {id_plan_entrenamiento} = req.body;
    const response = await pool.query(
      "delete from entrenamiento where id_plan_entrenamiento = $1",
      [id_plan_entrenamiento]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("ejercicios eliminados");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const cancellRoutinePlan = async (req, res) => {
  try {
    const {id_entrenamiento} = req.body;
    const response = await pool.query(
      "delete from plan_entrenamiento where id_entrenamiento = $1 ",
      [id_entrenamiento]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Rutina eliminada");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const cancelRoutinePlanPersonal = async (req, res) => {
  try {
    const {id_plan_entrenamiento} = req.body;
    const response = await pool.query(
      "delete from entrenamiento where id_plan_entrenamiento = $1",
      [id_plan_entrenamiento]
    );

    if (response.error) {
      res.status(500).json(response.error);
    } else {
      const id_plan_entre = id_plan_entrenamiento;
      const response = await pool.query(
        "delete from plan_entre_usuario where id_plan_entre = $1",
        [id_plan_entre]
      );

      if (response.error) {
        res.status(500).json(response.error);
      } else {
        const id_entrenamiento = id_plan_entre;
        const response = await pool.query(
          "delete from plan_entrenamiento where id_entrenamiento = $1",
          [id_entrenamiento]
        );

        if (response.error) {
          res.status(500).json(response.error);
        } else {
          res.status(200).json("proceso cancelado");
        }
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const selectRoutines = async (req, res) => {
  try {
    const response = await pool.query(
      "select id_entrenamiento, nombre_entrenamiento from plan_entrenamiento where tipo_valoracion = 1"
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const seletOneRoutine = async (req, res) => {
  try {
    const {id_entrenamiento} = req.body;
    const response = await pool.query(
      "select * from plan_entrenamiento where id_entrenamiento = $1",
      [id_entrenamiento]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const updateNameRoutine = async (req, res) => {
  try {
    const {id_entrenamiento, nombre_entrenamiento} = req.body;
    const response = await pool.query(
      "update plan_entrenamiento set nombre_entrenamiento = $1 where id_entrenamiento = $2",
      [nombre_entrenamiento, id_entrenamiento]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Nombre actualizado");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const cleanTraining = async (req, res) => {
  try {
    const {id_plan_entrenamiento} = req.body;
    const response = await pool.query(
      "delete from entrenamiento where id_plan_entrenamiento = $1",
      [id_plan_entrenamiento]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Ejercicios eliminados");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

//Funciones de los planes de entrenamiento personalizados-------------------------------------->

const asssingRoutine = async (req, res) => {
  try {
    const {id_plan_entre, documento_entre} = req.body;
    const response = await pool.query(
      "update plan_entre_usuario set id_plan_entre = $1 where documento_entre = $2",
      [id_plan_entre, documento_entre]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Asignación completada con exito");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};
//Tipo_valoracion hace referencia a tipo_plan donde 1 es General y 2 es Personalziado
const createRoutinePersonal = async (req, res) => {
  try {
    const {id_entrenamiento, documento, nombre_entrenamiento} = req.body;

    const id_repes = 1;
    const id_serie = 1;
    const tipo_valoracion = 2;
    const response = await pool.query(
      "insert into plan_entrenamiento (id_entrenamiento, nombre_entrenamiento, tipo_valoracion, id_repes, id_serie) values ($1,$2,$3,$4,$5)",
      [
        id_entrenamiento,
        nombre_entrenamiento,
        tipo_valoracion,
        id_repes,
        id_serie,
      ]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      const documento_entre = documento;
      const id_plan_entre = id_entrenamiento;
      const respuesta = await pool.query(
        "update plan_entre_usuario set id_plan_entre = $1 where documento_entre = $2",
        [id_plan_entre, documento_entre]
      );

      if (respuesta.error) {
        res.status(401).json(respuesta.error);
      } else {
        res.status(200).json("Plan realizado con exito");
      }
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

//--------------------------------------------------------------------------------------------->

//Métodos para el cliente--------------------------------------------------

const selectTrainingOfUser = async (req, res) => {
  try {
    const {documento, dias_entre} = req.body;
    const response = await pool.query(
      "select id_ejercicio ,nombre_ejercicios, nombre_categoria, nombre_sub, nombre_ejecucion, numero_series,nombre_series,nombre_repeticion, imagen from repeticiones, series,plan_entrenamiento, entrenamiento, sub_categoria,ejercicios, categoria, categoria_sub, tipo_ejecucion, usuarios, plan_entre_usuario where id_plan_entrenamiento=id_entrenamiento and id_ejercicio=id_ejercicios and id_categoria_cat=id_categoria and id_sub_Cat=id_sub and id_tipo_de_ejecucion=id_ejecucion and id_serie=id_series and id_repes=id_repeticiones and categoria=id_sub_cat and id_plan_entre=id_entrenamiento and documento_entre=documento and documento = $1 and dias_entre= $2",
      [documento, dias_entre]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const validatePlanUser = async (req, res) => {
  try {
    const {documento} = req.body;
    const response = await pool.query(
      "select id_plan_entre, documento_entre from plan_entre_usuario, usuarios, plan_entrenamiento where id_plan_entre=id_entrenamiento and documento_entre=documento and documento = $1",
      [documento]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const searchOneTraining = async (req, res) => {
  try {
    const {id_ejercicios, dias_entre} = req.body;
    const response = await pool.query(
      "select nombre_ejercicios, nombre_categoria, nombre_sub, nombre_ejecucion, numero_series,nombre_repeticion, video, imagen, ejercicios.descripcion from repeticiones, series,plan_entrenamiento, entrenamiento, sub_categoria,ejercicios, categoria, categoria_sub, tipo_ejecucion where id_plan_entrenamiento=id_entrenamiento and id_ejercicio=id_ejercicios and id_categoria_cat=id_categoria and id_sub_Cat=id_sub and id_tipo_de_ejecucion=id_ejecucion and id_serie=id_series and id_repes=id_repeticiones and categoria=id_sub_cat and id_ejercicios= $1 and dias_entre = $2 limit 1",
      [id_ejercicios, dias_entre]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const createPlanPersonalUser = async (req, res) => {
  try {
    const {documento_entre, id_entrenamiento, nombre_entrenamiento} = req.body;
    const tipo_valoracion = 2;
    const id_repes = 1;
    const id_serie = 1;
    const response = await pool.query(
      "insert into plan_entrenamiento (id_entrenamiento, nombre_entrenamiento, tipo_valoracion, id_repes, id_serie) values ($1,$2,$3,$4,$5)",
      [
        id_entrenamiento,
        nombre_entrenamiento,
        tipo_valoracion,
        id_repes,
        id_serie,
      ]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      const id_plan_entre = id_entrenamiento;
      const respuesta = await pool.query(
        "update plan_entre_usuario set id_plan_entre = $1 where documento_entre = $2",
        [id_plan_entre, documento_entre]
      );

      if (respuesta.error) {
        res.status(401).json(respuesta.error);
      } else {
        res.status(200).json("Plan personal creado con exito");
      }
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

//-------------------------------------------------------------------------

//Exportar los métodos-------------------------------------------------->

module.exports = {
  createRoutine,
  selectDay,
  selectSeries,
  selectRepetitions,
  selectTipoEjecucion,
  createTraining,
  updateExercisePosition,
  deleteTraining,
  selectTrainingPlan,
  finishRoutine,
  cancellRoutine,
  cancellRoutinePlan,
  cancelRoutinePlanPersonal,
  selectRoutines,
  seletOneRoutine,
  updateNameRoutine,
  cleanTraining,

  asssingRoutine,
  createRoutinePersonal,

  selectTrainingOfUser,
  validatePlanUser,
  searchOneTraining,

  createPlanPersonalUser,
};

//SELECT id_plan_entrenamiento,nombres, primer_apellido, segundo_apellido, id_repeticiones, nombre_repeticion, id_series,numero_series, id_ejercicio, nombre_ejercicios, ejercicios.descripcion, imagen,nombre_categoria,nombre_sub, id_tipo_de_ejecucion, nombre_ejecucion, tipo_ejecucion.descripcion dias_entre, nombre_dias FROM entrenamiento, categoria, plan_entrenamiento, usuarios, repeticiones, series, ejercicios, categoria_sub, sub_categoria,tipo_ejecucion, dias, plan_entre_usuario where id_plan_entre=id_entrenamiento and documento_entre=documento and id_repes=id_repeticiones and id_serie=id_series and id_tipo_de_ejecucion=id_ejecucion and dias_entre= id_dias and id_categoria_cat=id_categoria and id_sub_cat=id_sub and categoria=id_sub and id_entrenamiento = '97147295'
