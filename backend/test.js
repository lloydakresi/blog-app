const { User, Blog } = require('./db/models');
const bcrypt = require('bcryptjs');

async function getUsers() {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'],
      include: Blog, // Assuming there is an association between User and Blog
    });
    console.log(JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error:', error);
  }
}

getUsers();
