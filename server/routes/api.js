const mongoose = require('mongoose');
const shortener = mongoose.model('shortener');
const constants = require('../constants');
const validator = require('validator');

async function createShortUrl(response, originalUrl, domainUrl, lock, error){
	let shortUrl = await shortener.findOne({ originalUrl }).exec();

	if (shortUrl && lock === ""){ // if there's a lock, then create a new short url 
		response.status(200).json({
			url: shortUrl.domainUrl + shortUrl._id,
			error: error
		});
	} else {
		let updatedAt = Date.now();
		let item = new shortener({ originalUrl, domainUrl, updatedAt, lock });
		await item.save();
		response.status(200).json( { 
			url: item.domainUrl + item._id,
			error: error
		});
	}
}

async function createUrlWithAlias(response, originalUrl, domainUrl, alias, lock){
	let shortUrl = await shortener.findOne({ _id: alias }).exec();

	if (alias === ""){
		createShortUrl(response, originalUrl, domainUrl, lock, '');
	} else if (shortUrl){
		createShortUrl(response, originalUrl, domainUrl, lock, 'The alias is already in use. We generated a random url instead:');
	} else {
		let updatedAt = Date.now();
		let item = new shortener({ originalUrl, domainUrl, updatedAt, _id: alias, lock });
		await item.save();
		response.status(200).json( {
			url: item.domainUrl + item._id,
			error: "" 
		});
	}
}

module.exports = app => {

	app.post('/api/auth', async (request, response) => {
		const { urlCode, lock } = request.body;
		const item = await shortener.findOne({ _id: urlCode });
		if (item){
			item.authorize(lock, function(err, isMatch) {
		        console.log(item.lock);
		        if (isMatch) 
		        	response.status(202).json({ url: item.originalUrl });
		        else 
		        	response.status(401).json({ error: "Unauthorized redirection!" });
		    });
		}
	});

	app.get('/api/:code', async (request, response) => {
		const urlCode = request.params.code;
		let frontendUrl = request.headers.referer;
		console.log(request.headers);
		const item = await shortener.findOne({ _id: urlCode });
		if (item) {
			if (item.lock && item.lock != ""){
				return response.redirect(frontendUrl + urlCode + "/auth"); // explicit!
			} else {
				return response.redirect(item.originalUrl);
			}
		}
	});

	app.post('/api/shorten', async (request, response) => {
		const { originalUrl, alias, lock } = request.body;

		if (validator.isURL(originalUrl)){
			const domainUrl = constants.DEFAULT_DOMAIN;
			createUrlWithAlias(response, originalUrl, domainUrl, alias, lock);
		}else{
			response.status(422).json({ error: 'Invalid url' });
		}
	});

};