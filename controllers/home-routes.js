const router = require('express').Router();
const authorizeHelper = require('../utils/auth');

router.get('/', async (req,res) => {
    let logSwitch = req.session.loggedIn;
    res.render('homepage', {logSwitch});
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

module.exports = router;