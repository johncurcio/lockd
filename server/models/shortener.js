const mongoose = require('mongoose');
const shortid = require('shortid');

var { Schema } = mongoose;

var shortenerSchema = new Schema({
	_id: { type: String, default: shortid.generate },
	originalUrl: String,
	domainUrl:   String,
	lock:        String,
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

mongoose.model("shortener", shortenerSchema);