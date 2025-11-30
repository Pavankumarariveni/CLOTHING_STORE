const Product = require("../models/Product");

// @desc    Get all products with Filter, Search & Pagination
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const {
      keyword,
      category,
      size,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    let query = {};

    // 1. Search (Name OR Description)
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    // 2. Filters
    if (category) {
      query.category = category;
    }

    if (size) {
      query.sizes = { $in: [size] };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // 3. Pagination
    const skip = (page - 1) * limit;

    const products = await Product.find(query).skip(skip).limit(Number(limit));

    const count = await Product.countDocuments(query);

    res.json({
      products,
      page: Number(page),
      pages: Math.ceil(count / limit),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById };
