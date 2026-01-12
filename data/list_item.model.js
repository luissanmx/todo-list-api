const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const List = require('./list.model');

const ListItem = sequelize.define('ListItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  list_id: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'list_items',
  timestamps: false
});

ListItem.belongsTo(List, { foreignKey: 'list_id' });
List.hasMany(ListItem, { foreignKey: 'list_id' });

module.exports = ListItem;
