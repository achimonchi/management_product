const
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');

const Admin = require('../models/admin.models');

exports.adminList = async (req, res) => {
    try {
        const admin = await Admin.find()
        res.status(200).json({
            count: admin.length,
            admin
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.adminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id)
        res.status(200).json({
            admin
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.adminAdd = async (req, res) => {
    try {
        const body = await req.body;
        const hash = await bcrypt.hash(body.admin_password, 10);
        const newAdmin = await new Admin({
            _id: mongoose.Types.ObjectId(),
            admin_name: body.admin_name,
            admin_email: body.admin_email,
            admin_password: hash,
        })

        await newAdmin.save()
        res.status(201).json({
            message: "Created new admin success !",
            admin: newAdmin
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.adminPatch = async (req, res) => {
    try {
        var body = req.body
        const hash = await bcrypt.hash(body.admin_password, 10);
        body.admin_password = await hash;
        await Admin.findOneAndUpdate({ _id: req.params.id }, body)
        res.status(200).json({
            message: "Update data successfull !"
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.adminDelete = async (req, res) => {
    try {
        await Admin.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({
            message: "Delete data successful"
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.adminLogin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ admin_email: req.body.admin_email })
        await bcrypt.compare(req.body.admin_password, admin.admin_password, (err, result) => {
            if (err) {
                res.status(401).json({
                    message: "Auth failure !"
                })
            }
            else {
                if (result) {
                    const token = jwt.sign({
                        _id: admin._id,
                        admin_email: admin.admin_email
                    }, process.env.JWT_ADMIN_KEY, {
                        expiresIn: "1d"
                    });

                    res.status(200).json({
                        message: "Auth Success",
                        token: "Baerer " + token
                    })
                }
                else {
                    res.status(401).json({
                        message: "Auth failure !"
                    })
                }
            }
        })

    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}