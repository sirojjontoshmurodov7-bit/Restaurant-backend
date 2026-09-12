const Category = require('../models/Category')
const categoryValidation = require('../validators/categoryValidator')

exports.getCategorys = async (req, res) => {
    try {
        const categorys = await Category.find()
        res.status(200).json(categorys)
    } catch (error) {
        res.status(500).json({
            message: `Xatolik yuz berdi: ${error.message}`
        })
    }
}
exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).json({
                message: `Kategoriya topilmadi!`
            })
        }
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({
            message: `Xatolik yuz berdi: ${error.message}`
        })
    }
}
exports.createCategory = async (req, res) => {
    try {
        const validation = categoryValidation.safeParse(req.body)
        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues.map(issue => issue.message)
            })
        }
        const category = await Category.create(validation.data)
        res.status(201).json({
            message: `Kategoriya yaratildi!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Xatolik yuz berdi: ${error.message}`
        })
    }
}
exports.editCategory = async (req, res) => {
    try {
        const validation = categoryValidation.safeParse(req.body)
        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues.map(issue => issue.message)
            })
        }
        const category = await Category.findByIdAndUpdate(req.params.id, validation.data, {new: true, runValidators: true})
        if (!category) {
            return res.status(404).json({
                message: `Kategoriya topilmadi!`
            })
        }
        res.status(200).json({
            message: `Kategoriya yangilandi!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Xatolik yuz berdi: ${error.message}`
        })
    }
}
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) {
            return res.status(404).json({
                message: `Kategoriya topilmadi!`
            })
        }
        res.status(200).json({
            message: `Kategoriya o'chirildi!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Xatolik yuz berdi: ${error.message}`
        })
    }
}