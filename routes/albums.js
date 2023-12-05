const express = require('express');
const router = express.Router();

const usersController = require('../controllers/albums');
// const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

// add 'isAuthenticated, validation.saveAlbum' when ready
router.post('/', validation.saveAlbum, usersController.createAlbum);

// add 'isAuthenticated, validation.saveAlbum' when ready
router.put('/:id', validation.saveAlbum, usersController.updateAlbum);

// add 'isAuthenticated' when ready
router.delete('/:id', usersController.deleteAlbum);

module.exports = router;