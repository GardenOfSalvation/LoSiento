// if user isn't logged in, send them to login page

const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        console.log(req.session);
        res.redirect('/login');
    } else {
        next();
    }
};
      
module.exports = withAuth;