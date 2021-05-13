const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const lessonsRoutes = require('./lessons-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/', lessonsRoutes);

module.exports = router;

