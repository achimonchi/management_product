const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    try {
        mongoose.connect('mongodb://localhost:27017/ralali', {
            useNewUrlParser: true
        });

        db = mongoose.connection;
        next()
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }


}
