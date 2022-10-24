'use strict';

  // @type {import(`sequelize-cli`).Migrations}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, {
      timestamps: false,
      tableName: 'users',
    });

  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('users');
  }
};
