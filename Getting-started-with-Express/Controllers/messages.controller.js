//writing the function as named function not arrow function while debugging node will tell name of function if something went wrong in named function but not in arrow function
const path = require('path')
function getMessages (req,res){
    // res.send('<ul><li>Hola</li></ul>');

    res.sendFile(    path.join(__dirname,'..','public','skimountain.jpg'))
   }


function postMessage(req,res){
    console.log('Updating messages...');
   
}

module.exports={
    getMessages,
    postMessage,
}