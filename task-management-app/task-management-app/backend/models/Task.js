const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255]
    }
  },
  status: {
    type: DataTypes.ENUM('Todo', 'In Progress', 'Completed'),
    allowNull: false,
    defaultValue: 'Todo',
    validate: {
      isIn: [['Todo', 'In Progress', 'Completed']]
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'tasks',
  timestamps: true
});

module.exports = Task;
