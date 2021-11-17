import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

//@desc     Get all products
//@route    GET /api/products/
//@access   public
export const getProducts = asyncHandler(async (req, res) => {
  //Pagnination
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  //If keyword exists then we pass regex to the find function
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.count({ ...keyword });
  //.limit to get onlt the pagesize number of products
  //.skip to get the required pageSize products
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

//@desc     Create a new review
//@route    POST /api/products/:id/reviews
//@access   private
export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewd = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewd) {
      res.status(400);
      throw new Error("Product Already Reviewed");
    } else {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => acc + item.rating, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).json({ message: "Review Added" });
    }
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

//@desc     Get top rated products
//@route    GET /api/products/top
//@access   public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});
