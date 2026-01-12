const List = require('../data/list.model');
const ListItem = require('../data/list_item.model');

module.exports = {
  addListItem: async (userId, listId, description) => {
    const list = await List.findOne({ where: { id: listId, user_id: userId } });
    if (!list) throw new Error('List not found');
    const item = await ListItem.create({ list_id: listId, description });
    return { id: item.id, description: item.description };
  },
  updateListItem: async (userId, listId, itemId, fields) => {
    const list = await List.findOne({ where: { id: listId, user_id: userId } });
    if (!list) throw new Error('List not found');
    const item = await ListItem.findOne({ where: { id: itemId, list_id: listId } });
    if (!item) throw new Error('Item not found');
    if (fields.description !== undefined) item.description = fields.description;
    if (fields.completed !== undefined) item.completed = !!fields.completed;
    await item.save();
    return { message: 'Item updated' };
  },
  deleteListItem: async (userId, listId, itemId) => {
    const list = await List.findOne({ where: { id: listId, user_id: userId } });
    if (!list) throw new Error('List not found');
    await ListItem.destroy({ where: { id: itemId, list_id: listId } });
    return { message: 'Item deleted' };
  },
  getListItems: async (userId, listId) => {
    const list = await List.findOne({ where: { id: listId, user_id: userId } });
    if (!list) throw new Error('List not found');
    const items = await ListItem.findAll({ where: { list_id: listId } });
    return items.map(item => ({ id: item.id, description: item.description, completed: item.completed }));
  }
};