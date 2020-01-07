const express = require('express');

const {
    categoryAdd,
    categoryList,
    categoryById,
    categoryDelete,
    categoryPatch
} = require('./../controllers/category.controllers')

const {
    checkLogin
} = require('./../midlleware/checkAdminLogin')


const router = express.Router();

router.get('/', categoryList);
router.get('/:id', categoryById);
router.post('/', checkLogin, categoryAdd);
router.patch('/:id', checkLogin, categoryPatch);
router.delete('/:id', checkLogin, categoryDelete);

module.exports = router;