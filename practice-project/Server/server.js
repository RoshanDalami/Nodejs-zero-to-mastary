const http = require('http');
const PORT = 8001;
const app = require('./app');


const server = http.createServer(app);

server.listen(PORT,()=>{
    console.log(`Server Listening on PORT::${PORT}`);
})


