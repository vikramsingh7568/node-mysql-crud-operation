require('dotenv').config();
const express = require('express');
const route = require('./src/route')
const app = express()
app.use(express.json())
app.use('/',route)


app.listen(process.env.port || 5000,function(){
    console.log("express is running on port no",process.env.port || 5000)
})