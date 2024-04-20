const res = require("express/lib/response");
const {symlink} = require("fs");
const {Pool} = require("pg");

const Cryptr = require("cryptr");
const {AsyncLocalStorage} = require("async_hooks");
const {json} = require("body-parser");

//Conexión con la base de datos-------------------------------------------------------->

const pool = new Pool({
  host: "localhost",
  database: "gimnasio",
  user: "postgres",
  port: 5432,
  password: "1234",
});

//Definición de variables de encriptación---------------------------------------------->

const cryptr = new Cryptr("WmZq4t7w9z$C&FJ@NcRfUjXn2r5u8x/");

//Definición de variables que contienen funciones--------------------------------------->

const selectUsers = async (req, res) => {
  try {
    const {documento} = req.body;
    const response = await pool.query(
      "select documento, nombres, primer_apellido, segundo_apellido,nombre_rol,nombre_cuenta, nombre_tipo_genero from usuarios,rol, genero,estado_cuenta where genero = id_genero and estado=id_cuenta and rol=id_rol and NOT documento=$1",
      [documento]
    );
    res.json(response.rows);
  } catch (error) {
    res.status(401).json("Error en el servidor, intentelo más tarde");
  }
};

const selectDocument = async (req, res) => {
  try {
    const response = await pool.query("select * from tipo_documento");
    res.json(response.rows);
  } catch (error) {
    res.status(401).json("Error en el servidor, intentelo más tarde");
  }
};

const selectRol = async (req, res) => {
  try {
    const response = await pool.query("select * from rol where not id_rol = 5");
    res.json(response.rows);
  } catch (error) {
    res.status(401).json("Error en el servidor, intentelo más tarde.");
  }
};

