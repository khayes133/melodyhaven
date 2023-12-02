const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
// const { isAuthenticated } = require('../middleware/authenticate');
// const validation = require('../middleware/validate');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

// add 'isAuthenticated, validation.saveUser' when ready
router.post('/', usersController.createUser);

// add 'isAuthenticated, validation.saveUser' when ready
router.put('/:id', usersController.updateUser);

// add 'isAuthenticated' when ready
router.delete('/:id', usersController.deleteUser);

module.exports = router;