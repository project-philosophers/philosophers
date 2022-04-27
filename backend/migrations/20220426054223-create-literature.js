'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('literature', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(10)
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      title_full: {
        type: Sequelize.TEXT
      },
      title_original: {
        type: Sequelize.TEXT
      },
      title_other: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      year_questioning: {
        type: Sequelize.BOOLEAN
      },
      authors: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      authors_questioning: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('literature');
  }
};
