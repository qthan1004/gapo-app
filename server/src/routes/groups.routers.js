const express = require('express')
const router = express.Router()

const groupsController = require('../controllers/groups.controller')

router.get('/', groupsController.getGroups) // get all 

router.get('/:id', groupsController.getGroupsById) //get detail 

router.post('/', groupsController.createGroup) //create 

router.put('/:id', groupsController.updateGroup) // update 

router.delete('/:id', groupsController.deleteUser) // delete

module.exports = router