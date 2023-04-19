const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql2");



//parse application/json
app.use(bodyParser.json());
app.use('/events',require('./routes/events'));
app.use('/user',require('./routes/user'));
app.use('/follow',require('./routes/follow'));
app.use('/group',require('./routes/group'));
app.use('/list',require('./routes/list'));


//Qui permet de tfaiter les donnees de la requette
app.use(express.urlencoded({extended : false}));
app.use(express.json());


//create datada base connection
const db = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"bookface",
        port: 8889,
        

});

db.connect((err)=>{
    if(err) throw err;
    console.log("MYSQL2 Connected");
});

app.listen(6009,()=>{
    console.log("Server started on port 6009");
})