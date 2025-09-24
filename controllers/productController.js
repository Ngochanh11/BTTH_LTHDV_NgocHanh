const Product = require('../models/Product');

// Danh sách sản phẩm
exports.index = async (req, res) => {
  try {
    const products = await Product.find(); // bỏ .populate('supplierId')
    res.json(products);
  } catch (err) {
    console.error("❌ Lỗi lấy danh sách sản phẩm:", err.message);
    res.status(500).json({ error: "Lỗi lấy danh sách sản phẩm" });
  }
};

// Form thêm mới
exports.newForm = (req, res) => {
  res.render('products/new');
};

// Tạo sản phẩm mới
exports.create = async (req, res) => {
  try {
    await Product.create(req.body);
    res.redirect('/products');
  } catch (err) {
    res.status(500).send("❌ Lỗi tạo sản phẩm");
  }
};

// Form sửa
exports.editForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('products/edit', { product });
  } catch (err) {
    res.status(404).send("❌ Không tìm thấy sản phẩm");
  }
};

// Cập nhật
exports.update = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/products');
  } catch (err) {
    res.status(500).send("❌ Lỗi cập nhật sản phẩm");
  }
};

// Xóa
exports.delete = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (err) {
    res.status(500).send("❌ Lỗi xóa sản phẩm");
  }
};
