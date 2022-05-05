'use strict';

const path = (async()=> await import('path'))();
import { mode } from "$app/env"
import { Model } from 'sequelize'
import Sequelize from 'sequelize'
import _config from './config.json'
const db = {};

const config = _config[mode]

const models = [
  (sequelize, DataTypes) => {
    class item extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
      }
    }
    item.init({
      from: DataTypes.STRING,
      hash: DataTypes.STRING,
      price: DataTypes.STRING,
      tags: DataTypes.ARRAY(DataTypes.STRING)
    }, {
      sequelize,
      modelName: 'item',
    });
    return item;
  }
]

let sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

models.forEach(m => {
    const model = m(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db
