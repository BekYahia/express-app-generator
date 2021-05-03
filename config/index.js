if(process.env.NODE_ENV != 'production')
	require('dotenv').config()

/*
 *	non-db enviroment variables
 *  
*/

module.exports = {

	jwt_key: process.env.EXPRESS_APP_JWT_KEY
	// ...ENV_KEYS

}