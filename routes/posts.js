const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', postsController.getAll);

router.get('/:userId', postsController.getAllfromUser);

router.get('/:postId', postsController.getSingle);

router.post('/:userId/:threadId', isAuthenticated, validation.savePost, postsController.createPost);

router.put('/:postId', isAuthenticated, validation.savePost, postsController.updatePost);

router.delete('/:postId', isAuthenticated, postsController.deletePost);

module.exports = router;