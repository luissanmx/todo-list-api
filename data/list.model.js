const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const User = require('./user.model');

const List = sequelize.define('List', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'lists',
  timestamps: false
});

List.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(List, { foreignKey: 'user_id' });

module.exports = List;
