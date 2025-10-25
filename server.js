const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Get all todos
app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// ➕ Add a new todo
app.post("/todos", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).send("Task is required");
  db.query("INSERT INTO todos (task, done) VALUES (?, ?)", [task, 0], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Todo added successfully" });
  });
});

// ❌ Delete a todo
app.delete("/todos/:id", (req, res) => {
  db.query("DELETE FROM todos WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Todo deleted" });
  });
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
