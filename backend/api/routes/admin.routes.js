const express = require('express');

const {
    adminList,
    adminById,
    adminAdd,
    adminPatch,
    adminDelete,
    adminLogin
} = require('../controllers/admin.controllers');

const {
    checkLogin
} = require('./../midlleware/checkAdminLogin')

const router = express.Router();

router.get('/', checkLogin, adminList);
router.get('/:id', checkLogin, adminById);
router.post('/', checkLogin, adminAdd);
router.patch('/:id', checkLogin, adminPatch);
router.delete('/:id', checkLogin, adminDelete);

router.post('/login', adminLogin);
router.post('/signup', adminAdd);
    


module.exports = router;