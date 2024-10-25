const express =require('express')
const app = express();
const port = 3000;
app.use(express.json());
app.listen(port, () =>{
    console.log(`Sever is running at http://localhost:${port}`);
});
app.get('/',(req, res)=>{
    res.json([
        {id:1,name:'John'},
        {id:2,name:'Joe Smith'}
    ])
});