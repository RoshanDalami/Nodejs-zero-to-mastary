
REQUEST_TIMEOUT = 500;

const encrypt = (data)=>{
    return 'encrypted data';
}

const send = (url,data)=>{
 const encryptedData = encrypt(data);
 console.log(`Encrypted Data  ${encryptedData} to ${url}`)
}

module.exports = {
    REQUEST_TIMEOUT,
    send,
}

console.log("Hello from requestjs")