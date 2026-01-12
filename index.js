require('dotenv').config();
const express = require('express');
const businessUser = require('./business/business.user');
const businessList = require('./business/business.list');
const businessListItem = require('./business/business.list_item');
const authenticateToken = require('./lib/auth');
const app = express();
app.use(express.json());

app.post('/api/v1/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const result = await businessUser.signup(username, password);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/v1/signin', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const result = await businessUser.signin(username, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});


app.get('/api/v1/lists', authenticateToken, async (req, res) => {
  try {
    const lists = await businessList.getLists(req.user.id);
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/v1/lists', authenticateToken, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Missing list name' });
  try {
    const result = await businessList.createList(req.user.id, name);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/v1/lists/:listId/items', authenticateToken, async (req, res) => {
  const { description } = req.body;
  const { listId } = req.params;
  if (!description) return res.status(400).json({ error: 'Missing item description' });
  try {
    const result = await businessListItem.addListItem(req.user.id, listId, description);
    res.status(201).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.put('/api/v1/lists/:listId/items/:itemId', authenticateToken, async (req, res) => {
  const { description, completed } = req.body;
  const { listId, itemId } = req.params;
  try {
    const result = await businessListItem.updateListItem(req.user.id, listId, itemId, { description, completed });
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.get('/api/v1/lists/:listId/items', authenticateToken, async (req, res) => {
  const { listId } = req.params;
  try {
    const items = await businessListItem.getListItems(req.user.id, listId);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/v1/lists/:listId/items/:itemId', authenticateToken, async (req, res) => {
  const { listId, itemId } = req.params;
  try {
    const result = await businessListItem.deleteListItem(req.user.id, listId, itemId);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.post('/api/v1/change-password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Missing fields' });
  try {
    const result = await businessUser.changePassword(req.user.id, currentPassword, newPassword);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));

