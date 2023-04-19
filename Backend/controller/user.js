const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql2"); 


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"bookface",
    port: 8889,
    

});


// Create and Save a new Todo
const create = (req, res) => {
    // Validate request
    if (!req.body.email) {
        return res.status(400).send({
            message: "Todo email can not be empty"
        });
    }

    var params = req.body;
    console.log(params);

    db.query("INSERT INTO users SET ? ", params,
        function (error, results, fields) {
            if (error) throw error;
            return res.send({
                message: 'New todo has been created successfully.'
            });
        });

        
};

// Retrieve and return all todos from the database.
const findAll = (req, res) => {
    db.query('select * from users',
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

// Find a single todo with a id
const findOne = (req, res) => {

   
    db.query('SELECT * FROM users WHERE Id = ?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        if (results.length === 0) {
            res.status(404).send('User not found');
        } else {
            // L'ID existe, on peut exécuter la requête d'origine
            db.query('SELECT * FROM users WHERE Id = ?', [req.params.id], function (error, results, fields) {
                if (error) throw error;
                res.end(JSON.stringify(results));
            });
        }
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
    db.query('UPDATE `users` SET `name`=?,`description`=? where `id`=?',
        [req.body.name, req.body.description, req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

// Delete a todo with the specified id in the request
const deletes = (req, res) => {
    console.log(req.body);
    db.query('DELETE FROM `users` WHERE `Id`=?', 
        [req.body.id], function (error, results, fields) {
            if (error) throw error;
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









    
    
