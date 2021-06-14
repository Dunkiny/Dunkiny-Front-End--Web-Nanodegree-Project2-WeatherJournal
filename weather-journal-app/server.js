// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
app.get('/alldata',(req,res)=>{
    res.send(projectData)
    
})

app.post(`/alldata`,(req,res)=>{
    projectData = {
        date: req.body.date,
        temperature: req.body.main.temp,
        content:req.body.content
      };
      res.send(projectData)
      console.log(projectData)
})

// Create Port 
app.listen(8080, function serverInsurance() {
    console.log("your server is running");
    });

