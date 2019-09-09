import Sequelize from 'sequelize';

import User from '../app/models/User';
import Product from '../app/models/Product';
import Category from '../app/models/Category';

import databaseConfig from '../config/database';

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Conexão com a base de dados.
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
