'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return await queryInterface.bulkInsert('education', [
      {id: 1, name: "education1", createdAt: now, updatedAt: now}
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('education', null, {});
  }
};
