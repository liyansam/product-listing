var mongoose = require('mongoose');
var config = require('config');

module.exports = class ConnectionController {

    constructor() {
        this.db = mongoose.connection;
        this.connected = false;
        this.connect();
    }

    errorHandler(error) {
        console.log('MongoDB Error Connecting to database: ' + error );
    }

    openHandler() {
        console.log('MongoDB connection succesfull');
        this.connected = true;
    }

    connect() {
        if (!this.connected) {
            mongoose.connect(config.get('mongo_url'));
            this.db.on('error', this.errorHandler);
            this.db.once('open', this.openHandler);
        }
    }

    disconnect() {
        mongoose.disconnect();
    }
}
