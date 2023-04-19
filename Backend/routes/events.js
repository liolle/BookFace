
const express = require('express');
const router = express.Router();
// const  = require('../controller/events')
const events = require('../controller/events')




// module.exports = router =>{ const todos = require('./controller/events') ;  // Créer une nouvelle tâche
router.post('/', events.create) ;  // Récupérer tous les todos
router.get('/', events.findAll) ;  // Récupérer une seule tâche par identifiant
router.get('/:id', events.findOne) ;  // Mettre à jour un Todo avec id
router.put('/:id', events.update) ;  // Ajouter un Todo par id
router.delete('/:id', events.deletes) ; //Supprimer un id

module.exports = router

