'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return await queryInterface.bulkInsert('literature', [
      {id: "1234567890", title: "title1", title_full: "", title_original: "", title_other: "", year: 385, year_questioning: false, authors_questioning: false, createdAt: now, updatedAt: now},
], {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('literature', null, {});
  }
};
