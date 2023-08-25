const express = require('express');
const {httpPostTest,httpGetTest,httpDeleteTest} = require('./test.controller')


const data = require('../../Model/test.model')

const testRouter = express.Router();

testRouter.get('/',httpGetTest)
testRouter.post('/',httpPostTest)
testRouter.delete('/:id',httpDeleteTest)



module.exports = testRouter;
