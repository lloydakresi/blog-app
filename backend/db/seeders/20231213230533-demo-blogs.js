'use strict';
const faker = require('@faker-js/faker');
const tenBlogs = Array.from({ length: 10 }, (_, index) => ({
  title: `BlogTitle${index}`,
  content: `BlogContent${index}`,
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
    await  queryInterface.bulkInsert('Blogs', tenBlogs, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Blogs', null, {});
  }
};
