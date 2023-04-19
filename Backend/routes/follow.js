const express = require('express');
const router = express.Router();
// const  = require('../controller/events')
const follow = require('../controller/follow')




// module.exports = router =>{ const todos = require('./controller/events') ;  // Créer une nouvelle tâche
router.post('/', follow.create) ;  // Récupérer tous les todos
router.get('/', follow.findAll) ;  // Récupérer une seule tâche par identifiant
router.get('/:id', follow.findOne) ;  // Mettre à jour un Todo avec id
router.put('/:id', follow.update) ;  // Supprimer un Todo par id
router.delete('/:id', follow.deletes) ; //Supprimer un id

module.exports = router

