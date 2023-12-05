const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/albums', require('./albums'));
router.use('/threads', require('./threads'));

module.exports = router;    