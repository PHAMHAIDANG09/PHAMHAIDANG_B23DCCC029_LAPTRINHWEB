const app = require('./app');
const express = require('express');////
const bodyParser = require('body-parser');////
const todoRoutes = require('./routes/todoRoutes');////
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json()); //// Giúp parse dữ liệu JSON//
app.use('/api', todoRoutes);////
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});