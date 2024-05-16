const express = require('express');
var cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


//middleWar
app.use(express.json());

//cors setup
app.use(cors({
    origin: [
        "http://localhost:5173",
        
      ],
      credentials: true,
      optionsSuccessStatus: 200
}));


//mongodb connection


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aq01puw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const JobJunctionCollection = client.db("JobJunctionDB").collection('job');
    const ApplyJobCollection = client.db("JobJunctionDB").collection('ApplyJobs');
    

    app.get('/job', async(req,res) =>{
        const cursor = JobJunctionCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/job/:id', async(req,res)=>{
        const id = req.params.id;
        const query ={_id : new ObjectId(id) };
        const result = await JobJunctionCollection.findOne(query);
        res.send(result);
    } )


    // applyjob post another store another collection

    // app.post('/applyjob', async (req,res)=>{
    //     const user = req.body;
    //     console.log(user);
    //     const result = await ApplyJobCollection.insertOne();
    //     res.send(result);
    // })



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  
  }
}
run().catch(console.dir);




//get api test
app.get('/', (req, res) => {
  res.send('Successfully Run JobJunction Server')
})

app.get('/user', (req, res) => {
  res.send(' Run JobJunction Server on User path or api')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})