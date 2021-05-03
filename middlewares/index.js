const RequestValidator = require('./validation')
const winston = require('winston')
const jwt = require('jsonwebtoken')
const { jwt_key } =  require('../config')

module.exports = {

	error(err, _req, res, next) {
		winston.error(err.message, err)
		return res.status(500).json('Sorry, Something went wrong!').end()
	},


	admin(req, res, next) {
		if(req.user.role !== 'admin') return res.status(403).json('Admins Only!')
		next()
	},


	auth(req, res, next) {
		const token = req.header('x-auth-token')
		if (!token) return res.status(401).json('Access denied, no provided token!')

		try {
			const decoded = jwt.verify(token, jwt_key)
			req.user = decoded
			next()
		} catch (ex) {
			res.status(400).json('Invalid token!')
		}
	},


	RequestValidator

}