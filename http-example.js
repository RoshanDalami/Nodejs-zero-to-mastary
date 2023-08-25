const http = require('https');

const req = http.request('https://www.google.com',(res)=>{
res.on('data',(chunk)=>{
    console.log(`data chunk : ${chunk}`)
})
res.on('end',()=>{
    console.log('data has been end')
})
})

req.end()