var mongoose = require('mongoose');

var UrlSchema = new mongoose.Schema({
    original_url: String,
    short_url: String,
    uses: Number,
    updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Url', UrlSchema);