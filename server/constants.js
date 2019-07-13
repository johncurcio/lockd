module.exports = {
	MONGO_URI: 'mongodb://localhost:27017/lockd',
	MONGO_OPTIONS: {
		useNewUrlParser: true,
		keepAlive: true,
		reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
		poolSize: 10
	},
//	DEFAULT_DOMAIN: 'lockd.dev/',
	DEFAULT_DOMAIN: 'localhost:7000/',
	REDIS_URL: 'redis://127.0.0.1:6379',
}