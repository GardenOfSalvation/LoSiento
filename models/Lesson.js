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
        words: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        created_by: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        public: {
            type: DataTypes.BOOLEAN, 
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Lesson;