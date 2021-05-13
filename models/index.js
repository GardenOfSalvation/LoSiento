const History = require('./History');
const Lesson = require('./Lesson');
const User = require('./User');

// Associate History entries with both Users and Lessons

History.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(History, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

History.belongsTo(Lesson, {
    foreignKey: 'lesson_id',
    onDelete: 'CASCADE'
})

Lesson.hasMany(History, {
    foreignKey: 'lesson_id',
    onDelete: 'CASCADE'
})

/****** Saving for future functionality - when users can create lessons 
Lesson.belongsTo(User, {
    foreignKey: 'created_by',
    onDelete: 'CASCADE'
});

User.hasMany(Lesson, {
    foreignKey: 'created_by',
    onDelete: 'CASCADE'
})
**/

module.exports = {
    History, 
    Lesson, 
    User
};


// might need to add Languages table
// might need to add Language data field to history

