// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Маршрут для додавання нового студента
app.post('/students', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO students (name, email) VALUES (?, ?)', [name, email], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, name, email });
  });
});

// Маршрут для додавання оцінок
app.post('/grades', (req, res) => {
  const { student_id, course, grade } = req.body;
  db.run('INSERT INTO grades (student_id, course, grade) VALUES (?, ?, ?)', [student_id, course, grade], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, student_id, course, grade });
  });
});

// Маршрут для отримання рейтингу студента
app.get('/students/:id/grades', (req, res) => {
  const studentId = req.params.id;
  db.all('SELECT * FROM grades WHERE student_id = ?', [studentId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
