const router = require('express').Router();
const authorizeHelper = require('../utils/auth');
const { History, User, Lesson } = require('../models/');

router.get('/', async (req,res) => {
    // display history so we can show what users are up to 
    let logSwitch = req.session.loggedIn;
    const historyData = await History.findAll(
        {   include: 
            [
                { model: Lesson, attributes: ['title'] },
                { model: User, attributes: ['username'] }
            ],
            limit: 10, 
            order: [['id', 'DESC']] 
        }
    );
    
    // map data so it's easier to work with
    let history = historyData.map((entry) => entry.get({plain: true}));

    // send it to handlebars template
    res.render('homepage', {logSwitch, history});
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

router.get('/lessons', authorizeHelper, (req, res) => {
    res.render('all_lessons');
});

router.get('/lesson/:id', authorizeHelper, (req, res) => {
    // grab lesson id, send it to view
    let lessonId = req.params.id;
    res.render('single-lesson', lessonId);
});

module.exports = router;