const router = require('express').Router();
const User = require('../../models/User');

// create route for authenticating user login
router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ where: { username: req.body.username } });
  
      if (!user) {
        res.status(400).json({ message: 'No user account!' });
        return;
      }
  
      const validPassword = user.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Password wrong!' });
        return;
      }
  
      req.session.save(() => {
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;
  
        res.json({ user, message: 'You are now logged in!' });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;