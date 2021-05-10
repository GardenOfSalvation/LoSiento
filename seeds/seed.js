const sequelize = require('../config/config');
const { User, Lesson } = require('../models');

const userData = require('./user.json');
const lessonData = require('./lessons.json');

async function seedDatabase() {
    await sequelize.sync({ force: true });

   // await User.bulkCreate(userData, {individualHooks: true });
   await Lesson.bulkCreate(lessonData);

    process.exit(0);
}

seedDatabase();