// config.js
module.exports = {
	db: process.env.JAWSDB_URL || 'mysql://root:A123456$@localhost:3306/scouterstats',
	host: process.env.HOST || 'localhost',
	port: process.env.PORT || 3000,
 	token: process.env.TOKEN_SECRET || "tokenaccess",
 	salt: process.env.BCRYPT_SALT_ROUNDS || 12,
 	expvalue: process.env.EXPIRATION_VALUE || 5,
 	exptype : process.env.EXPIRATION_TYPE || "days",
	mailerremi : process.env.NODEMAILER_REMITENTE || "no-reply@perufutbolstats.com",
	mailerrece : process.env.NODEMAILER_RECEPTOR || "ggoyzueta@perufutbolstats.com",
	sendgridkey : process.env.SENDGRID_API_KEY || "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",
	uriservice : process.env.URI_SERVICE || "http://localhost:3000",
	cloudinaryuri : process.env.CLOUDINARY_URL || "cloudinary://515937228236296:aPuQNGd2sKxoT8Vs9NsbWTM7GDY@hwt7egz3x",
	cloudname : process.env.CLOUD_NAME || 'hwt7egz3x',
	cloudinarykey : process.env.CLOUDINARY_API_KEY || '515937228236296',
	cloudinarysecret : process.env.CLOUDINARY_API_SECRET || 'aPuQNGd2sKxoT8Vs9NsbWTM7GDY',
	culqiuri: 'https://api.culqi.com/v2/',
	// culqi_apikey:  process.env.CULQI_API_KEY || 'pk_test_HV7ac5uoKZZtYxE9',
	// culqi_apisecret: process.env.CULQI_API_SECRET || 'sk_test_9QLjYg6TTt0phN8e',
	culqi_apikey:  process.env.CULQI_API_KEY || 'pk_live_GQPz4P4JwKchJbah',
	culqi_apisecret: process.env.CULQI_API_SECRET || 'sk_live_T8ma86tnM3GvGaVN',
}