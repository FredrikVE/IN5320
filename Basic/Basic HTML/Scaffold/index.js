const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Tillat forespørsler fra Live Server (port 5500)
app.use(cors({ origin: ["http://127.0.0.1:5500", "http://localhost:5500"] }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: { encrypt: true } // Azure krever TLS
};

// Registrering (POST fra register.html)
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send("Mangler felt");

  try {
    const hash = await bcrypt.hash(password, 10);
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input("u", sql.NVarChar, username)
      .input("p", sql.NVarChar, hash)
      .query("INSERT INTO Users (username, password) VALUES (@u, @p)");

    // Omdiriger tilbake til forsiden (Live Server-path)
    res.redirect("http://127.0.0.1:5500/Basic/Basic%20HTML/Scaffold/index.html?registered=1");

  } catch (err) {
    // 2627 / 2601 = UNIQUE KEY (brukernavn tatt)
    if (err && (err.number === 2627 || err.number === 2601)) {
      return res.status(409).send("Brukernavn allerede i bruk");
    }
    console.error(err);
    res.status(500).send("Databasefeil");
  }
});

// Innlogging (POST fra index.html)
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input("u", sql.NVarChar, username)
      .query("SELECT id, username, password FROM Users WHERE username=@u");

    if (!result.recordset.length) return res.status(401).send("Feil brukernavn eller passord");

    const user = result.recordset[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).send("Feil brukernavn eller passord");

    res.send(`Velkommen, ${user.username}!`);
  } catch (e) {
    console.error(e);
    res.status(500).send("Databasefeil");
  }
});

// Helse-sjekk
app.get("/health", (_req, res) => res.json({ ok: true }));

const PORT = 5050;
app.listen(PORT, () => console.log(`API kjører på http://127.0.0.1:${PORT}`));
