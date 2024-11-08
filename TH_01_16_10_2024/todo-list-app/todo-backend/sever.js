// todo-backend/server.js
const express = require('express');
const app = express();
const connection = require('./database');

app.use(express.json());

// Lấy tất cả các task
app.get('/api/tasks', (req, res) => {
  connection.query('SELECT * FROM tasks', (error, results) => {
    if (error) return res.status(500).send('Lỗi khi lấy dữ liệu');
    res.json(results);
  });
});

// Thêm task mới
app.post('/api/tasks', (req, res) => {
  const { text, schedule, status } = req.body;
  connection.query(
    'INSERT INTO tasks (text, schedule, status) VALUES (?, ?, ?)',
    [text, schedule, status],
    (error, results) => {
      if (error) return res.status(500).send('Lỗi khi thêm task');
      res.status(201).send('Task đã được thêm');
    }
  );
});

// Cập nhật trạng thái task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  connection.query(
    'UPDATE tasks SET status = ? WHERE id = ?',
    [status, id],
    (error, results) => {
      if (error) return res.status(500).send('Lỗi khi cập nhật task');
      res.send('Task đã được cập nhật');
    }
  );
});

// Xóa task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM tasks WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).send('Lỗi khi xoá task');
    res.send('Task đã được xoá');
  });
});

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
