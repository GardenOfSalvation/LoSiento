const router = require('express').Router();
const authorizeHelper = require('../utils/auth');

router.get('/', authorizeHelper, async (req,res) => {
    res.render('homepage');
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;