const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const lessonsRoutes = require('./lessons-routes.js');
const userRoutes = require('./user-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/', lessonsRoutes);
router.use('/', userRoutes);

module.exports = router;

