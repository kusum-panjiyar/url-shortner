const express = require('express')
const app = express() 
const configureDB = require('./config/database')
configureDB()
const router = require('./config/routes')
const port = 3010

app.use(express.json())

const useragent=require('express-useragent')
app.use(useragent.express())
app.use('/',router)


app.listen(port,()=>{
    console.log('listening on port',port)
})