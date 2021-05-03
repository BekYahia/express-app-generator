const { jwt_key } = require("../config")
const winston = require("winston")

module.exports = (key = jwt_key) => {

	// Setup Winston
	winston.add(new winston.transports.File({
		level: 'error',
		filename: 'logger.log',
		handleExceptions: true,
		handleRejections: true
	}))
	winston.add(new winston.transports.Console({
		format: winston.format.combine(
			winston.format.colorize({ all: true }),
			winston.format.simple()
		),
		level: 'silly',
		handleExceptions: true,
		handleRejections: true
	}))

	// Check JWT key
	function checkJwtKey(val) {
		if(!val) new Error ('Please Set a JWT key in you environment.')
	}
	checkJwtKey(key)

	// Handle uncaughtException
	process.on("uncaughtException", ex => {
		winston.error(ex.message, ex)
		setTimeout(() => process.exit(1), 1000)
	})

	// Handle unhandledRejection
	process.on("unhandledRejection", rej => { throw rej })
}