const
    mongoose = require('mongoose');

const
    History = require('../models/history.models'),
    Product = require('./../models/product.models');

exports.historyList = async (req, res) => {
    try {
        const histories = await History.find().populate('product_id');
        res.status(200).json({
            count: histories.length,
            histories
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.historyById = async (req, res) => {
    try {
        const history = await History.findById(req.params.id).populate('product_id');
        res.status(200).json({
            history
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.historyByProduct = async (req, res) => {
    try {
        const histories = await History.find({ product_id: req.params.product_id }).populate('product_id');
        res.status(200).json({
            count: histories.length,
            histories
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.patchProductStock = async (req, res, next) => {
    try {
        const body = req.body;
        const oldProduct = await Product.findById(body.product_id);
        const oldStock = parseInt(oldProduct.product_stock);
        const newAmount = parseInt(body.history_amount);
        const newStock = await body.history_status === "In"
            ? oldStock + newAmount
            : oldStock >= newAmount
                ? oldStock - newAmount
                : res.status(400).json({
                    message: "Not enough stock !"
                });

        await Product.findOneAndUpdate({ _id: body.product_id }, { product_stock: newStock })
        next()
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.historyAdd = async (req, res) => {
    try {
        const body = req.body;

        const newHistory = await new History({
            _id: mongoose.Types.ObjectId(),
            product_id: body.product_id,
            history_status: body.history_status,
            history_amount: body.history_amount
        })

        await newHistory.save();
        res.status(201).json({
            message: `Created history with status ${body.history_status} success !`,
            newHistory,
        })

    }
    catch (err) {
        res.status(500).json({
            error: err,
        })
    }
}



exports.historyPatch = async (req, res) => {
    try {
        const body = req.body;

        const product = await Product.findById(body.product_id);
        const history = await History.findById(req.params.id);
        const product_stock = parseInt(product.product_stock);
        const history_amount = parseInt(history.history_amount);

        if (body.history_status) {
            res.status(400).json({
                message: "Cann't edit status"
            })
        }

        var diff_stock = history_amount - body.history_amount;

        if (history.history_status === "In") {
            diff_stock *= -1;
        }

        var newStock = product_stock + diff_stock;
        console.log(newStock)

        await History.findOneAndUpdate({ _id: req.params.id }, body);
        await Product.findOneAndUpdate({ _id: body.product_id }, { product_stock: newStock });
        res.status(200).json({
            message: "Update data successfull !",
        });
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

