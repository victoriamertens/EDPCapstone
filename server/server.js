import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import pg from 'pg' 

let app = express(); 
app.use(express.json()); 
dotenv.config();

app.get('/', (_ , res) => {
    res.json("Hello World")
})



app.listen(process.env.EXPRESS_PORT, () => { console.log(`server running on localhost:${process.env.EXPRESS_PORT}`);}); 