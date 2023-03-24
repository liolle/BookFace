const express = require('express');
const mysql2 = require('mysql2');
const dotenv = require ('dotenv');
const path = require ('path');

dotenv.config({path:'./.env'});

const app = express();

const db = mysql2.createConnection({
    host:process.env.DATABASE_HOST|| "localhost",
    user: process.env.DATABASE_USER || "root",
    password:process.env.DATABASE_PASSWORD || "root",
    database:process.env.DATABASE || "bookface",
    port: 8889
});


db.connect( (error) =>{
    if(error){
        console.log(error)
    }else{
        console.log('Mysql2 connected...')
    }
})

// app.get("/", (req,res) => {
//     res.send("<h1>home</h1>")
// });


app.listen(6009,()=>{
    console.log("Server started on port 6009");
})




