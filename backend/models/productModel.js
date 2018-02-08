var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    'name': {type: String, default: null},
    'description': {type: String, default: null},
    'price': {type: String, default: null},
    'created_at': {type: Date, default: Date.now}
})

module.exports = mongoose.model('product', productSchema);
