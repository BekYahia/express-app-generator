const route = require('express').Router()
const UserController = require('../controllers/users')
const { RequestValidator, auth, admin } = require('../middlewares')
const validate = RequestValidator.users

// Puplic Routes
route.post('/login', validate.login, UserController.login)
route.post('/', validate.create, UserController.create)


// Protected Routes
// route.all('*', auth) //enable this line will make auth required in all routes
route.get('/', UserController.all)
route.get('/me', auth ,UserController.me)
route.get('/dashboard', [auth, admin], UserController.dashboard)
route.get('/:id', validate.id, UserController.byId)
route.put('/:id', validate.update, UserController.update)
route.delete('/:id', validate.id, UserController.delete)

module.exports = route