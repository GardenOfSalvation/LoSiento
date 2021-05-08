const router = require('express').Router();
const authorizeHelper = require('../utils/auth');

router.get('/', authorizeHelper, async (req,res) => {
    try {
        // database stuff here
    }
    catch(error) {
        // error stuff here
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;