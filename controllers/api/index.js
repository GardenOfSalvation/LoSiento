const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const lessonRoutes = require('./lesson-routes.js');

router.use('/user', userRoutes);
router.use('/lesson', lessonRoutes);

module.exports = router;