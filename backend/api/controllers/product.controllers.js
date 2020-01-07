const
    mongoose = require('mongoose');

const Product = require('../models/product.models')

exports.productList = async (req, res) => {
    try {
        const products = await Product.find().populate('product_category');
        res.status(200).json({
            count: products.length,
            products
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.productById = async (req, res) => {
    try {
        const product = await Product.findById({ _id: req.params.id }).populate('product_category');
        res.status(200).json({
            product
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.productAdd = async (req, res) => {
    try {
        const body = await req.body;

        const newProduct = await new Product({
            _id: mongoose.Types.ObjectId(),
            product_name: body.product_name,
            product_category: body.product_category,
            product_stock: body.product_stock,
            product_price: body.product_price,

        })

        await newProduct.save()

        res.status(201).json({
            message: "Created new product success !",
            newProduct
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.productPatch = async (req, res) => {
    try {
        const body = req.body

        await Product.findByIdAndUpdate({ _id: req.params.id }, body)
        res.status(200).json({
            message: "Update data successfull"
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.productDelete = async (req, res) => {
    try {
        await Product.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({
            message: "Delete data successfull"
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}