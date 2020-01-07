const
    mongoose = require('mongoose'),
    moment = require('moment');

const historySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products"
    },
    history_status: {
        type: String,
        required: true,
    },
    history_amount: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Number,
        default: moment().valueOf()
    }
})

module.exports = mongoose.model('histories', historySchema);