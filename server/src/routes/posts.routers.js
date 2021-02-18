const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts.controllers')

router.get('/', postsController.getPosts)
router.post('/', postsController.postPost)
router.post('/:id', postsController.postgroupPost)
router.put('/:id', postsController.updatePost)

module.exports = router