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

app.get('/user/:id', async (req , res) => {
    let userId = req.params.id; 
    console.log("User ID:", userId);
    let collection = await connectToMongo("search"); 
    const response = await collection.find({"id" : `${userId}`}).toArray();
    res.json(response);
})

app.post('/employee', async (req , res) => {
    let {employeeId, userId} = req.body; 
    console.log("IDs:", employeeId, userId);
    let collection = await connectToMongo("search"); 
    const userResponse = await collection.find({"id" : `${userId}`}).toArray()
    const employeeResponse = await collection.find({"id" : `${employeeId}`}).toArray()

    //implement security for salary 
    console.log("USER:", userResponse, "EMP:", employeeResponse);
    if(employeeResponse[0].manager === userResponse[0].name){ 
        res.json(employeeResponse[0]); 
    } else if (userResponse[0].role === "HR"){ 
        res.json(employeeResponse[0])
    } else {
        let redactedEmployeeResponse = employeeResponse[0]; 
        delete redactedEmployeeResponse.salary; 
        res.json(redactedEmployeeResponse); 
    }
})

app.get('/search/name/:name', async (req , res) => {
    let searchName = req.params.name;
        console.log("SEARCH NAME:", searchName);
    let collection = await connectToMongo("search"); 
    const response = await collection.find( { $text: { $search: `"${searchName}"` } }, { projection: { name: 1, role: 1, phone: 1, id: 1} } ).sort({name: 1}).toArray();
    res.json(response);
})
app.get('/search/partial/:name', async (req , res) => {
    let searchName = req.params.name;
        console.log("SEARCH NAME:", searchName);
    let collection = await connectToMongo("search"); 
    const response = await collection.find( { name: { $regex: searchName, $options: 'i' } }, { projection: { name: 1, role: 1, phone: 1, id: 1} } ).sort({name: 1}).toArray();
    res.json(response);
})

app.get('/search/role/:name', async (req , res) => {
    let searchName = req.params.name;
        console.log("SEARCH NAME:", searchName);
    let collection = await connectToMongo("search"); 
    const response = await collection.find( { role: { $regex: searchName, $options: 'i' } }, { projection: { name: 1, role: 1, phone: 1, id: 1} } ).sort({name: 1}).toArray();
    res.json(response);
})

app.get('/analysis', async (req , res) => {
    let collection = await connectToMongo("search"); 
    const employeeCount = await collection.countDocuments();
    const roleCount = await collection.aggregate([
        { $group: { _id: "$role" } },  
        { $count: "distinctRoles" }    
      ]).toArray();
      const averageSalary = await collection.aggregate([
        { 
          $group: { 
            _id: null,               
            averageSalary: { $avg: { $toInt: "$salary" } }  
         } 
        }
      ]).toArray();

      const costEmployees = await collection.aggregate([
        {$group: { 
            _id: null,              
            totalSalary: { $sum: { $toInt: "$salary" } }  
          } 
        }
      ]).toArray();

      const mostCommonLocation = await collection.aggregate([
        { $group: { 
            _id: "$location",       
            count: { $sum: 1 }      
          } 
        },
        { $sort: { count: -1 }     
        },
        { $limit: 1                 
        }]).toArray();

      let response = {
        employee_count: employeeCount, 
        role_count: roleCount[0].distinctRoles, 
        avg_salary : averageSalary[0].averageSalary,
        total_cost: costEmployees[0].totalSalary,
        commonLocation: mostCommonLocation[0]
      }
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