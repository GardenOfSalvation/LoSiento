const sequelize = require('../config/config');
const User = require('../models/User');

const userData = require('./user.json');

async function seedDatabase() {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {individualHooks: true });

    process.exit(0);
}

seedDatabase();