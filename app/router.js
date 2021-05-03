const express = require('express')
require('express-async-errors')
const { error } = require('../middlewares')
const users = require('../routes/users')

module.exports = (app) => {

	app.use(express.urlencoded({ extended: true }))
	app.use(express.json())
	
	app.use('/api/users', users)
	// ...routes
	app.use(error) //handle errors after it pass the above routes [more info in README.MD]
}