const express = require('express');
const router = express.Router();
const threadsController = require('../controllers/threads');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', threadsController.getAll);

router.get('/:userId', threadsController.getAllfromUser);

router.get('/:threadId', threadsController.getSingle);

router.post('/:userId/:albumId', isAuthenticated, validation.saveThread, threadsController.createThread);

router.put('/:threadId/:albumId', isAuthenticated, validation.saveThread, threadsController.updateThread);

router.delete('/:threadId', isAuthenticated, threadsController.deleteThread);

module.exports = router;