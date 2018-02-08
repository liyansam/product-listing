//SOCKET.IO event handler

let ProductDAO = require('./dao/productDao.js');
let productDao = new ProductDAO();

var config = require('config');

module.exports = function(io) {

    io.on('connection', function (socket) {

        console.log('Socket.io client Connected.');

        socket.on('public-msg', function (obj) {

            // VerifyJwt(obj.jwt, function(decoded){

            //     if(obj.data.message) {
            //         //Set user sender! Dont let the user mock this! Get by JWT
            //         //obj.data.message.sender = decoded.id;

            //         *
            //          * MESSAGEDAO ALREADY HANDLES BROADCAST OF EVENTS TO SUPPORT HEADLESS CLIENT

            //         messageDao.create(obj.data.message, function (createdMessage) {
            //                 console.log('New public message sent.');
            //             },
            //             function (error) {
            //                 console.log('Failed to send public message.')
            //             })
            //     }

            // });

        });

    });
}
