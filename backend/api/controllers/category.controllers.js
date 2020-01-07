const
    mongoose = require('mongoose');

const Category = require('./../models/category.models');

exports.categoryList = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json({
            count: categories.length,
            categories
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.categoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json({
            category
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.categoryAdd = async (req, res) => {
    try {
        const body = await req.body;
        const newCategory = await new Category({
            _id: mongoose.Types.ObjectId(),
            category_name: body.category_name
        })

        await newCategory.save()
        res.status(201).json({
            message: "Created new category success !",
            newCategory
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.categoryPatch = async (req, res) => {
    try {
        const body = req.body;

        await Category.findByIdAndUpdate({ _id: req.params.id }, body)
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

exports.categoryDelete = async (req, res) => {
    try {
        await Category.findOneAndDelete({ _id: req.params.id });
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
