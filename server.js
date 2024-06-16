//main packages are imported
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoModel = require('./models/todoModel');
const todoRoute = require('./routes/todos');

const cors = require('cors')


require('dotenv').config();//now process.env has the key and values
const app = express();

//MiddleWare
// this middleware handles the data given on post, made a js object and gave it to body 
app.use(express.urlencoded({ extended: false}));

// for handling json data
app.use(express.json());

//route requests
app.use("/api/todos",todoRoute );

//MongoDB connection
mongoose.connect(process.env.DB_CONNECT)
.then(() => {
    app.listen(process.env.PORT,()=>{
        console.log("connected to db & listening on port", process.env.PORT);
    })
}).catch((err) => {
    console.log(err);
    console.error("Some error occured")
});

    

