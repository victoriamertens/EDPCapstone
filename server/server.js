import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import pg from 'pg' 
import { MongoClient, ObjectId } from 'mongodb';


let app = express(); 
app.use(express.json()); 
dotenv.config();
app.use(cors());

//variables from env
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

async function connectToMongo () { 
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
  return collection
}


app.get('/', async (_ , res) => {
    let collection = await connectToMongo(); 
    const response = await collection.find({}).toArray();
    res.json(response);
})



app.listen(process.env.EXPRESS_PORT, () => { console.log(`server running on localhost:${process.env.EXPRESS_PORT}`);}); 