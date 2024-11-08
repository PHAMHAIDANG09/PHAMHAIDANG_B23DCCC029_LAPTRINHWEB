// todo-backend/database.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',  // Địa chỉ MySQL
  user: 'root', // Tên người dùng MySQL
  password: '', // Mật khẩu MySQL
  database: 'todo_app' // Tên database
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi khi kết nối MySQL:', err);
  } else {
    console.log('Đã kết nối đến MySQL');
  }
});

module.exports = connection;
