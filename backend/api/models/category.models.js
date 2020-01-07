const
    mongoose = require('mongoose'),
    moment = require('moment');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category_name: {
        type: String,
        required: true
    },
    created_at: {
        type: Number,
        default: moment().valueOf()
    }
})

module.exports = mongoose.model('categories', categorySchema);