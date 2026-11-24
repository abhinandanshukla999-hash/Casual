const express=require('express');
const app=express();
const cors=require('cors');

const port = 8001;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.post('/formData',(req,res)=>{

    const data=req.body;
    console.log(data);

    res.send("Form Submitted");
})
 

app.listen(port,()=>{console.log(`Server running at http://localhost:${port}`)})