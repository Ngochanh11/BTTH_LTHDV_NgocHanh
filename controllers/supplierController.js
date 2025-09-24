const Supplier = require('../models/Supplier');

exports.index = async (req, res) => {
  try {
    const products = await Product.find().populate('supplierId');
    res.json(products);   // Trả JSON để xem dữ liệu
  } catch (err) {
    console.error("❌ Lỗi lấy danh sách sản phẩm:", err.message);
    res.status(500).json({ error: "Lỗi lấy danh sách sản phẩm" });
  }
};

exports.newForm = (req, res) => {
  res.render('new', { type: 'supplier' });
};

exports.create = async (req, res) => {
  await Supplier.create(req.body);
  res.redirect('/suppliers');
};

exports.editForm = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  res.render('edit', { item: supplier, type: 'supplier' });
};

exports.update = async (req, res) => {
  await Supplier.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/suppliers');
};

exports.delete = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.redirect('/suppliers');
};
