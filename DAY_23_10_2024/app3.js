const express =require('express')
const app = express();
const port = 3000;
app.use(express.json());
app.listen(port, () =>{
    console.log(`Sever is running at http://localhost:${port}`);
});
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    res.json({ message: `Người dùng có ID ${userId} đã được cập nhật`, updatedData });
});