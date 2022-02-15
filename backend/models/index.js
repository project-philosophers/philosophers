'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const singularize  = require('pluralize').singular;
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// tags
let tags = [];
fs
  .readdirSync(__dirname + '/tags')
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname + '/tags', file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    tags.push(model.name);
  });
  // .then(() => console.log(tags));

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


tags.forEach(tagName => {
  db.Philosophers.belongsToMany(db[tagName], {
    through: "phils-" + tagName.toLowerCase(),
    as: tagName.toLowerCase(),
    foreignKey: "ph_id",
    onDelete: "CASCADE"
  });
  db[tagName].belongsToMany(db.Philosophers, {
    through: "phils-" + tagName.toLowerCase(),
    as: "philosophers",
    foreignKey: singularize(tagName).toLowerCase() + "_id",
    onDelete: "CASCADE"
  });
})


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
