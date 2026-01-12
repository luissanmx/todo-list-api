const List = require('../data/list.model');

module.exports = {
  getLists: async (userId) => {
    return await List.findAll({ where: { user_id: userId }, attributes: ['id', 'name', 'created_at'] });
  },
  createList: async (userId, name) => {
    const list = await List.create({ user_id: userId, name });
    return { id: list.id, name: list.name };
  },
  getListByIdAndUser: async (listId, userId) => {
    return await List.findOne({ where: { id: listId, user_id: userId } });
  }
};