const selectAllRole = async (req, res) => {
  try {
    const response = await pool.query("select * from rol");

    if (response.error) {
      res.status(500).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const selectGender = async (req, res) => {
  try {
    const response = await pool.query("select * from genero");
    res.json(response.rows);
  } catch (error) {
    res.status(401).json("Error en el servidor, intente más tarde");
  }
};

const createUsers = async (req, res) => {
  try {
    const {
      documento,
      correo,
      nombres,
      primer_apellido,
      segundo_apellido,
      rol,
      id_documento,
      genero,
      telefono,
    } = req.body;
    const password = cryptr.encrypt(documento);
    const estado = 1;
    const img = 1;

    const response = await pool.query(
      "insert into usuarios(documento,correo,password, nombres, primer_apellido, segundo_apellido,rol, tipo_de_documento,estado, genero, img) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [
        documento,
        correo,
        password,
        nombres,
        primer_apellido,
        segundo_apellido,
        rol,
        id_documento,
        estado,
        genero,
        img,
      ]
    );

    if (response.error) {
      res.status(401).json("El documento que ingreso ya se cuenta registrado");
    } else {
      const respuesta = await pool.query(
        "insert into telefono(documento_usuario, numero_telefono)values($1,$2)",
        [documento, telefono]
      );
      if (respuesta.error) {
        res
          .status(401)
          .json("Imposible registrar el usuario, intente nuevamente");
      } else {
        res.json("Usuario registrado satisfactoriamente");
      }
    }
  } catch (error) {
    const ner = error.length;

    if (ner == 207) {
      res
        .status(207)
        .json(
          "El documento que ingreso ya se encuentra registrado, intente nuevamente"
        );
    }
  }
};

const updateUsers = async (req, res) => {
  try {
    const {
      documento,
      nombres,
      primer_apellido,
      segundo_apellido,
      numero_telefono,
      correo,
      rol,
    } = req.body;

    const response = await pool.query(
      "update usuarios set nombres = $1, primer_apellido = $2, segundo_apellido = $3, correo = $4, rol = $5 where documento = $6",
      [nombres, primer_apellido, segundo_apellido, correo, rol, documento]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      const documento_usuario = documento;
      const respuesta = await pool.query(
        "update telefono set numero_telefono = $1 where documento_usuario = $2",
        [numero_telefono, documento_usuario]
      );

      if (respuesta.error) {
        res.status(401).json(respuesta.error);
      } else {
        res.status(200).json("Datos actualizados con éxito");
      }
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

const selectUser = async (req, res) => {
  try {
    const {documento} = req.body;
    const response = await pool.query(
      "select documento,correo, nombres, primer_apellido, segundo_apellido,rol, tipo_de_documento,estado, genero, numero_telefono from usuarios, telefono where documento_usuario = documento and documento = $1",
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

const updateState = async (req, res) => {
  const {document, state} = req.body;
  console.log(req.body);
  const response = await pool.query(
    "update usuarios set estado = $1 where documento = $2",
    [state, document]
  );

  if (response.rowCount > 0) {
    res.status(200).json("Estado actualizado con éxito");
  } else {
    res.status(401).json("No se encontró un registro, intentelo nuevamente");
  }
};

const selectHistory = async (req, res) => {
  try {
    const {documento} = req.body;
    const response = await pool.query(
      "select fecha_asistencia, hora_asistencia from usuarios, asistencia, asistencia_usuario where documento_asistencia=documento and id_asistencia_usuario=id_asistencia and documento=$1",
      [documento]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(401).json(error);
  }
};

const promedioAssist = async (req, res) => {
  try {
    const {documento} = req.body;
    const response = await pool.query(
      "select COUNT(id_asistencia) as contar, Round(Count('contar')*100/extract(doy FROM current_date)::numeric, 2) AS promedio from asistencia,usuarios, asistencia_usuario where documento_asistencia=documento and id_asistencia_usuario=id_asistencia and documento = $1",
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

const meanOneMonth = async (req, res) => {
  try {
    const {documento, mes} = req.body;
    const response = await pool.query(
      "select sum(promedio) from(select COUNT(id_asistencia) as contar, Round(Count('contar')*100/extract(days FROM date_trunc('month',fecha_asistencia) + interval '1 month - 1 day')::numeric, 2) AS promedio from asistencia,usuarios, asistencia_usuario where documento_asistencia=documento and id_asistencia_usuario=id_asistencia and documento = $1 and extract(month from fecha_asistencia)=$2 group by fecha_asistencia) as promedio_real",
      [documento, mes]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

const selectDays = async (req, res) => {
  try {
    const {documento, mes} = req.body;
    const response = await pool.query(
      "select COUNT(id_asistencia) as contar from asistencia,usuarios, asistencia_usuario where documento_asistencia=documento and id_asistencia_usuario=id_asistencia and documento = $1 and extract(month from fecha_asistencia)=$2",
      [documento, mes]
    );

    if (response.error) {
      res.status(404).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(404).json(error.details);
  }
};

const selectClient = async (req, res) => {
  try {
    const response = await pool.query(
      "select documento, nombres, primer_apellido,segundo_apellido, correo from usuarios where rol = 5"
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(404).json(error.details);
  }
};

const selectImgUser = async (req, res) => {
  try {
    const {documento} = req.body;
    const response = await pool.query(
      "Select foto_personal from foto, usuarios where img= id_foto and documento= $1",
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

//Métodos para el perfil----------------------------------------------------------------->

const profileUser = async (req, res) => {
  try {
    const {documento} = req.body;
    const response = await pool.query(
      "select documento,correo, nombres, primer_apellido, segundo_apellido,nombre_rol, nombre_tipo_documento, nombre_tipo_genero, numero_telefono, foto_personal from foto, tipo_documento, genero, rol, usuarios, telefono where rol = id_rol and tipo_de_documento = id_documento and genero = id_genero and documento_usuario = documento and img = id_foto and documento_usuario = documento and documento = $1",
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

const selectVerifyImg = async (req, res) => {
  try {
    const {documento} = req.body;
    const response = await pool.query(
      "select img from usuarios where documento = $1",
      [documento]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.error);
  }
};

const deleteImgProfile = async (req, res) => {
  try {
    const {id_foto, documento} = req.body;
    const img = 1;
    const response = await pool.query(
      "update usuarios set img = $1 where documento = $2",
      [img, documento]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      const respuesta = await pool.query(
        "delete from foto where id_foto = $1",
        [id_foto]
      );

      if (respuesta.error) {
        res.status(401).json(respuesta.error);
      } else {
        res.status(200).json("Imagen eliminada con exito");
      }
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      documento,
      correo,
      nombres,
      primer_apellido,
      segundo_apellido,
      numero_telefono,
    } = req.body;
    const response = await pool.query(
      "update usuarios set correo = $1, nombres = $2, primer_apellido = $3, segundo_apellido = $4 where documento = $5",
      [correo, nombres, primer_apellido, segundo_apellido, documento]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      const documento_usuario = documento;
      const respuesta = await pool.query(
        "update telefono set numero_telefono = $1 where documento_usuario = $2",
        [numero_telefono, documento_usuario]
      );

      if (respuesta.error) {
        res.status(401).json(respuesta.error);
      } else {
        res.status(200).json("Datos del perfil actualizados");
      }
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const selectPasswordProfile = async (req, res) => {
  try {
    const {documento, password} = req.body;
    const response = await pool.query(
      "select password from usuarios where documento = $1",
      [documento]
    );

    if (response.error) {
      res.status(500).json(response.error);
    } else {
      if (response.rowCount == 0) {
        res.status(200).json("Documento incorrecto");
      } else if (response.rowCount >= 1) {
        const password_act = response.rows[0].password;
        const password_decryp = cryptr.decrypt(password_act);
        if (password_decryp == password) {
          res.status(200).json("Documento y contraseña correctos");
        }
      }
    }
  } catch (error) {
    res.status(500).json(error.details);
  }
};

const updatePassword = async (req, res) => {
  try {
    const {documento, password} = req.body;
    const password1 = cryptr.encrypt(password);
    const response = await pool.query(
      "update usuarios set password = $1 where documento = $2",
      [password1, documento]
    );

    if (response.error) {
      res.status(500).json(response.error);
    } else {
      res.status(200).json("Contraseña actualizada con exito");
    }
  } catch (error) {
    res.status(500).json(error.details);
  }
};

//--------------------------------------------------------------------------------------->

//Funciones del plan de entrenamiento personalizado-------------------------------------->

const selectUsersPlan = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT documento,nombres, primer_apellido, segundo_apellido, id_entrenamiento, nombre_entrenamiento FROM plan_entrenamiento, plan_entre_usuario, usuarios,rol where id_plan_entre= id_entrenamiento and documento_entre=documento and rol=id_rol and id_rol=5"
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

//--------------------------------------------------------------------------------------->

//Sección para los planes de entrenamiento----------------------------------------------->

const selectNewUsers = async (req, res) => {
  try {
    const response = await pool.query(
      "select documento,id_valoracion,nombre_valoracion, nombres, primer_apellido, segundo_apellido from usuarios, tipo_valoracion, tipo_usuario where id_valoracion_tipo=id_valoracion and documento_tipo=documento except select documento,id_valoracion,nombre_valoracion, nombres, primer_apellido, segundo_apellido from usuarios,valoracion_avanzada, medidas, grasa_corporal, masa_muscular,tipo_valoracion, tipo_usuario where documento_valoracion=documento and id_medidas_valoracion=id_medidas and id_medidas_valoracion=id_medidas and id_masa_valoracion=id_masa and id_grasa_valoracion=id_grasa except select documento,id_valoracion,nombre_valoracion, nombres, primer_apellido, segundo_apellido from usuarios,valoracion_basica, medidas,tipo_valoracion, tipo_usuario where documento_valoracion=documento and id_medidas_valoracion=id_medidas"
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

const selectOldUsersFirstPart = async (req, res) => {
  try {
    const response = await pool.query(
      "select nombre_valoracion, documento, nombres, primer_apellido, segundo_apellido from usuarios, tipo_valoracion, tipo_usuario,valoracion_basica, medidas where documento_valoracion=documento and id_medidas_valoracion=id_medidas and id_valoracion_tipo=id_valoracion and documento_tipo=documento group by nombre_valoracion, documento"
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

const selectOldUsersSecondtPart = async (req, res) => {
  try {
    const response = await pool.query(
      "select nombre_valoracion, documento, nombres, primer_apellido, segundo_apellido from usuarios, tipo_valoracion, tipo_usuario,valoracion_avanzada, medidas, grasa_corporal, masa_muscular where documento_valoracion=documento and id_medidas_valoracion=id_medidas and id_valoracion_tipo=id_valoracion and documento_tipo=documento and id_masa_valoracion=id_masa and id_grasa_valoracion=id_grasa group by nombre_valoracion, documento"
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
    const {documento} = req.body;
    const response = await pool.query(
      "select documento, nombres, primer_apellido, age(current_date,fecha_nacimiento) as edad, segundo_apellido, nombre_tipo_genero, correo,numero_telefono,fuma, alcohol, cafe, ejercicio, cirugias, alergia,enfermedad,medicamento from usuarios, telefono, tipo_usuario, info_general, medicamentos, enfermedades, alergias, genero, tipo_valoracion where documento_usuario=documento and documento_tipo=documento and info_general=id_info and alergias=id_alergias and medicamentos=id_medicamentos and enfermedades=id_enfermedad and genero=id_genero and id_valoracion_tipo=id_valoracion and documento = $1",
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

const selectGenderUser = async (req, res) => {
  try {
    const {documento} = req.body;
    const response = await pool.query(
      "select nombre_tipo_genero from genero, usuarios where id_genero = genero and documento = $1",
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

//--------------------------------------------------------------------------------------->

//Metodos del cliente----------------------------------------------------

const registeredAssist = async (req, res) => {
  try {
    const {id_asistencia_usuario, documento_asistencia} = req.body;
    const id_asistencia = id_asistencia_usuario;
    const response = await pool.query(
      "insert into asistencia (id_asistencia, fecha_asistencia) values ($1,current_date)",
      [id_asistencia]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      const respuesta = await pool.query(
        "insert into asistencia_usuario (id_asistencia_usuario, documento_asistencia, hora_asistencia) values ($1,$2,current_time)",
        [id_asistencia_usuario, documento_asistencia]
      );

      if (respuesta.error) {
        res.status(401).json(respuesta.error);
      } else {
        res.status(200).json("Asistencia registrada con exito");
      }
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const confirmAssist = async (req, res) => {
  try {
    const {documento, fecha_asistencia} = req.body;
    const response = await pool.query(
      "SELECT concat( extract( day from fecha_asistencia)||' '||'de'||' '|| to_char(fecha_asistencia,'TMMonth')||' '||'del'||' '||extract(year from fecha_asistencia)) as fecha,fecha_asistencia, concat(extract( hour from hora_asistencia) ||':'|| extract (minute from hora_asistencia)) as hora FROM asistencia, usuarios, asistencia_usuario where documento_asistencia=documento and id_asistencia_usuario=id_asistencia and  documento= $1 and fecha_asistencia = $2",
      [documento, fecha_asistencia]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.body);
  }
};

const selectNumberDays = async (req, res) => {
  try {
    const {documento} = req.body;
    const response = await pool.query(
      "select age(fecha_de_fin, current_date), date_part('year', age(fecha_de_fin, current_date))as año, date_part('month', age(fecha_de_fin, current_date)) as mes, date_part('day', age(fecha_de_fin, current_date)) as dias from pago, usuarios, suscripcion where id_suscripcion_pago=id_suscripcion and documento_usuarios_pago=documento and documento= $1",
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

const selectDataUserDateInitAndFinish = async (req, res) => {
  try {
    const {documento} = req.body;
    const response = await pool.query(
      "select concat(extract(day from fecha_de_inicio)||' '||'de'||' '|| to_char(fecha_de_inicio,'TMMonth')||' '||'del'||' '||extract(year from fecha_de_inicio)) as fecha_inicio, concat(extract(day from fecha_de_fin)||' '||'de'||' '|| to_char(fecha_de_fin,'TMMonth')||' '||'del'||' '||extract(year from fecha_de_fin)) as fecha_fin, titulo_suscripcion from pago, usuarios, suscripcion where id_suscripcion_pago=id_suscripcion and documento_usuarios_pago=documento and documento= $1",
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

//Metodos del cliente------------------------------------------

//Métodos de la recepcion-----------------------------------------------------------------

const selectAllClient = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT documento, nombres, primer_apellido, segundo_apellido,id_suscripcion,titulo_suscripcion, tipo_de_documento, nombre_cuenta,nombre_tipo_genero FROM usuarios, suscripcion, pago,estado_cuenta, genero where estado=id_cuenta and genero=id_genero and id_suscripcion_pago=id_suscripcion and documento_usuarios_pago=documento and rol=5"
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

const searchSuscription = async (req, res) => {
  try {
    const {id_suscripcion, documento} = req.body;
    const response = await pool.query(
      "select titulo_suscripcion, precio, fecha_de_inicio, fecha_de_fin, duracion from suscripcion, pago, usuarios where documento_usuarios_pago = documento and id_suscripcion = id_suscripcion and id_suscripcion = $1 and documento = $2",
      [id_suscripcion, documento]
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

const updateStateClient = async (req, res) => {
  try {
    const {documento, estado} = req.body;
    const response = await pool.query(
      "update usuarios set estado = $1 where documento = $2",
      [estado, documento]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Estado del cliente actualizado con exito");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const selectPlanSuscription = async (req, res) => {
  try {
    const response = await pool.query("select * from suscripcion");

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const selectTypeValoracion = async (req, res) => {
  try {
    const response = await pool.query("select * from tipo_valoracion");

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const createNewUser = async (req, res) => {
  try {
    const {
      documento,
      nombres,
      primer_apellido,
      segundo_apellido,
      tipo_de_documento,
      correo,
      estado,
      genero,
      img,
      fecha_nacimiento,
      numero_telefono,
      id_suscripcion_pago,
      fecha_de_fin,
      id_valoracion_tipo,
    } = req.body;
    const rol = 5;
    const password = cryptr.encrypt(documento);
    const response = await pool.query(
      "insert into usuarios (documento, correo, password, nombres, primer_apellido, segundo_apellido, rol, tipo_de_documento,estado,genero,img,fecha_nacimiento) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        documento,
        correo,
        password,
        nombres,
        primer_apellido,
        segundo_apellido,
        rol,
        tipo_de_documento,
        estado,
        genero,
        img,
        fecha_nacimiento,
      ]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      const documento_usuario = documento;
      const response = await pool.query(
        "insert into telefono (documento_usuario,numero_telefono) values ($1,$2)",
        [documento_usuario, numero_telefono]
      );

      if (response.error) {
        res.status(401).json(response.error);
      } else {
        const documento_usuario_pago = documento;
        const response = await pool.query(
          "insert into pago (id_suscripcion_pago,documento_usuarios_pago, fecha_de_inicio, fecha_de_fin) values ($1,$2,current_date,$3)",
          [id_suscripcion_pago, documento_usuario_pago, fecha_de_fin]
        );

        if (response.error) {
          res.status(401).json(response.error);
        } else {
          const documento_tipo = documento;
          const response = await pool.query(
            "insert into tipo_usuario (id_valoracion_tipo,documento_tipo) values ($1,$2)",
            [id_valoracion_tipo, documento_tipo]
          );

          if (response.error) {
            res.status(401).json(response.error);
          } else {
            res.status(200).json("Nuevo usuario creado con éxito");
          }

          if (response.error) {
            res.status(401).json(response.error);
          } else {
            const documento_entre = documento;
            const id_plan_entre = 68642480;
            const respuesta = await pool.query(
              "insert into plan_entre_usuario (id_plan_entre,documento_entre) values ($1, $2)",
              [id_plan_entre, documento_entre]
            );

            if (respuesta.error) {
              res.status(401).json(respuesta.error);
            } else {
              res.status(200).json("Plan realizado con exito");
            }
          }
        }
      }
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const searchPerfilUser = async (req, res) => {
  try {
    const {documento} = req.body;
    const response = await pool.query(
      "select documento, nombres, primer_apellido, age(current_date,fecha_nacimiento) as edad, segundo_apellido, correo,numero_telefono,foto_personal from usuarios, telefono, foto where documento_usuario=documento and img=id_foto and documento= $1",
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

const validateDateFin = async (req, res) => {
  try {
    const {documento_usuarios_pago} = req.body;
    const response = await pool.query(
      "select fecha_de_inicio, fecha_de_fin from pago where documento_usuarios_pago = $1",
      [documento_usuarios_pago]
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

const updatePlanUserm = async (req, res) => {
  try {
    const {documento_usuarios_pago, id_suscripcion_pago, fecha_de_fin} =
      req.body;
    const response = await pool.query(
      "update pago set id_suscripcion_pago = $1, fecha_de_inicio = current_date, fecha_de_fin = $2 where documento_usuarios_pago = $3",
      [id_suscripcion_pago, fecha_de_fin, documento_usuarios_pago]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Plan actualizado con exito");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const updateTypeAssessmentUser = async (req, res) => {
  try {
    const {id_valoracion_tipo, documento_tipo} = req.body;
    const response = await pool.query(
      "update tipo_usuario set id_valoracion_tipo = $1 where documento_tipo = $2",
      [id_valoracion_tipo, documento_tipo]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Tipo de valoracion actualizada");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const updateDatePerfil = async (req, res) => {
  try {
    const {
      documento,
      nombres,
      primer_apellido,
      segundo_apellido,
      correo,
      numero_telefono,
    } = req.body;
    const response = await pool.query(
      "update usuarios set nombres = $1, primer_apellido = $2, segundo_apellido = $3, correo = $4 where documento = $5",
      [nombres, primer_apellido, segundo_apellido, correo, documento]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      const documento_usuario = documento;
      const response = await pool.query(
        "update telefono set numero_telefono = $1 where documento_usuario = $2",
        [numero_telefono, documento_usuario]
      );

      if (response.error) {
        res.status(401).json(response.error);
      } else {
        res.status(200).json("Perfil actualizado con exito");
      }
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

const updateTimePago = async (req, res) => {
  try {
    const {documento_usuarios_pago, fecha_de_fin} = req.body;
    const response = await pool.query(
      "update pago set fecha_de_inicio = current_date, fecha_de_fin = $1 where documento_usuarios_pago = $2",
      [fecha_de_fin, documento_usuarios_pago]
    );

    if (response.error) {
      res.status(401).json(response.error);
    } else {
      res.status(200).json("Pago actualizado con éxito");
    }
  } catch (error) {
    res.status(401).json(error.details);
  }
};

//Métodos de la recepcion-----------------------------------------------------------------

const searchEmailUser = async (req, res) => {
  try {
    const {documento} = req.body;
    const response = await pool.query(
      "select correo from usuarios where documento = $1",
      [documento]
    );

    if (response.error) {
      res.status(500).json(response.error);
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
};

//Reset Password------------------------------------------------------------------------

const searchDateUserToResetPassword = async (req, res) => {
  try {
    const {correo} = req.body;
    const response = await pool.query(
      "select documento, correo, nombres, primer_apellido, segundo_apellido, numero_telefono from usuarios,telefono where documento = documento_usuario and correo = $1",
      [correo]
    );

    if (response.error) {
      res.status(500).json(response.error);
    } else {
      if (response.rowCount == 0) {
        res
          .status(200)
          .json(
            "El correo que ingreso no corresponde a ningún correo registrado, intente nuevamente."
          );
      } else if (response.rowCount >= 1) {
        res.status(200).json(response.rows);
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/*const validateExistensPassword = async (req, res) => {
  try {
    const {documento, password_new} = req.body;
    const password = password_new;
    const response = await pool.query(
      "select password from usuarios where documento = $1",
      [documento]
    );

    if (response.error) {
      res.status(500).json(response.error);
    } else {
      if (response.rowCount == 1) {
        res
          .status(200)
          .json("La contraseña que ingreso es diferente a la actual");
      } else if (response.rowCount >= 1) {
        const password_act = response.rows[0].password;
        const password_decryp = cryptr.decrypt(password_act);
        if (password == password_decryp) {
          res
            .status(200)
            .json("La contraseña que ingreso es igual a la actual");
        }
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};*/

const resetPassword = async (req, res) => {
  try {
    const {documento, password_new} = req.body;
    const password = cryptr.encrypt(password_new);
    const response = await pool.query(
      "update usuarios set password = $1 where documento = $2",
      [password, documento]
    );
    if (response.error) {
      res.status(500).json(response.error);
    } else {
      res.status(200).json("password update successfull");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//--------------------------------------------------------------------------------------

//Métodos para el inicio----------------------------------------------------------------

const selecUserFromRol = async (req, res) => {
  try {
    const {rol} = req.body;
    const response = await pool.query(
      "SELECT documento, nombres, primer_apellido, segundo_apellido, foto_personal FROM usuarios, foto, rol where img=id_foto and rol=id_rol and rol=$1 and estado=1;",
      [rol]
    );

    if (response.error) {
      res.status(500).json(response.error);
    } else {
      if (response.rowCount == 0) {
        res.status(200).json("No hay usuarios");
      } else if (response.rowCount >= 1) {
        res.status(200).json(response.rows);
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const searchOnePersonalInfo = async (req, res) => {
  try {
    const {documento} = req.body;
    const response = await pool.query(
      "select nombres, primer_apellido, segundo_apellido, foto_personal, nombre_tipo_genero, nombre_rol from usuarios, rol, foto, genero where img = id_foto and rol = id_rol and genero = id_genero and documento = $1",
      [documento]
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

const searchOnePersonalTitle = async (req, res) => {
  try {
    const {documento} = req.body;
    const response = await pool.query(
      "SELECT adjunto, titulo FROM usuarios, foto,educacion, educacion_usuarios, genero where img=id_foto and documento_usuarios_titulo=documento and id_educacion=id_titulo and genero=id_genero and documento= $1",
      [documento]
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

//--------------------------------------------------------------------------------------

//Exportar variables--------------------------------------------------------------------->

module.exports = {
  selectUsers,
  selectDocument,
  selectRol,
  selectAllRole,
  selectGender,
  createUsers,
  updateUsers,
  selectUser,
  updateState,
  selectHistory,
  promedioAssist,
  meanOneMonth,
  selectDays,
  selectClient,
  selectImgUser,
  profileUser,
  selectVerifyImg,
  deleteImgProfile,
  updateProfile,
  selectPasswordProfile,
  updatePassword,

  selectUsersPlan,

  selectOldUsersFirstPart,
  selectOldUsersSecondtPart,
  selectNewUsers,

  selectInfoGeneralUser,
  selectGenderUser,

  registeredAssist,
  confirmAssist,
  selectNumberDays,
  selectDataUserDateInitAndFinish,

  selectAllClient,
  searchSuscription,
  updateStateClient,
  selectPlanSuscription,
  selectTypeValoracion,
  createNewUser,
  searchPerfilUser,
  validateDateFin,
  updatePlanUserm,
  updateTypeAssessmentUser,
  updateDatePerfil,
  updateTimePago,

  searchEmailUser,

  searchDateUserToResetPassword,
  resetPassword,

  selecUserFromRol,
  searchOnePersonalInfo,
  searchOnePersonalTitle,
};
