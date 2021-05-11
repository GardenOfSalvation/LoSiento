const sequelize = require('../config/config');
const { User, Lesson, History } = require('../models');

const userData = require('./user.json');
const lessonData = require('./lessons.json');

async function seedDatabase() {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {individualHooks: true });
    const lessons = await Lesson.bulkCreate(lessonData);

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