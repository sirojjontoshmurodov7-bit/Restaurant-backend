const express = require('express')
const router = express.Router()
const { getCategorys, getCategory, createCategory, editCategory, deleteCategory } = require('../controllers/categoryController')

router.get('/', getCategorys)
router.get('/:id', getCategory)

router.post('/', createCategory)

router.put('/:id', editCategory)

router.delete('/:id', deleteCategory)

module.exports = router