const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts.controllers')

router.get('/', postsController.getPosts)
router.post('/', postsController.postPost)
router.put('/:id', postsController.postComment)
module.exports = router