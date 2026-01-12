const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../data/user.model');

module.exports = {
  signup: async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { message: 'User created', token };
  },
  signin: async (username, password) => {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error('Invalid credentials');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { message: 'Signin successful', token };
  },
  changePassword: async (userId, currentPassword, newPassword) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) throw new Error('Current password is incorrect');
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return { message: 'Password changed successfully' };
  }
};