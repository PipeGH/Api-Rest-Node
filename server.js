const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// Importar rutas
const login = require("./src/routes/login");
const users = require("./src/routes/users");
const system = require("./src/routes/sistema");
const logo = require("./src/routes/logo");
const plans = require("./src/routes/plans");
const notice = require("./src/routes/notice");
const training = require("./src/routes/training");
const routines = require("./src/routes/routines");
const assessment = require("./src/routes/assessment");
const nutrition = require("./src/routes/nutrition");
const challenges = require("./src/routes/challenges");
const notification = require("./src/routes/notification");
const poll = require("./src/routes/poll");
const email = require("./src/routes/email");
const counter = require("./src/routes/counter");

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}));
app.use(cors());

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Configuración del puerto
app.set("port", process.env.PORT);

// Ruta principal
app.get("/", (req, res) => {
  res.send("Web service on");
});

// Rutas
app.use("/login", login);
app.use("/users", users);
app.use("/system", system);
app.use("/logo", logo);
app.use("/plans", plans);
app.use("/notice", notice);
app.use("/training", training);
app.use("/routines", routines);
app.use("/assessment", assessment);
app.use("/nutrition", nutrition);
app.use("/challenges", challenges);
app.use("/notification", notification);
app.use("/poll", poll);
app.use("/email", email);
app.use("/counter", counter);

// Iniciar servidor
app.listen(app.get("port"), () => {
  console.log("Active web service on the port", app.get("port"));
});
