const mongoose = require('mongoose');
const shortener = mongoose.model('shortener');
const constants = require('../constants');
const validator = require('validator');

function getShortUrl(domainUrl, code, alias){
	if (alias || alias !== ""){
		return domainUrl + alias;
	} else {
		return domainUrl + code;
	}
}

module.exports = app => {

	app.get('/:code', async (request, response) => {
		const urlCode = request.params.code;
		const item = await shortener.findOne({ _id: urlCode });
		if (item) {
			return response.redirect(item.originalUrl);
		}
	});

	app.post('/api/shorten', async (request, response) => {
		const { originalUrl } = request.body;

		if (validator.isURL(originalUrl)){
			const domainUrl = constants.DEFAULT_DOMAIN;
			// TODO: add a cache and a KGS
			// TODO: add error handling and authentication

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