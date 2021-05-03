const { User } = require('../models')
const { Op } = require('sequelize')

module.exports =  {

    async all(req, res) {
		const users = await User.findAll({ attributes: { exclude: ['password'] }, order: [['id', 'DESC']] })
		res.send(users)
    },


    async byId(req, res) {
		const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } })
		res.send(user)
    },


    async me(req, res) {
		const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } })
		res.send(user)
	},
	
	
	async login(req, res) {
		const user = await User.findOne({ where: { email: req.body.email.toLowerCase() } })

		if (user) vaidPass = await user.verifyPass(req.body.password)
		if (!user || !vaidPass) return res.status(400).json('Invalid Email or Password!')

		const token = await user.getJwt()
		user.password = undefined
		res.header('x-auth-token', token).send(user)
	},


    async create(req, res) {
		//check if email exist
		const isUser = await User.findOne({ where: { email: req.body.email.toLowerCase() } })
		if (isUser) return res.status(400).json('Email already been used!')

		//save
		const user = await User.create(req.body)

		user.dataValues.password = undefined

		res.send(user)
    },


   async update(req, res) {
		//check if email associated with anothor user
		if(req.body.email) {
			let isUser = await User.findOne({
				where: {
					email: req.body.email.toLowerCase(),
					id: { [Op.ne]: req.params.id }
				}
			})
			if (isUser) return res.status(400).json('Email already been used!')
		}

		//update
		const user = await User.update(req.body, {
			where: { id: req.params.id },
			individualHooks: true
		})


		//return if nothong found
		if(!user[1][0]) return res.json('no user found')

		let data = user[1][0].dataValues
		data.password = undefined

		res.json(data)
    },


	async delete(req, res) {
		const del = await User.destroy({ where: { id: req.params.id } })
		res.send({ del })
	},


	async dashboard(req, res) {
		res.json('Welcome Admin!')
	},

}