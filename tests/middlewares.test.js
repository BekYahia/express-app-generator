const request = require('supertest')
const { User } = require('../models')
let server
const fn =  require('../app/logging')

describe('Middlewares', () => {

	beforeEach(() => { server = require('../index') })
	afterEach( async () => {
		await User.destroy({ where: {} })
		server.close()
	})
	const user = {
		name: 'John Doe',
		email: "j@doe.com",
		password: "1234"
	}

	describe('Error', () => {
		it('throw an error', async () => {
			expect(fn(null)).toBeUndefined()
		})
	})

	describe('Admin', () => {
		it('reject unautharized user', async() => {

			let usr = await request(server).post('/api/users').send(user)
			usr = await User.findByPk(usr.body.id)
			const token = await usr.getJwt()
			const res = await request(server).get('/api/users/dashboard').set('x-auth-token', token)
	
			expect(res.status).toBe(403)
			expect(res.body).toBe('Admins Only!')
		})

	
		it('open the gates for the admin', async() => {
	
			let usr = await request(server).post('/api/users').send({...user, role: 'admin'})
			usr = await User.findByPk(usr.body.id)
			const token = await usr.getJwt()
			const res = await request(server).get('/api/users/dashboard').set('x-auth-token', token)
	
			expect(res.status).toBe(200)
			expect(res.body).toBe('Welcome Admin!')
		})
	})
})