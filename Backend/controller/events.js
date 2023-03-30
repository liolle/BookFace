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
    // Validate request
    if (!req.body.description) {
        return res.status(400).send({
            message: "Todo description can not be empty"
        });
    }

    var params = req.body;
    console.log(params);



db.query("INSERT INTO events SET ? ", params, function (error, results, fields) {
    if (error) throw error;

    // Insertion dans la table tag
    const eventId = results.insertId; // récupère l'identifiant de l'événement inséré
    const tagParams = {
        context_id: eventId,
        tag: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        type: 'event'
    };
    db.query("INSERT INTO tags SET ?", tagParams, function (error, results, fields) {
        if (error) throw error;
        return res.send({
            data: results,
            message: 'New todo has been created successfully.'
        });
    });
});

}


// Retrieve and return all todos from the database.
 const findAll = (req, res) => {
    db.query('select * from events',
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

// Find a single todo with a id
 const findOne = (req, res) => {

    db.query('select * from events where Id=?',
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
    db.query('UPDATE `events` SET `name`=?,`description`=? where `id`=?',
        [req.body.name, req.body.description, req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

// Delete a todo with the specified id in the request
 const deletes = (req, res) => {
    console.log(req.body);
    db.query('DELETE FROM `events` WHERE `Id`=?', 
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









    
    
