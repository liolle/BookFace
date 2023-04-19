const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql2"); 


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"bookface",
    port: 8889


});


const create = (req, res) => {


    var params = req.body
    console.log(params);
    // Validate request
    if(!params.follow || !params.user){ 
        res.send("error");
        return 
    }
    console.log(params.tag);
   db.query(`SELECT id FROM tags where tag = '${params.follow}'`,(error1,results1,fields1)=>{
     if(error1){
        res.send('error');
        return
     }
     
     
     db.query(`SELECT id FROM tags where tag = '${params.user}'`,(error2,results2,fields2)=>{
        if(error2){
            res.send('error');
            return
         }
     
     let id =results1[0]['id'];
     
     let id2 = results2[0]['id']
    

         db.query(`INSERT into userFollow (user_id,follower_id)
         values (${id2},${id})`,(err3,res3)=>{
            if (err3) {
                res.send("error")
                return
            }
            res.send("success")

         });

   });  

})
}

// Retrieve and return all todos from the database.
 const findAll = (req, res) => {
    db.query('select * from userFollow',
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

// Find a single todo with a id
 const findOne = (req, res) => {

    db.query('select * from userFollow where user_id=?',
        [req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};


// Update a todo identified by the id in the request
 const update = (req, res) => {
    // Validate Request
    if (!req.body.description) {
        return res.status(400).send({
            message: "Todo description can not be empty"
        });
    }

    console.log(req.params.id);
    console.log(req.body.description);
    db.query('UPDATE `userFollow` SET `name`=?',
        [req.body.name, req.body.description, req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

// Delete a todo with the specified id in the request
const deletes = (req, res) => {
    console.log(req.body);
    db.query('DELETE FROM `userFollow` WHERE `follower_id` = ?',
        [req.params.id], function (error, results, fields) {
            if (error){
                console.log(error);
            } 
            res.end('Record has been deleted!');
    });
};



module.exports = {
    create,
    findAll,
    findOne,
    update,
    deletes
}









    
    
