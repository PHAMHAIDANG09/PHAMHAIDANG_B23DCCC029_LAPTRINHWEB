const express = require('express');
const router = express.Router();
const db = require('../configs/database'); // Đường dẫn đúng đến tệp database


// Tạo mới một công việc (POST)
router.post('/', (req, res) => {
    const { title, description, due_date } = req.body;
    db.query('INSERT INTO todoapp (title, description, due_date) VALUES (?, ?, ?)', [title, description, due_date], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, title, description, due_date, completed: 0});
    });
});

// Cập nhật công việc theo ID (PUT)
router.put('/:id', (req, res) => {
    const { title, description, due_date, completed } = req.body;
    const { id } = req.params;
    db.query('UPDATE todoapp SET title = ?, description = ?, due_date = ?, completed = ? WHERE id = ?', 
    [title, description, due_date, completed, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Todo updated successfully' });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todoapp WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Todo deleted successfully' });
    });
});
// Lấy tất cả các công việc (GET)
router.get('/', (req, res) => {
    db.query('SELECT * FROM todoapp', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Xuất router
module.exports = router;