const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const postRoute = require('./routes/postRoute')
const bodyParser = require('body-parser');
// bodyparser use
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.use(cors());
app.use(express.json());

//connect to MongoDB compass
mongoose.connect(process.env.DATABASE_URI_mongoAtlas, { useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open', () =>{
    console.log('connection established')
}).on('connectionError',(err) =>{
    console.log(err);
})

// connect to mongoDB atlas
// const MongoClient = require("mongodb").MongoClient;

// MongoClient.connect(process.env.DATABASE_URI_mongoAtlas, {useUnifiedTopology: true }, (err, client) => {
//   if (err) console.log("Error occurred connecting to MongoDB...");
//   console.log("Connected to MongoDB!");
// });


app.use('/', postRoute)

app.listen(5000, ()=>{console.log("Express server is running on port 5000 ");})