const {DataTypes} = require('sequelize');
const sequelize = require('../db')

const Check = sequelize.define('Check', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    local: {
        type: DataTypes.STRING,
        allowNull: false
    },
    problems:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    component:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    }

})

module.exports = Check;