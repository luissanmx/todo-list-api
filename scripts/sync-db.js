require('dotenv').config();
const sequelize = require('../data/sequelize');
const User = require('../data/user.model');
const List = require('../data/list.model');
const ListItem = require('../data/list_item.model');

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
    process.exit(0);
  } catch (err) {
    console.error('Failed to sync database:', err);
    process.exit(1);
  }
})();
