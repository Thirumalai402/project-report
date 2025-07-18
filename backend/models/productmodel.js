const mongoose = require('mongoose');

const schemaProducts = new mongoose.Schema({
       name: String,
       price: String,
       description: String,
       ratings: String,
       images: [
        {
            image: String
        }
       ],
       category: String,
       seller: String,
       stock: String,
       numberofreviews: String,
       createdAt: Date
})
const productModel = mongoose.model('products', schemaProducts);

module.exports = productModel;