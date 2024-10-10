import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import pg from 'pg' 
import { MongoClient, ObjectId } from 'mongodb';



let app = express(); 
dotenv.config();
app.use(cors());
app.use(express.json());

//variables from env
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = {search: process.env.MONGO_DB_COLLECTION_SEARCH, auth: process.env.MONGO_DB_COLLECTION_AUTH}



async function connectToMongo (collectionType) { 
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    let selectedCollectionName = collectionName[collectionType]
    const collection = db.collection(selectedCollectionName);
  return collection
}


app.get('/', async (_ , res) => {
    let collection = await connectToMongo(); 
    const response = await collection.find({}).toArray();
    res.json(response);
})

app.get('/search/name/:name', async (req , res) => {
    let searchName = req.params.name;
        console.log("SEARCH NAME:", searchName);
    let collection = await connectToMongo("search"); 
    const response = await collection.find( { $text: { $search: `"${searchName}"` } }, { projection: { name: 1, role: 1, phone: 1, id: 1} } ).toArray();
    res.json(response);
})

app.post('/login', async (req , res) => {
    let {username, password} = req.body; 
    console.log("Logging in: ", username, password);
    let collection = await connectToMongo("auth"); 
   collection.findOne({"username": `${username}`, "password": `${password}`})
    .then(
        user => {
            if(user){
            let response = {userId: user.userId}
            res.json(response)}}
    ).catch(err => {
        console.error('Error in querying database:', err)
        res.sendStatus(500)
    });
}
)



app.listen(process.env.EXPRESS_PORT, () => { console.log(`server running on localhost:${process.env.EXPRESS_PORT}`);}); 