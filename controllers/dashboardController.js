const Category = require("../models/Category");
const MenuItem = require("../models/MenuItem");

exports.getStats = async (req, res) => {
  try {
    const totalCategories = await Category.countDocuments();
    const totalMenuItems = await MenuItem.countDocuments();

    const availableItems = await MenuItem.countDocuments({
      isAvailable: true,
    });

    const unavailableItems = await MenuItem.countDocuments({
      isAvailable: false,
    });

    const priceStats = await MenuItem.aggregate([
      {
        $group: {
          _id: null,
          avgPrice: { $avg: "$price" },
          maxPrice: { $max: "$price" },
          minPrice: { $min: "$price" },
          totalMenuValue: { $sum: "$price" },
        },
      },
    ]);

    const financial = priceStats[0] || {
      avgPrice: 0,
      maxPrice: 0,
      minPrice: 0,
      totalMenuValue: 0,
    };

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalCategories,
          totalMenuItems,
          availableItems,
          unavailableItems,
        },

        financials: {
          avgPrice: financial.avgPrice,
          maxPrice: financial.maxPrice,
          minPrice: financial.minPrice,
          totalMenuValue: financial.totalMenuValue,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Xatolik yuz berdi: ${error.message}`,
    });
  }
};