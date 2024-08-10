const {Pool} = require("pg");

const Cryptr = require("cryptr");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "gimnasio",
  port: 5432,
});

let weeklyRegistrations = [];
let currentWeekCount = 0;
let startDate = new Date();

const initializeCounter = async () => {
  try {
    const result = await pool.query(
      "SELECT contador, fecha_inicio FROM contador_semanal ORDER BY id DESC LIMIT 1"
    );
    if (result.rows.length > 0) {
      currentWeekCount = result.rows[0].contador;
      startDate = new Date(result.rows[0].fecha_inicio);
    } else {
      // If no record is found, create a new one
      await pool.query(
        "INSERT INTO contador_semanal (contador, fecha_inicio) VALUES ($1, $2)",
        [currentWeekCount, startDate]
      );
    }
  } catch (error) {
    console.error("Error al inicializar el contador:", error);
  }
};

const incrementCounter = async () => {
  currentWeekCount++;
  await pool.query(
    "UPDATE contador_semanal SET contador = $1 WHERE fecha_inicio = $2",
    [currentWeekCount, startDate]
  );
};

const getWeeklyRegistrations = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT EXTRACT(YEAR FROM created_at::date) AS year,
              EXTRACT(WEEK FROM created_at::date) AS week_number,
              COUNT(*) AS count
       FROM usuarios
       WHERE created_at >= date_trunc('year', CURRENT_DATE)
         AND created_at < date_trunc('year', CURRENT_DATE) + interval '1 year'
       GROUP BY EXTRACT(YEAR FROM created_at::date), EXTRACT(WEEK FROM created_at::date)`
    );
    const registeredDocuments = result.rows.map((row) => ({
      documento: row.documento,
      created_at: row.created_at,
    }));

    // Función para calcular la fecha de inicio de la semana
    const getWeekStartDate = (year, week) => {
      const date = new Date(year, 0, 1 + (week - 1) * 7);
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Ajuste para el inicio de la semana
      return new Date(date.setDate(diff)).toISOString();
    };

    // Mapear los resultados para incluir la fecha de inicio de la semana
    const weeklyRegistrations = result.rows.map((row) => ({
      weekStart: getWeekStartDate(row.year, row.week_number),
      count: row.count,
    }));

    res.json({
      currentWeekCount,
      weeklyRegistrations,
      registeredDocuments,
    });
  } catch (error) {
    console.error("Error al obtener los documentos registrados:", error);
    res.status(500).json("Error al obtener los documentos registrados");
  }
};

const getTodayRegistrations = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT documento, nombres, primer_apellido, created_at FROM usuarios WHERE created_at::date = CURRENT_DATE"
    );
    const registeredDocuments = result.rows.map((row) => ({
      documento: row.documento,
      nombres: row.nombres,
      primer_apellido: row.primer_apellido,
      created_at: row.created_at,
    }));
    res.json(registeredDocuments);
  } catch (error) {
    console.error("Error al obtener los documentos registrados hoy:", error);
    res.status(500).json("Error al obtener los documentos registrados hoy");
  }
};

const resetWeeklyCounter = async () => {
  const now = new Date();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  if (now - startDate >= oneWeek) {
    weeklyRegistrations.push({
      week: startDate.toISOString(),
      count: currentWeekCount,
    });

    currentWeekCount = 0;
    startDate = new Date();
    await pool.query(
      "INSERT INTO contador_semanal (contador, fecha_inicio) VALUES ($1, $2)",
      [currentWeekCount, startDate]
    );
  }
};
const recalculateCurrentWeekCount = async () => {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) AS count FROM usuarios WHERE created_at >= date_trunc('week', CURRENT_DATE) AND created_at < date_trunc('week', CURRENT_DATE) + interval '1 week'"
    );
    currentWeekCount = result.rows[0].count;
    console.log(`Contador recalculado: ${currentWeekCount}`);
  } catch (error) {
    console.error("Error al recalcular el contador semanal:", error);
  }
};

//reiniciar el contador semanalmente
setInterval(resetWeeklyCounter, 24 * 60 * 60 * 1000);

const getCurrentWeekCount = () => currentWeekCount;

// Inicializar el contador
initializeCounter();

module.exports = {
  incrementCounter,
  getWeeklyRegistrations,
  getCurrentWeekCount,
  getTodayRegistrations,
  resetWeeklyCounter,
  recalculateCurrentWeekCount,
};
