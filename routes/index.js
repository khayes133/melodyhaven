const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/albums', require('./albums'));
router.use('/threads', require('./threads'));
router.use('/posts', require('./posts'));

module.exports = router;    