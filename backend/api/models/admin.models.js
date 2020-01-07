const
    mongoose = require('mongoose'),
    moment = require('moment');

const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    admin_name: {
        type: String,
        required: true
    },
    admin_email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    admin_password: {
        type: String,
        required: true
    },
    created_at: {
        type: Number,
        default: moment().valueOf()
    }
})

module.exports = mongoose.model('admins', adminSchema);