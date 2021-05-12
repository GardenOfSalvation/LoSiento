const sequelize = require('../config/config');
const { User, Lesson, History } = require('../models');

const userData = require('./user.json');
const lessonData = require('./lessons.json');

async function seedDatabase() {
    await sequelize.sync({ force: true });

    // insert fake users
    const users = await User.bulkCreate(userData, {individualHooks: true });

    // insert lessons
    const lessons = await Lesson.bulkCreate(lessonData);

    // iterate through all lessons, and then each user, to populate history table with fake data
    for(i = 0; i < lessons.length; i++) {
        for(n = 0; n < users.length; n++) {
            let randomScore = Math.floor((Math.random() * 30) + 70);

            await History.create({
                user_id: users[n].id,
                lesson_id: lessons[i].id,
                score: randomScore
            });
        }
    }

    process.exit(0);
}

seedDatabase();