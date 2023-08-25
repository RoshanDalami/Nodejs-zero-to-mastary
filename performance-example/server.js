const express = require("express");
// const cluster = require('cluster'); 
// const os = require('os')


const app = express();

function delay(duration) {
  const startTime = Date.now();

  while (Date.now() - startTime < duration) {}
}


/* 
Some of the real life blocking fuction are:
JSON.stringfy() => that takes javascript object and return string.
JSON.parse() => that takes string and return crossponding javascript object.
arr.sort((a,b)=>{
    return a-b
})
*/


app.get("/", (req, res) => {
  res.send(`Performance example:  ${process.pid}`);
});

app.get("/timer", (req, res) => {
  delay(10000);
  res.send(`Loaded after Delay : ${process.pid}`);
});

// if(cluster.isMaster){
//     console.log('Master process started ...');
//     const NUMBER_OF_WORKERS = os.cpus().length;
//     console.log(NUMBER_OF_WORKERS)
//     for (let i = 0;i<NUMBER_OF_WORKERS;i++){

//         cluster.fork();
//     }

// }else{
//     console.log('Worker process Started ... ')
//     app.listen(8000, () => {
//       console.log("Server running");
//     });
// }
console.log('Worker process Started ... ')
app.listen(8000, () => {
  console.log("Server running");
});

