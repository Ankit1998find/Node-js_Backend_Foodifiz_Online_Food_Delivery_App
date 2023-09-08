const mongoose = require("mongoose");

const {Product}=require('../Model/ProductModel');


exports.createProduct = async (req, res) => {
  console.log(req.body);
  try {
    const price = parseFloat(req.body.price);

    const rating = parseFloat(req.body.rating);

    const product = new Product({
      ...req.body,
      price: price,
      rating:rating,
    });
  
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    let query = Product.find();

    if (req.query.sort) {
      // Sorting logic
      query = query.sort({ [req.query.sort]: req.query.order });
    }

    if (req.query.category) {
      // Category filtering logic
      query = query.where({ category: req.query.category });
    }

    if (req.query.limit) {
      // Limit logic
      query = query.limit(req.query.limit);
    }

    const products = await query.exec();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id); //mongoose.ObjectId(id)
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.replaceProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    }); //for latest changes doc in response {new:true}
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    

    const product = await Product.findOneAndDelete({ _id: id });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
