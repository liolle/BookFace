
const express = require('express');
const router = express.Router();
// const  = require('../controller/events')
const events = require('../controller/events')

// router.get('/',(req,res) =>{
//     res.send('HellA');
// });

// router.post('api/events',(req,res) =>{

//     });
  


// router.put('/:id',(req,res) =>{
//     res.send({messageId: req.params.id});
// });

// router.delete('/:id',(req,res) =>{
//     res.send({message:"Poste supprimé" +req.params.id});
// });

// router.patch('/like-post/:id',(req,res) =>{
//     res.send({message:"Post-liké : id : "+req.params.id});
// });

// router.patch('/dislike-post/:id',(req,res) =>{
//     res.send({message:"Post-disliké : id : "+req.params.id});
// })


// module.exports = router =>{ const todos = require('./controller/events') ;  // Créer une nouvelle tâche
router.post('/', events.create) ;  // Récupérer tous les todos
router.get('/', events.findAll) ;  // Récupérer une seule tâche par identifiant
router.get('/:id', events.findOne) ;  // Mettre à jour un Todo avec id
router.put('/:id', events.update) ;  // Supprimer un Todo par id
// router.delete('/:id', events.delete) ; 

module.exports = router

