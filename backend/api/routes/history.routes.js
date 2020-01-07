const express = require('express');

const {
    checkLogin
} = require('./../midlleware/checkAdminLogin');

const {
    historyList,
    historyById,
    historyByProduct,
    historyAdd,
    historyPatch,
    patchProductStock
} = require('./../controllers/history.controllers');

const router = express.Router();

router.get('/', checkLogin, historyList);
router.get('/:id', checkLogin, historyById);
router.get('/products/:product_id', historyByProduct);

router.post('/', checkLogin, patchProductStock, historyAdd);
router.patch('/:id', checkLogin, historyPatch);

module.exports = router;