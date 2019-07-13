const mongoose = require('mongoose');
const shortener = mongoose.model('shortener');
const constants = require('../constants');
const validator = require('validator');

module.exports = app => {

	app.post('/api/shorten', async (request, response) => {
		const { originalUrl } = request.body;

		if (validator.isURL(originalUrl)){
			const domainUrl = constants.DEFAULT_DOMAIN;
			// TODO: add a cache and a KGS
			// TODO: add error handling and authentication
			// TODO: redirect url

			let shortUrl = await shortener.findOne({ originalUrl }).exec();

			if (shortUrl){
				response.status(200).json(shortUrl.domainUrl + shortUrl._id); // returns the short url in database
			} else {
				let updatedAt = Date.now();
				let item = new shortener({ originalUrl, domainUrl, updatedAt });
				await item.save();
				response.status(200).json(item.domainUrl + item._id);
			}
		}else{
			response.status(422).json({ error: 'Invalid url' });
		}
	});

};