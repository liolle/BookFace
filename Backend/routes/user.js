const express = require('express');
const router = express.Router();
// const  = require('../controller/events')
const user = require('../controller/user')




// module.exports = router =>{ const todos = require('./controller/events') ;  // Créer une nouvelle tâche
router.post('/', user.create) ;  // Récupérer tous les todos
router.get('/', user.findAll) ;  // Récupérer une seule tâche par identifiant
router.get('/:id', user.findOne) ;  // Mettre à jour un Todo avec id
router.put('/:id', user.update) ;  // Supprimer un Todo par id
router.delete('/:id', user.deletes) ; //Supprimer un id

module.exports = router

