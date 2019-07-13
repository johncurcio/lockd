const mongoose = require('mongoose');
const shortid = require('shortid');

var { Schema } = mongoose;

// short url will be domainURL + _id
var shortenerSchema = new Schema({
	_id: { type: String, default: shortid.generate },
	originalUrl: String,
	domainUrl:   String,
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

mongoose.model("shortener", shortenerSchema);