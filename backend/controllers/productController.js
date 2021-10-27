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
