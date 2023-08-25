const http = require("http");

const PORT = 3000;

const friends = [
    {
        id: 0,
        message: "Roshan Dalami",
      },
    {
        id: 1,
        message: "Diwash Bhattarai",
      },
    {
        id: 2,
        message: "Amit Rana",
      },
    {
        id: 3,
        message: "Manish Thapa",
      },
]

//req and res both are stream ..
//req is a readable stream and res is writeable stream
const server = http.createServer();

server.on('request',(req, res) => {
    const items = req.url.split('/');
    if(req.method === 'POST' && items[1] === 'friends'){
        req.on('data',(data)=>{
            const friend = data.toString();
            console.log('Request:', friend);
            friends.push(JSON.parse(friend));
        });
        req.pipe(res);
    } else if( req.method === 'GET' &&  items[1] === 'friends'){

        // res.writeHead(200, {
        //   "Content-Type": "application/json",
        // });
        //alternative of above code
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        const friendsIndex = Number(items[2]);
        if(items.length === 3){
            res.end(JSON.stringify(friends[friendsIndex]))
        }else{

            res.end(
              JSON.stringify(friends)
            );
        }
    }else if( req.method === 'GET' && items[1] === 'message'){
        res.write('<html>');
        res.write("<body>");
        res.write('<h1> This is Roshan</h1>');
        res.write('</body>');
        res.write('</html>');
        res.end()
    }else{
        res.statusCode = 404;
        res.end();
    }

})

server.listen(PORT, () => {
  console.log("Listing on : " + PORT);
});
