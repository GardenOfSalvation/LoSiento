const router = require('express').Router();
const User = require('../../models/User');

// create new user
router.post('/', async (req,res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });

        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;
            res.status(200).json({ message: 'User created successfully!', newUser })
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// update email 
router.put('/email/:id', async (req,res) => {
    try {
        // authenticate request first
        const user = await User.findOne({ where: { id: req.params.id } });
    
        if (!user) {
          res.status(400).json({ message: 'No user account!' });
          return;
        }
    
        const validPassword = user.checkPassword(req.body.password);
    
        if (!validPassword) {
          res.status(400).json({ message: 'Password wrong, not updated!' });
          return;
        }

        // request is authenticated, continue with updating
        const updatedUser = await user.update(
            {   
                email: req.body.email
            }
        );
        
        if(!updatedUser) {
            req.status(500).json({ message: 'Error updating user!' });
        }

        res.status(200).json({ message: 'User email updated successfully!', updatedUser })
    }
    catch (error) {
        res.status(500).json(error);
    }
});

// update password - can only change password
router.put('/password/:id', async (req,res) => {
    try {
        // authenticate request first
        const user = await User.findOne({ where: { id: req.params.id } });
    
        if (!user) {
          res.status(400).json({ message: 'No user account!' });
          return;
        }
    
        const validPassword = user.checkPassword(req.body.current_password);
    
        if (!validPassword) {
          res.status(400).json({ message: 'Password wrong, not updated!' });
          return;
        }

        // request is authenticated, continue with updating
        const updatedUser = await user.update(
            {   
                password: req.body.new_password
            },
            { 
                individualHooks: true
            }
        );
        
        if(!updatedUser) {
            req.status(500).json({ message: 'Error updating user!' });
        }

        res.status(200).json({ message: 'User password updated successfully!', updatedUser })
    }
    catch (error) {
        res.status(500).json(error);
    }
});

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

// create route for logging user out
router.post('/logout', async (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// delete user
router.delete('/delete/:id', async (req, res) => {
        // authenticate request first
        const user = await User.findOne({ where: { id: req.params.id } });

        if (!user) {
            res.status(400).json({ message: 'No user account!' });
            return;
        }
    
        const validPassword = user.checkPassword(req.body.password);
    
        if (!validPassword) {
            res.status(400).json({ message: 'Password wrong, not updated!' });
            return;
        }

        // request is authenticated, continue with updating
        const deletedUser = await user.destroy();
        
        if(!deletedUser) {
            req.status(500).json({ message: 'Error deleting user!' });
        }

        res.status(200).json({ message: 'User deleted successfully!', deletedUser })
});

module.exports = router;