'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return await queryInterface.bulkInsert('keywords', [
      {id: 1, name: "keyword1", createdAt: now, updatedAt: now}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('keywords', null, {});
  }
};
