const express = require('express');
const router = express.Router();

const threadsController = require('../controllers/threads');
// const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', threadsController.getAll);

router.get('/:userId', threadsController.getAllfromUser);

router.get('/:threadId', threadsController.getSingle);

// add 'isAuthenticated, validation.saveThread' when ready
router.post('/:userId/:albumId', validation.saveThread, threadsController.createThread);

// add 'isAuthenticated, validation.saveThread' when ready
router.put('/:threadId/:albumId', validation.saveThread, threadsController.updateThread);

// add 'isAuthenticated' when ready
router.delete('/:threadId', threadsController.deleteThread);

module.exports = router;