// const internals = require('./internals')

const {send} = require('./request');
const {read} = require('./response');
const {REQUEST_TIMEOUT} = require('./request')

const request = (url,data) =>{
 send(url,data);
 return read();
} 


const result = request('https://www.google.com','Hello');
console.log(result)

// console.log(require.cache)