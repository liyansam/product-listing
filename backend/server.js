var singleton = require('./singleton.js');
var app = singleton.getApp();
var http = singleton.getHttp();
var io = singleton.getIO();

var config = require('config');

var ConnectionController = require('./controllers/connectionController.js')

var bodyParser = require('body-parser');

let ProductDAO = require('./dao/productDao.js');
let productDao = new ProductDAO();

var websocket = require('./websocket.js')(io);
var conn = new ConnectionController();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Middleware, Headers and Server Bootstrap
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    type: function() {
        return true;
    }
}));

/**
 * Start REST API Endpoints
 * After we call the mongoose-gen we just have to require the created route here.
 */

var products = require('./routes/productRoutes.js');
app.use('/products', products);

/**
 * End of REST API Endpoints
 */

app.get('/', function (req, res) {
    res.json({"product-listing-status": "Running"});
});

var port = process.env.PORT || 3000;
process.env.NODE_ENV = 'default';
http.listen( port, function () {
    console.log('Server Started: ' + port + ' ENV[' + process.env.NODE_ENV + ']');
});

/**
 * Module exports for API Tests
 */
module.exports.getApp = app;
module.exports.getConn = conn;
