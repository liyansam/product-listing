//SOCKET.IO event handler

let ProductDAO = require('./dao/productDao.js');
let productDao = new ProductDAO();

var config = require('config');

module.exports = function(io) {
    io.on('connection', function (socket) {
        console.log('Socket.io client Connected.');
    });
}
