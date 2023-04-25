const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} [${duration}ms]`);
  });
  next();
});

const connection = mysql.createConnection({
  host: "127.0.0.1", // IPV4-osoite
  user: "root",
  password: "root",
  database: "mydatabase",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as ID " + connection.threadId);
});

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json(results);
    }
  });
});

app.post("/users", (req, res) => {
  const { name, email, password, balance } = req.body;

  // Tarkista, onko käyttäjä jo olemassa
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        res.status(500).json({ error });
      } else if (results.length > 0) {
        // Käyttäjä on jo olemassa
        res.status(400).json({ message: "User already exists" });
      } else {
        // Luo uusi käyttäjä
        const query =
          "INSERT INTO users (name, email, password, balance) VALUES (?, ?, ?, ?)";
        connection.query(
          query,
          [name, email, password, balance],
          (error, results) => {
            if (error) {
              res.status(500).json({ error });
            } else {
              res.json({ message: "User added", id: results.insertId });
            }
          }
        );
      }
    }
  );
});

app.put("/users/:id", (req, res) => {
  const { name, email, password, balance } = req.body;
  const { id } = req.params;

  const query =
    "UPDATE users SET name = ?, email = ?, password = ?, balance = ? WHERE id = ?";
  connection.query(
    query,
    [name, email, password, balance, id],
    (error, results) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.json({ message: "User updated", affectedRows: results.affectedRows });
      }
    }
  );
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  connection.query("DELETE FROM users WHERE id = ?", [id], (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json({ message: "User deleted", affectedRows: results.affectedRows });
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        res.status(500).json({ error });
      } else if (results.length === 0) {
        res.status(400).json({ message: "User not found" });
      } else {
        const user = results[0];
        if (user.password === password) {
          // Salasana on oikein
          res.json({ message: "User logged in successfully", user });
        } else {
          // Salasana on väärin
          res.status(400).json({ message: "Incorrect password" });
        }
      }
    }
  );
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;