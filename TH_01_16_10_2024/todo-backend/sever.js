const express = require('express');
const cors = require('cors');  // Import cors
const app = express();
const connection = require('./database');

// Sử dụng middleware cors
app.use(cors());  // Cho phép tất cả các domain

app.use(express.json());

// Lấy tất cả các task
app.get('/api/tasks', (req, res) => {
  connection.query('SELECT * FROM tasks', (error, results) => {
    if (error) {
      return res.status(500).send('Lỗi khi lấy dữ liệu');
    }
    res.json(results);  // Trả về danh sách task
  });
});


// Thêm task mới
app.post('/api/tasks', (req, res) => {
  const { text, schedule, status } = req.body;
  connection.query(
    'INSERT INTO tasks (text, schedule, status) VALUES (?, ?, ?)',
    [text, schedule, status],
    (error, results) => {
      if (error) {
        return res.status(500).send('Lỗi khi thêm task');
      }
      res.status(201).json({ insertId: results.insertId });  // Trả về ID mới
    }
  );
});


// Cập nhật task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { text, schedule, status } = req.body;
  
  connection.query(
    'UPDATE tasks SET text = ?, schedule = ?, status = ? WHERE id = ?',
    [text, schedule, status, id],
    (error, results) => {
      if (error) {
        return res.status(500).send('Lỗi khi cập nhật task');
      }
      res.send('Task đã được cập nhật');
    }
  );
});



// Xóa task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM tasks WHERE id = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).send('Lỗi khi xoá task');
    }
    res.send('Task đã được xoá');
  });
});

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});