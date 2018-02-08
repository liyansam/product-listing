var config = require('config');
let productModel = require('../models/productModel.js')

module.exports = class ProductDao {
    /**
     * annouceController.list()
     */
    list(success, error){
        productModel
            .find({})
            .sort({created_at: -1})
            .exec(function (err, products) {
                if (err){
                    return error({
                        message: 'Error when getting products.',
                        error: err
                    });
                }
                return success(products)
            });
    }

    /**
     * productController.findById()
     */
    findById(id, success, error) {
        productModel
            .findOne({_id: id})
            .exec(function (err, product) {
                if (err){
                    return error({
                        message: 'Error when getting products.',
                        error: err
                    });
                }
                // if (!product){
                //     return error({message: 'No such product'});
                // }
                return success(product._doc);
            });
    }

    /**
     * productController.create()
     */
    create(productObj, success, error) {

        let productToCreate = productModel(productObj);
        userModel.findOne({_id: productObj.id}, function (err, product) {
            productToCreate.save(function (err, product) {
                if (err) {
                    return error({
                        message: 'Error when creating product.',
                        error: err
                    });
                }
                return success(product._doc);
            });
        });

    }

    /**
     * productController.update()
     */
    update(productToUpdate, success, error) {

        productModel.findOne({_id: productToUpdate.id}, function (err, product) {
            if (err) {
                return error({
                    message: 'Error when getting product.',
                    error: err
                });
            }
            if (!product) {
                return error({
                    message: 'No such product.'
                });
            }

            product.id = productToUpdate.id;
            product.name = productToUpdate.name ? productToUpdate.name : product.name;
            product.description = productToUpdate.content ? productToUpdate.content : product.content;
            product.price = productToUpdate.price ? productToUpdate.price : product.price;
            product.created_at = productToUpdate.created_at ? productToUpdate.created_at : product.created_at;
            
            product.save(function (err, product) {
                if (err) {
                    return error({
                        message: 'Error when updating product.',
                        error: err
                    });
                }
                return success(product);
            });
        });
    }

    /**
     * productController.remove()
     */
    remove(id, success, error) {

        productModel.findByIdAndRemove(id, function (err, product) {
            if (err) {
                return error({
                    message: 'Error when deleting the product.',
                    error: err
                });
            }
            return success();
        });
    }


}
