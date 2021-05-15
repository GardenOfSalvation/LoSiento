const router = require('express').Router();
const authorizeHelper = require('../utils/auth');
const { User } = require('../models/');

// main user page for profile
router.get('/user', authorizeHelper, async (req, res) => {
    let logSwitch = req.session.loggedIn;
    try {
        const userData = await User.findByPk(req.session.userId);

        const user = userData.dataValues;



        res.render('user', {logSwitch, user});
    }
    catch(error) {
        res.render('user', {logSwitch, error});
    }
});

// change password page
router.get('/user/password', authorizeHelper, async (req, res) => {
    // check to see if user logged in
    let logSwitch = req.session.loggedIn;

    try {
        //const language = req.body.language; -- NOT USED RIGHT NOW

        // get lesson data from database
        const lessonData = await Lesson.findByPk(req.params.id);
        const wordsString = lessonData.words;

        console.log(wordsString)
    }
    catch(error) {
        res.render('single_lesson', {error});
    }
});

// change password page
router.get('/user/email', authorizeHelper, async (req, res) => {
    // check to see if user logged in
    let logSwitch = req.session.loggedIn;

    try {
        //const language = req.body.language; -- NOT USED RIGHT NOW

        // get lesson data from database
        const lessonData = await Lesson.findByPk(req.params.id);
        const wordsString = lessonData.words;

        console.log(wordsString)
    }
    catch(error) {
        res.render('single_lesson', {error});
    }
});

module.exports = router;