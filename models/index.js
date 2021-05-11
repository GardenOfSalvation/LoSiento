const History = require('./History');
const Lesson = require('./Lesson');
const User = require('./User');

// associate history table to user table so that user history is deleted when user is deleted

History.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(History, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// build in functionality for when users are allowed to create lessons (anticipated)

Lesson.belongsTo(User, {
    foreignKey: 'created_by',
    onDelete: 'CASCADE'
});

User.hasMany(Lesson, {
    foreignKey: 'created_by',
    onDelete: 'CASCADE'
})

module.exports = {
    History, 
    Lesson, 
    User
};


// might need to add Languages table
// might need to add Language data field to history

