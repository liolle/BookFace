const express = require('express');
const router = express.Router();
// const  = require('../controller/events')
const list = require('../controller/list');




// module.exports = router =>{ const todos = require('./controller/events') ;  // Créer une nouvelle tâche
router.post('/', list.create) ;  // Récupérer tous les todos
router.get('/', list.findAll) ;  // Récupérer une seule tâche par identifiant
router.get('/:id', list.findOne) ;  // Mettre à jour un Todo avec id
router.put('/:id', list.update) ;  // Ajouter un Todo par id
router.delete('/:id', list.deletes) ; //Supprimer un id

module.exports = router
