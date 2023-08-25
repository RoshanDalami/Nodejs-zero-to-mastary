const axios = require('axios');

axios.get('https://www.youtube.com').then((data)=>{console.log(data)}).catch((err)=>{
    console.log(`Error is ${err}`)
}).then(()=>{
    console.log('All Done')
})