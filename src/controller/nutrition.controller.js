const {json} = require("body-parser");
const {response} = require("express");
const res = require("express/lib/response");
const {Pool} = require("pg");

//Conexión a la base de datos------------------------------------------------------>

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "gimnasio",
  port: 5432,
});

//Definición de los métodos--------------------------------------------------------->

const selectNewUsers = async (req, res) => {
  try {
    const response = await pool.query(`
    SELECT
      u.documento,
      u.nombres,
      u.primer_apellido,
      u.segundo_apellido
    FROM usuarios u
    INNER JOIN rol r ON u.rol = r.id_rol
    WHERE r.id_rol = 5
      AND u.documento NOT IN (
        SELECT documento_plan
        FROM plan_nutricional_usuarios
      );
    `);
    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.json(error.message);
  }
};

const selectOldUsers = async (req, res) => {
  try {
    const response = await pool.query(
      "select documento,nombre_tipo_nutri,id_plan, nombres, primer_apellido, segundo_apellido from usuarios,plan_nutricional, plan_nutricional_usuarios, tipo_nutricional, rol where plan_nutricional_usuarios.id_plan_nutri=id_plan and documento_plan=documento and tipo= tipo_nutricional.id_plan_nutri and rol=id_rol and rol=5"
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

const selectNutritionGeneral = async (req, res) => {
  try {
    const response = await pool.query(
      "select id_plan, nombre_plan, tipo, nombre_tipo_nutri from plan_nutricional, tipo_nutricional where tipo=id_plan_nutri and tipo =1"
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

const searchOnePlanNutrition = async (req, res) => {
  try {
    const {id_plan} = req.body;
    const response = await pool.query("select ");

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const assingNutritionForNewUser = async (req, res) => {
  try {
    const {id_plan_nutri, documento_plan, fecha_fin, meta} = req.body;
    const response = await pool.query(
      "insert into plan_nutricional_usuarios (id_plan_nutri, documento_plan, fecha_inicio, fecha_fin, meta) values ($1,$2,current_date,$3,$4)",
      [id_plan_nutri, documento_plan, fecha_fin, meta]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Plan Nutricional asignado con exito");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const assingNutritionForOldUser = async (req, res) => {
  try {
    const {id_plan_nutri, documento_plan, fecha_fin, meta} = req.body;
    const response = await pool.query(
      "update plan_nutricional_usuarios set id_plan_nutri = $1, fecha_inicio = current_date, fecha_fin = $2, meta = $3 where documento_plan = $4",
      [id_plan_nutri, fecha_fin, meta, documento_plan]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Plan Nutricional asignado con exito");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const selectNameNutrition = async (req, res) => {
  try {
    const {id_plan} = req.body;
    const response = await pool.query(
      "select * from plan_nutricional where id_plan = $1",
      [id_plan]
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

const selectDateNutrition = async (req, res) => {
  try {
    const {documento_plan} = req.body;
    const response = await pool.query(
      "select * from plan_nutricional_usuarios where documento_plan = $1",
      [documento_plan]
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

const updateNutrition = async (req, res) => {
  try {
    const {documento_plan, fecha_fin, meta} = req.body;
    const response = await pool.query(
      "update plan_nutricional_usuarios set fecha_fin = $1, meta = $2 where documento_plan = $3",
      [fecha_fin, meta, documento_plan]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Actualización de los datos del plan de nutricion");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

//Métodos para planes de alimentación para el nutricionista------------------------

const createPlanNutrition = async (req, res) => {
  try {
    const {id_plan, nombre_plan, tipo} = req.body;
    const response = await pool.query(
      "insert into plan_nutricional (id_plan, nombre_plan, tipo) values ($1,$2,$3)",
      [id_plan, nombre_plan, tipo]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Plan Creado con exito");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const createPlanNutritionPersonal = async (req, res) => {
  try {
    const {id_plan, nombre_plan, documento_plan, fecha_fin, meta} = req.body;
    console.log(req.body);
    const tipo = 2;
    const response = await pool.query(
      "insert into plan_nutricional (id_plan, nombre_plan, tipo) values ($1,$2,$3)",
      [id_plan, nombre_plan, tipo]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      const id_plan_nutri = id_plan;

      const respuesta = await pool.query(
        "insert into plan_nutricional_usuarios (id_plan_nutri, documento_plan, fecha_inicio, fecha_fin, meta) values ($1,$2,current_date,$3,$4)",
        [id_plan_nutri, documento_plan, fecha_fin, meta]
      );

      if (respuesta.error) {
        res.status(401).json(respuesta.error);
      } else {
        res.status(200).json("Plan nutricional creado con exito");
      }
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const selectAlimento = async (req, res) => {
  try {
    const response = await pool.query("select * from tipo_de_alimento");

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const selectIngredientes = async (req, res) => {
  try {
    const {id_alimento} = req.body;
    const response = await pool.query(
      "select id_ingrediente, nombre_ingrediente from ingrediente, tipo_de_alimento where tipo_alimento = id_alimento and id_alimento = $1",
      [id_alimento]
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

const createAlimento = async (req, res) => {
  try {
    const {
      id_nutricional,
      id_tiempo_tiempo,
      id_ingrediente_nutri,
      intercambio,
      cantidad,
    } = req.body;
    const response = await pool.query(
      "insert into nutricional (id_nutricional, id_tiempo_tiempo, id_ingrediente_nutri, intercambio, cantidad) values ($1,$2,$3,$4,$5)",
      [
        id_nutricional,
        id_tiempo_tiempo,
        id_ingrediente_nutri,
        intercambio,
        cantidad,
      ]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Alimento insertado con exito");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const validateBreakfast = async (req, res) => {
  try {
    const {id_nutricional, id_tiempo_tiempo} = req.body;
    const response = await pool.query(
      "SELECT count(id_nutricional) as conteo, id_tiempo_tiempo FROM nutricional, tiempo, tipo_de_alimento, ingrediente, plan_nutricional where id_nutricional=id_plan and id_tiempo_tiempo=id_tiempo and id_ingrediente_nutri=id_ingrediente and tipo_alimento=id_alimento and id_nutricional= $1 and id_tiempo_tiempo= $2 group by id_nutricional, id_tiempo_tiempo",
      [id_nutricional, id_tiempo_tiempo]
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

const cancellPocess = async (req, res) => {
  try {
    const {id_nutricional} = req.body;
    const response = await pool.query(
      "delete from nutricional where id_nutricional = $1",
      [id_nutricional]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      const id_plan = id_nutricional;
      const respuesta = await pool.query(
        "delete from plan_nutricional where id_plan = $1",
        [id_plan]
      );

      if (respuesta.error) {
        res.status(401).json(respuesta.error);
      } else {
        res.status(200).json("Plan nutricional eliminado con exito");
      }
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const cancellPocessPersonal = async (req, res) => {
  try {
    const {id_nutricional, documento_plan} = req.body;
    const response = await pool.query(
      "delete from nutricional where id_nutricional = $1",
      [id_nutricional]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      const id_plan_nutri = id_nutricional;
      const respuesta = await pool.query(
        "delete from plan_nutricional_usuarios where id_plan_nutri = $1 and documento_plan = $2",
        [id_plan_nutri, documento_plan]
      );

      if (respuesta.error) {
        res.status(401).json(respuesta.error);
      } else {
        const id_plan = id_nutricional;
        const resultado = await pool.query(
          "delete from plan_nutricional where id_plan = $1",
          [id_plan]
        );

        if (resultado.error) {
          res.status(401).json(resultado.error);
        } else {
          res.status(200).json("Proceso personal cancelado con exito");
        }
      }
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const assingNutritionOldUser = async (req, res) => {
  try {
    const {id_plan, nombre_plan, documento_plan, fecha_fin, meta} = req.body;
    const tipo = 2;
    const response = await pool.query(
      "insert into plan_nutricional (id_plan, nombre_plan, tipo) values ($1,$2,$3)",
      [id_plan, nombre_plan, tipo]
    );

    if (response.error) {
      res.status(401).json(response.eror);
    } else {
      const id_plan_nutri = id_plan;
      const respuesta = await pool.query(
        "update plan_nutricional_usuarios set id_plan_nutri = $1, fecha_inicio = current_date, fecha_fin = $2, meta = $3 where documento_plan = $4",
        [id_plan_nutri, fecha_fin, meta, documento_plan]
      );

      if (respuesta.error) {
        res.status(401).json(respuesta.error);
      } else {
        res.status(200).json("Nutricion creado con exito");
      }
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const selectRegisteredNutrition = async (req, res) => {
  try {
    const {id_plan, id_tiempo} = req.body;
    const response = await pool.query(
      "SELECT id_nutricional, id_tiempo_tiempo,nombre_tiempo, id_ingrediente_nutri,nombre_ingrediente,nombre_alimento, intercambio, cantidad, id_alimento FROM nutricional, tiempo, tipo_de_alimento, ingrediente, plan_nutricional where id_nutricional=id_plan and id_tiempo_tiempo=id_tiempo and id_ingrediente_nutri=id_ingrediente and tipo_alimento=id_alimento and id_tiempo = $1 and id_plan= $2",
      [id_tiempo, id_plan]
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

const selectOneRegisteredNutrition = async (req, res) => {
  try {
    const {id_plan, id_ingrediente_nutri, id_tiempo} = req.body;
    const response = await pool.query(
      "SELECT id_nutricional, id_tiempo_tiempo,nombre_tiempo, id_ingrediente_nutri,nombre_ingrediente,id_alimento,nombre_alimento, intercambio, cantidad FROM nutricional, tiempo, tipo_de_alimento, ingrediente, plan_nutricional where id_nutricional=id_plan and id_tiempo_tiempo=id_tiempo and id_ingrediente_nutri=id_ingrediente and tipo_alimento=id_alimento and id_tiempo = $1 and id_plan= $2 and id_ingrediente_nutri= $3",
      [id_tiempo, id_plan, id_ingrediente_nutri]
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

const deleteDataNutrition = async (req, res) => {
  try {
    const {id_nutricional, id_tiempo_tiempo, id_ingrediente_nutri} = req.body;
    console.log(req.body);
    const response = await pool.query(
      "delete from nutricional where id_nutricional = $1 and id_tiempo_tiempo = $2 and id_ingrediente_nutri = $3",
      [id_nutricional, id_tiempo_tiempo, id_ingrediente_nutri]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Informacion eliminada con exito");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

//View Información the Plan alimentación-------------------------------------------------------

const searchNameNutrition = async (req, res) => {
  try {
    const {id_plan} = req.body;
    const response = await pool.query(
      "select * from plan_nutricional where id_plan = $1",
      [id_plan]
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

const selectDataNutritionPersonal = async (req, res) => {
  try {
    const {id_plan, documento} = req.body;
    const response = await pool.query(
      "select age(fecha_fin, fecha_inicio), date_part('year', age(fecha_fin, fecha_inicio))as año, date_part('month', age(fecha_fin, fecha_inicio)) as mes, date_part('day', age(fecha_fin, fecha_inicio)) as dias,id_plan, nombre_plan, fecha_inicio, fecha_fin,meta from plan_nutricional, plan_nutricional_usuarios, usuarios where  documento_plan=documento and id_plan_nutri=id_plan and id_plan = $1 and documento= $2",
      [id_plan, documento]
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

const selectInfoGeneralUser = async (req, res) => {
  try {
    const {documento, id_plan_nutri} = req.body;
    const response = await pool.query(
      "select documento, nombres, primer_apellido, age(current_date,fecha_nacimiento) as edad, segundo_apellido, nombre_tipo_genero, correo,numero_telefono,fuma, alcohol, cafe, ejercicio, cirugias, alergia,enfermedad,medicamento from usuarios, telefono, tipo_usuario, info_general, medicamentos, enfermedades, alergias, genero, tipo_valoracion, tipo_nutricional, plan_nutricional_usuarios, plan_nutricional where documento_usuario=documento and documento_tipo=documento and info_general=id_info and alergias=id_alergias and medicamentos=id_medicamentos and enfermedades=id_enfermedad and genero=id_genero and id_valoracion_tipo=id_valoracion and plan_nutricional_usuarios.id_plan_nutri=id_plan and tipo= tipo_nutricional.id_plan_nutri  and  documento_plan=documento and documento= $1 and plan_nutricional_usuarios.id_plan_nutri= $2",
      [documento, id_plan_nutri]
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

const selectRegisteredAlimentoUsers = async (req, res) => {
  try {
    const {id_tiempo, id_plan, documento} = req.body;
    const response = await pool.query(
      "SELECT id_nutricional, id_tiempo_tiempo,nombre_tiempo, id_ingrediente_nutri,nombre_ingrediente,nombre_alimento, intercambio, cantidad, id_alimento FROM nutricional, tiempo, tipo_de_alimento, ingrediente, plan_nutricional, plan_nutricional_usuarios, usuarios where id_nutricional=id_plan and id_tiempo_tiempo=id_tiempo and id_ingrediente_nutri=id_ingrediente and tipo_alimento=id_alimento and id_plan_nutri=id_plan and documento_plan=documento and id_tiempo = $1 and id_plan= $2 and documento= $3",
      [id_tiempo, id_plan, documento]
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

//Métodos del cliente---------------------------------------------------------------

const searchIDNutrition = async (req, res) => {
  try {
    const {documento_plan} = req.body;
    const response = await pool.query(
      "select id_plan_nutri from plan_nutricional_usuarios where documento_plan = $1",
      [documento_plan]
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

//----------------------------------------------------------------------------------

const selectEmailUserNutrition = async (req, res) => {
  try {
    const {id_plan_nutri} = req.body;
    const response = await pool.query(
      "select documento, correo from plan_nutricional_usuarios, usuarios where documento_plan = documento and id_plan_nutri = $1",
      [id_plan_nutri]
    );

    if (response.error) {
      res.status(500).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//Exportar lo métodos--------------------------------------------------------------->

module.exports = {
  selectNewUsers,
  selectOldUsers,
  selectNutritionGeneral,
  searchOnePlanNutrition,
  assingNutritionForNewUser,
  assingNutritionForOldUser,
  selectNameNutrition,
  selectDateNutrition,
  updateNutrition,
  createPlanNutrition,
  createPlanNutritionPersonal,
  selectAlimento,
  selectIngredientes,
  createAlimento,
  validateBreakfast,
  cancellPocess,
  cancellPocessPersonal,
  assingNutritionOldUser,
  selectRegisteredNutrition,
  selectOneRegisteredNutrition,
  deleteDataNutrition,
  searchNameNutrition,
  selectDataNutritionPersonal,
  selectInfoGeneralUser,
  selectRegisteredAlimentoUsers,

  searchIDNutrition,

  selectEmailUserNutrition,
};
