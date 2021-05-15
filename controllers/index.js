const router = require('express').Router();

// import different routes
const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const lessonsRoutes = require('./lessons-routes.js');
const userRoutes = require('./user-routes.js');

// divide up different routes into separate js files
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/', lessonsRoutes);
router.use('/', userRoutes);

// export them

module.exports = router;

