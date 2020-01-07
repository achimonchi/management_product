const
    mongoose = require('mongoose'),
    moment = require('moment');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product_name: {
        type: String,
        required: true
    },
    product_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true,
    },
    product_stock: {
        type: Number,
        default: 0,
    },
    product_price: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Number,
        default: moment().valueOf()
    }
})

module.exports = mongoose.model('products', productSchema);