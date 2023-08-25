//Creating server using in-build node http 

const http = require('http');

const mongoose = require('mongoose')

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://roshandalami0:Y7ROqTUGQpf2ApUs@nasa-project.heb7itz.mongodb.net/nasa?retryWrites=true&w=majority'

const app = require('./app');

const {loadPlanetsData} = require('./Models/planets.model')
//pass the app object to CreateServer so that any roter or middleware passed to app object will passed to createServer HTTP API.
const server = http.createServer(app);


mongoose.connection.once('open',()=>{
    console.log("MongoDB connection ready");
});

mongoose.connection.on('error',(err)=>{
    console.error(err)
})

async function startServer (){
   await mongoose.connect(MONGO_URL,{
    
   });
    await loadPlanetsData();
    server.listen(PORT,()=>{
        console.log(`Server is running on : ${PORT} `);
    });
};

startServer();

//By doing this Listen function we use with app (app.listen()) is exactly same as (server.listen())

// Creating server using Express 

// app.listen();

