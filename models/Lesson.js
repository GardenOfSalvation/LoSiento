// lessons could be JSON strings with English words that we feed to the API
// allow users to not only access our lessons, but create their own and set them to public / private
// if public, other users can see them and try them out
// id, words, date_created, created_by, public

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Lesson extends Model {}

Lesson.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        words: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_by: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
            allowNull: true
        },
        public: {
            type: DataTypes.BOOLEAN, 
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'lesson',
    }
);

module.exports = Lesson;