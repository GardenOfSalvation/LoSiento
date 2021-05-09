const router = require('express').Router();
const User = require('../../models/User');

// express flash!?
// use passport middleware
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; 

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    async function(username, password, done) {
        const user = await User.findOne({ where: { username: username } });

        if (!user) {
            return done(null, false, { message: 'No user account!' });
        }

        if(!user.checkPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    }
));


// create route for authenticating user login
router.post('/login', async (req, res, next) => {
    console.log(req);

    passport.authenticate('local', (err, user, info) => {
        if(err) { 
            return next(err);
        };

        if(!user) {
            return res.status(400).json({message: info.message});
        }

        req.logIn(user, (err) => {
            if(err) {
                return next(err);
            }

            // set session variables
            req.session.loggedIn = true;
            req.session.username = user;

            // next
            return res.status(200).json({ status: 'ok' });
        });
    })(req, res, next);
});

module.exports = router;