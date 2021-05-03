const app = require('express')()
const winston = require('winston')


require('./app/logging')()

require('./app/router')(app)


const PORT = process.env.PORT
			|| process.env.NODE_ENV == 'test' ? 30001 : 3000

const server = app.listen(PORT, () => {
	winston.verbose(`App listening on port ${PORT}!`)
})

module.exports = server