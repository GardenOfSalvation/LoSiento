const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const lessonRoutes = require('./lesson-routes.js');
const historyRoutes = require('./history-routes.js');

router.use('/user', userRoutes);
router.use('/lesson', lessonRoutes);
router.use('/history', historyRoutes);

module.exports = router;