'use strict';
const faker = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const tenUsers = Array.from({ length: 10 }, (_, index) => ({
  email: `user${index}@user.io`,
  username: `User${index}`,
  hashedPassword: bcrypt.hashSync(`password${index}`),
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await  queryInterface.bulkInsert('Users', tenUsers, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
