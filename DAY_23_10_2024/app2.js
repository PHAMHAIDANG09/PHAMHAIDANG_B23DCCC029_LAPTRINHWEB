const express =require('express')
const app = express();
const port = 3000;
app.use(express.json());
app.listen(port, () =>{
    console.log(`Sever is running at http://localhost:${port}`);
});
app.post('/users', (req, res) => {
    const newUser = req.body;
    res.status(201).json({ message: 'Người dùng mới đã được tạo', user: newUser });
});
