const express = require('express');
const cors = require('cors');


const testRouter = require('./router/test/test.router');

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.use(cors({
    origin:'http://localhost:5173'
}))
app.use('/test',testRouter);

app.get('/*',(req,res)=>{
    res.json({message:'this is working dude...'})
})




module.exports = app