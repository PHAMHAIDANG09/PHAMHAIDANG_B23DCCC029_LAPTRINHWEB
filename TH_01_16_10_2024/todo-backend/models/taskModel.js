const connection = require('../config/database');

const getAllTasks = (callback) => {
  connection.query('SELECT * FROM tasks', callback);
};

const addTask = (taskData, callback) => {
  const { text, schedule, status } = taskData;
  connection.query('INSERT INTO tasks (text, schedule, status) VALUES (?, ?, ?)', [text, schedule, status], callback);
};

const updateTask = (id, taskData, callback) => {
  const { text, schedule, status } = taskData;
  connection.query('UPDATE tasks SET text = ?, schedule = ?, status = ? WHERE id = ?', [text, schedule, status, id], callback);
};

const deleteTask = (id, callback) => {
  connection.query('DELETE FROM tasks WHERE id = ?', [id], callback);
};

module.exports = { getAllTasks, addTask, updateTask, deleteTask };
