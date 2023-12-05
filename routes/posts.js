const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts');
// const { isAuthenticated } = require('../middleware/authenticate');
// const validation = require('../middleware/validate');

router.get('/', postsController.getAll);

router.get('/:id', postsController.getSingle);

// add 'isAuthenticated, validation.savePost' when ready
router.post('/', postsController.createPost);

// add 'isAuthenticated, validation.savePost' when ready
router.put('/:id', postsController.updatePost);

// add 'isAuthenticated' when ready
router.delete('/:id', postsController.deletePost);

module.exports = router;