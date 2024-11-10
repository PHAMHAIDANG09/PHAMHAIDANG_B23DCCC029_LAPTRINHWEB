const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo_app'
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi khi kết nối MySQL:', err);
  } else {
    console.log('Đã kết nối đến MySQL');
  }
});

module.exports = connection;
