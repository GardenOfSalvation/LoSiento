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

module.exports = router;