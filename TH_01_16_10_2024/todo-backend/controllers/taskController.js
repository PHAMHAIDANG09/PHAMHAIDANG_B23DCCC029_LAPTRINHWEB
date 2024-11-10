const taskModel = require('../models/taskModel');

const getTasks = (req, res) => {
  taskModel.getAllTasks((error, results) => {
    if (error) return res.status(500).send('Lỗi khi lấy dữ liệu');
    res.json(results);
  });
};

const createTask = (req, res) => {
  const taskData = req.body;
  taskModel.addTask(taskData, (error, results) => {
    if (error) return res.status(500).send('Lỗi khi thêm task');
    res.status(201).send({ insertId: results.insertId });
  });
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const taskData = req.body;
  taskModel.updateTask(id, taskData, (error, results) => {
    if (error) return res.status(500).send('Lỗi khi cập nhật task');
    if (results.affectedRows === 0) return res.status(404).send('Task không tồn tại');
    res.send('Task đã được cập nhật');
  });
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  taskModel.deleteTask(id, (error, results) => {
    if (error) return res.status(500).send('Lỗi khi xóa task');
    res.send('Task đã được xóa');
  });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
