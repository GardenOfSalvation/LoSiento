const router = require('express').Router();
const authorizeHelper = require('../utils/auth');

router.get('/', authorizeHelper, async (req,res) => {
    res.render('homepage');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/user/', authorizeHelper, (req, res) => {
    res.render('user');
});

router.get('/user/email', authorizeHelper, (req, res) => {
    res.render('update_email');
});

router.get('/user/password', authorizeHelper, (req, res) => {
    res.render('update_password');
});

router.get('/lesson', authorizeHelper, (req, res) => {
    res.render('all_lessons');
});

router.get('/lesson/:id', authorizeHelper, (req, res) => {
    // grab lesson id, send it to view
    let lessonId = req.params.id;
    res.render('single-lesson', lessonId);
});

module.exports = router;