// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./students.db');

// Створюємо таблиці, якщо їх ще не існує
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS grades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      course TEXT,
      grade INTEGER,
      FOREIGN KEY(student_id) REFERENCES students(id)
    )
  `);
});

module.exports = db;
