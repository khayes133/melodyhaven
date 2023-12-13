const express = require('express');
const router = express.Router();

const usersController = require('../controllers/albums');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', isAuthenticated, validation.saveAlbum, usersController.createAlbum);

router.put('/:id', isAuthenticated, validation.saveAlbum, usersController.updateAlbum);

router.delete('/:id', isAuthenticated, usersController.deleteAlbum);

module.exports = router;