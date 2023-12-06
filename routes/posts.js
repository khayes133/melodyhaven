const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts');
// const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', postsController.getAll);

router.get('/:userId', postsController.getAllfromUser);

router.get('/:postId', postsController.getSingle);

// add 'isAuthenticated, validation.savePost' when ready
router.post('/:userId/:threadId', validation.savePost, postsController.createPost);

// add 'isAuthenticated, validation.savePost' when ready
router.put('/:postId', validation.savePost, postsController.updatePost);

// add 'isAuthenticated' when ready
router.delete('/:postId', postsController.deletePost);

module.exports = router;