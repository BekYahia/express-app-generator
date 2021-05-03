'use strict'

const { Model } = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwt_key } = require('../config')

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}

	User.init({
		name: DataTypes.STRING,
		password: DataTypes.STRING,
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true
			}
		},
		role: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'User'
	})


	/**
	 *  [ beforeCreate, beforeUpdate are sequelize builtin lifesycle methods]
	*/
	 
	User.beforeCreate( async (user, options) => {
		user.password = await User.hashPwd(user.password)
		user.email = user.email.toLowerCase()
	})


	User.beforeUpdate(async (user, options) => {
		user.email = user.email.toLowerCase()

		if (user._previousDataValues.password != user.password) {
			user.password = await User.hashPwd(user.password)
		}
	})


	User.hashPwd = async (password) => {
		const salt = await bcrypt.genSalt(10)
		return bcrypt.hash(password, salt)
	}

	//inestences
	User.prototype.verifyPass = function (password) {
		return bcrypt.compare(password, this.password)
	}

	User.prototype.getJwt = function () {
		const payload = {
			id: this.id,
			email: this.email,
			role: this.role
		}
		return jwt.sign(payload, jwt_key)
	}

	return User
}