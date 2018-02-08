let ProductDao = require('../dao/productDao.js')

var socketManager = require('../singleton.js');
var io = socketManager.getIO();

let productDao = new ProductDao();

/**
 * productController.js
 *
 * @description :: Server-side logic for managing products.
 */

module.exports = {

    /**
     * productController.list()
     */
    list: function (req,res) {
        productDao.list(function (products) {
            return res.json(products);
        }, function (error) {
            return res.status(404).json(error);
        });
    },
    /**
     * productController.show()
     */
    show: function (req, res) {
        let id = req.params.id;
        productDao.findById(id, function (product) {
            return res.json(product);
        }, function (error) {
            return res.status(404).json(error);
        });
    },

    /**
     * productController.create()
     */
    create: function (req,res) {
        let product  = {
            name : req.body.name,
            description: req.body.description,
            price: req.body.price,
            created_at : req.body.created_at
        };

        productDao.create(product, function (created) {

            productDao.findById(created._id, function (found) {
                return res.status(201).json(found);
            }, function (error) {
                return res.status(404).json(error);
            });

        }, function (error) {
            return res.status(404).json(error);
        });
    },

    /**
     * productController.update()
     */
    update: function (req,res) {
        let product  = {
            id : req.params.id,
            name : req.body.name,
            description: req.body.description,
            price: req.body.price,
            created_at : req.body.created_at
        };
        productDao.update(product, function (product) {
            return res.json(product);
        }, function (error) {
            return res.status(404).json(error);
        });
    },

    /**
     * productController.remove()
     */
    remove: function (req,res) {
        let id =req.params.id;
        productDao.remove(id, function () {
            return res.status(204).json('Deleted');
        }, function (error) {
            return res.status(404).json(error);
        });

    }
};
