const express = require('express');
const router = express.Router();
// const  = require('../controller/events')
const group = require('../controller/group')




// module.exports = router =>{ const todos = require('./controller/events') ;  // Créer une nouvelle tâche
router.post('/', group.create) ;  // Récupérer tous les todos
router.get('/', group.findAll) ;  // Récupérer une seule tâche par identifiant
router.get('/:id', group.findOne) ;  // Mettre à jour un Todo avec id
router.put('/:id', group.update) ;  // Ajouter un Todo par id
router.delete('/:id', group.deletes) ; //Supprimer un id

module.exports = router
