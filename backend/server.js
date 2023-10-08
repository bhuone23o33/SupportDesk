const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db.js');
const {errorHandler} = require('./middleware/errorMiddleware.js');

// connnect to DB
connectDB();

const PORT = process.env.PORT || 5000 ;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.status(200).json({message:"Welcome to supportDeskApi"});  
})

// Routes

app.use('/api/users',require('./routes/userRoutes.js'))

// errorHandler
app.use(errorHandler);

app.listen(PORT,()=>{console.log(`server started ${PORT}`)});