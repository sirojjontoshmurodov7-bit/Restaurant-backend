const MenuItem = require('../models/MenuItem')
const menuItemValidation = require('../validators/menuItemValidator')

exports.getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find().populate("category")
        res.status(200).json(menuItems)
    } catch (error) {
        res.status(500).json({
            message: `Xatolik yuz berdi: ${error.message}`
        })
    }
}
exports.getMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id).populate("category")
        if (!menuItem) {
            return res.status(404).json({
                message: `Mahsulot topilmadi!`
            })
        }
        res.status(200).json(menuItem)
    } catch (error) {
        res.status(500).json({
            message: `Xatolik yuz berdi: ${error.message}`
        })
    }
}
exports.createMenuItem = async (req, res) => {
    try {
        console.log("BODY IMAGE:", req.body.image);

        const validation = menuItemValidation.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues.map(
                    (issue) => issue.message
                ),
            });
        }

        console.log(
            "VALIDATED IMAGE:",
            validation.data.image
        );

        const menuItem = await MenuItem.create(
            validation.data
        );

        console.log(
            "SAVED IMAGE:",
            menuItem.image
        );

        res.status(201).json({
            message: "Mahsulot yaratildi!",
            data: menuItem,
        });
    } catch (error) {
        res.status(500).json({
            message: `Xatolik yuz berdi: ${error.message}`,
        });
    }
};
exports.editMenuItem = async (req, res) => {
    try {
        const validation = menuItemValidation.safeParse(req.body)
        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues.map(issue => issue.message)
            })
        }
        const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, validation.data, { new: true, runValidators: true })
        if (!menuItem) {
            return res.status(404).json({
                message: `Mahsulot topilmadi!`
            })
        }
        res.status(200).json({
            message: `Mahsulot yangilandi!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Xatolik yuz berdi: ${error.message}`
        })
    }
}
exports.deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndDelete(req.params.id)
        if (!menuItem) {
            return res.status(404).json({
                message: `Mahsulot topilmadi!`
            })
        }
        res.status(200).json({
            message: `Mahsulot o'chirildi!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Xatolik yuz berdi: ${error.message}`
        })
    }
}