const express = require('express');
const {
    productList,
    productAdd,
    productById,
    productDelete,
    productPatch
} = require('../controllers/product.controllers');

const {
    checkLogin
} = require('./../midlleware/checkAdminLogin')

const router = express.Router();

router.get('/', productList);
router.get('/:id', productById);

router.post('/', checkLogin, productAdd);
router.patch('/:id', checkLogin, productPatch);
router.delete('/:id', checkLogin, productDelete);

module.exports = router;