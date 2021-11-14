import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

//@desc     Get all products
//@route    GET /api/products/
//@access   public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

//@desc     Get a product
//@route    GET /api/products/:id
//@access   public
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

//@desc     Delete a product
//@route    DELETE /api/products/:id
//@access   private/Admin only
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

//@desc     Create a product
//@route    POST /api/products/
//@access   private/Admin only
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    numReviews: 0,
    countIntStock: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc     Update a product
//@route    PUT /api/products/:id
//@access   private/Admin only
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countIntStock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.brand = brand;
    product.image = image;
    product.category = category;
    product.countIntStock = countIntStock;
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});
