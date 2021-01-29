const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users.controllers')

router.get('/', usersController.getUsers) // get all 

router.get('/:id', usersController.getUserById) //get detail 

router.post('/', usersController.createUser) //create 

router.put('/:id', usersController.updateUser) // update 

router.delete('/:id', usersController.deleteUser) // delete

module.exports = router