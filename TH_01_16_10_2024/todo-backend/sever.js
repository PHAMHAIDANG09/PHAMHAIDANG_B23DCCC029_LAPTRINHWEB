const express = require('express');
const cors = require('cors');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
require('./config/database');  

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);  
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
