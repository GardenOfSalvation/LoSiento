// History.js (tracks each lesson completed by a user)
// so fields would be id, date_started,date_completed, user_id, lesson_id

class History extends Model {}

History.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    date_started: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    date_completed: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    lesson_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'lesson',
            key: 'id'
        }
    }
});

module.exports = History;