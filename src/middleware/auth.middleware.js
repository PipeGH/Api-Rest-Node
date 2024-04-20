import jwt from "jsonwebtoken";
import config from "../config";
import {getConnection} from "../database/database";

const validateExiststoken = (request, response, next) => {
  let token =
    request.headers["x-access-token"] ||
    request.headers["authorization"] ||
    request.headers["Authorization"];
  if (!token) {
    next();
  } else {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.secret_key, (error, decoded) => {
      if (error) {
        if (error.message == "jwt malformed") {
          next();
        }
      } else {
        response.json({
          status: 401,
          message: "Bad request, ya cuenta con un token valido",
        });
      }
    });
  }
};

const isLogged = (request, response, next) => {
  let token =
    request.headers["x-access-token"] ||
    request.headers["authorization"] ||
    request.headers["Authorization"];
  if (!token) {
    response.json({
      status: 401,
      message: "Bad request, requiere un token para continuar con el acceso",
    });
  } else {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.secret_key, (error, decoded) => {
      if (error) {
        response.json({
          status: 401,
          message: "Bad request, token de acceso incorrecto o ya expiró",
        });
      } else {
        next();
      }
    });
  }
};

const permissionRoleAdmin = async (request, response, next) => {
  let token =
    request.headers["x-access-token"] ||
    request.headers["authorization"] ||
    request.headers["Authorization"];
  if (!token) {
    response.json({
      status: 401,
      message: "Bad request, requiere un token para continuar con el acceso",
    });
  } else {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.secret_key, async (error, decoded) => {
      if (error) {
        response.json({
          status: 401,
          message: "Bad request, token de acceso incorrecto o ya expiró",
        });
      } else {
        const id = decoded.data.id;
        const connection = await getConnection();
        const result = await connection.query(
          "select roles.id from usuarios, roles, users_has_roles where usuarios.id = users_has_roles.id_usuario AND users_has_roles.id_rol = roles.id and usuarios.id = ? ",
          id
        );
        if (result[0].id == 1) {
          next();
        } else {
          response.json({
            status: 401,
            message:
              "Bad request, su rol carece de los permisos necesarios para acceder a esta información.",
          });
        }
      }
    });
  }
};

module.exports = {
  validateExiststoken,
  isLogged,
  permissionRoleAdmin,
};
