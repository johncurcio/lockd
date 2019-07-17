const mongoose = require('mongoose');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

var { Schema } = mongoose;

var shortenerSchema = new Schema({
	_id: { type: String, default: shortid.generate },
	originalUrl: String,
	domainUrl:   String,
	lock:        String,
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

shortenerSchema.pre('save', function(next) {
    var shortener = this;

	if (shortener.lock === undefined) return next();
	if (shortener.lock === "") return next();
    if (!shortener.isModified('lock')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(shortener.lock, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext lock with the hashed one
            shortener.lock = hash;
            next();
        });
    });
});

shortenerSchema.methods.authorize = function(clock, cb) {
    bcrypt.compare(clock, this.lock, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

mongoose.model("shortener", shortenerSchema);