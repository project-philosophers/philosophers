'use strict';
const {
  Sequelize, Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Literature extends Model {
  }

  Literature.init({
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
    authors: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    authors_questioning: {
      type: Sequelize.BOOLEAN
    },
    year: {
      type: Sequelize.INTEGER
    },
    year_questioning: {
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
  }, {
    sequelize,
    modelName: 'Literature',
    tableName: 'literature'
  });

  return Literature;
};
