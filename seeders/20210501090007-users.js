'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 **/
		await queryInterface.bulkInsert('Users', [{
			name: 'John Doe',
			email: 'j@doe.com',
			password: '$2b$10$UYoPFs/yGPqKjLxkEDyVUubZRQYDFhYtOSg1KUSmDNPTQNMuQNuue',
			role: 'admin'
		}], {});

	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 */
		await queryInterface.bulkDelete('Users', null, {});

	}
};