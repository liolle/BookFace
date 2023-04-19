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

const create = (req, res) => {
    var params = req.body;

    db.query("INSERT INTO users SET ? ", params, function (error, results, fields) {
        if (error) throw error;
    
        // Insertion dans la table userGroup
        const userId = results.insertId; // récupère l'identifiant de l'événement inséré
        const IdParams = {
            user_id: userId,
        };

        db.query("INSERT INTO grouplist SET id=" + req.body.id + ", user_id=" + req.body.user_id + ", name='" + req.body.name + "', created_at='" + req.body.created_at + "'", function (error, results, fields) {
            // callback function code here
        });
        
        // Insertion dans la table userGroup
        const listId = results.insertId; // récupère l'identifiant de l'événement inséré
        const IddParams = {
            group_id: listId,
        };

        // Add parentheses to correctly pass the two objects as parameters
        db.query("INSERT INTO userGroup SET ?", [IdParams, IddParams], function (error, results, fields) {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                message: 'New todo has been created successfully.'
            });
        });
    });
};


// INSERT INTO bf_comments (user_id,post_id,parent_comment,content,created_at)
//         VALUES('${user_id}',${post_id},${parent_comment},'${content}',TIMESTAMP('${timestamp}','0:0:0'))


// Retrieve and return all todos from the database.
const findAll = (req, res) => {
    db.query('select * from userGroup',
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

// Find a single todo with a id
const findOne = (req, res) => {

 
    db.query('SELECT * FROM userGroup WHERE Id = ?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        if (results.length === 0) {
            res.status(404).send('User not found');
        } else {
            // L'ID existe, on peut exécuter la requête d'origine
            db.query('SELECT * FROM userGroup WHERE Id = ?', [req.params.id], function (error, results, fields) {
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
    db.query('UPDATE `userGroup` SET `user_id`=?,`group_id`=? where `id`=?',
        [req.body.name, req.body.description, req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

// Delete a todo with the specified id in the request
const deletes = (req, res) => {
    console.log(req.body);
    db.query('DELETE FROM `userGroup` WHERE `Id`=?', 
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









    
    
