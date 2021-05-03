'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING(15),
        defaultValue: 'user'
      },
	createdAt: {
		allowNull: false,
		type: Sequelize.DATE,
		defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
	},
	updatedAt: {
		allowNull: false,
		type: Sequelize.DATE,
		defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON update CURRENT_TIMESTAMP")
	}
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users')
  }
}