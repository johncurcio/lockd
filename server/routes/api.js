const mongoose = require('mongoose');
const shortener = mongoose.model('shortener');
const constants = require('../constants');
const validator = require('validator');

async function createShortUrl(response, originalUrl, domainUrl, error){
	let shortUrl = await shortener.findOne({ originalUrl }).exec();

	if (shortUrl){
		response.status(200).json({
			url: shortUrl.domainUrl + shortUrl._id,
			error: error
		}); // returns the short url in database
	} else {
		let updatedAt = Date.now();
		let item = new shortener({ originalUrl, domainUrl, updatedAt });
		await item.save();
		response.status(200).json( { 
			url: item.domainUrl + item._id,
			error: error
		});
	}
}

async function createUrlWithAlias(response, originalUrl, domainUrl, alias){
	let shortUrl = await shortener.findOne({ _id: alias }).exec();

	if (alias === ""){
		createShortUrl(response, originalUrl, domainUrl, '');
	} else if (shortUrl){
		createShortUrl(response, originalUrl, domainUrl, 'The alias is already in use. We generated a random url instead!');
	} else {
		let updatedAt = Date.now();
		let item = new shortener({ originalUrl, domainUrl, updatedAt, _id: alias });
		await item.save();
		response.status(200).json( {
			url: item.domainUrl + item._id,
			error: "" 
		});
	}
}

module.exports = app => {

	app.get('/:code', async (request, response) => {
		// TODO: authentication
		const urlCode = request.params.code;
		const item = await shortener.findOne({ _id: urlCode });
		if (item) {
			return response.redirect(item.originalUrl);
		}
	});

	app.post('/api/shorten', async (request, response) => {
		const { originalUrl, alias, password } = request.body;

		if (validator.isURL(originalUrl)){
			const domainUrl = constants.DEFAULT_DOMAIN;
			createUrlWithAlias(response, originalUrl, domainUrl, alias);
		}else{
			response.status(422).json({ error: 'Invalid url' });
		}
	});

};