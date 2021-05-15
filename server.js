// use express and sessions
const express = require('express');
const session = require('express-session');

// use handlebars, helpers, and path
const exphbs = require('express-handlebars');
const path = require('path');

// initialize express app, set port (compatible with heroku)
const app = express();
const PORT = process.env.PORT || 3001;

// initialize sequelize connection, use DB for sessions
const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// import settings from .env
require('dotenv').config();

// bring in helpers
const helpers = require('./utils/helpers');

// configure session
const sess = {
    resave: true,
    secret: process.env.SESSION_SECRET,
    cookie: {},
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    }),
    expires: 300000,
};

// tell express to use sessions
app.use(session(sess));

// initialize handlebars { helpers }
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// configure express server
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// tell express to use controller files 
app.use(require('./controllers/'));

// start server, sync with database
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});