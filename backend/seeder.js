import mongoose from "mongoose";
import Product from "./models/Product.js";
import User from "./models/User.js";
import Order from "./models/Order.js";
import products from "./data/products.js";
import users from "./data/users.js";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create(users);
    const adminUser = createdUsers[0]._id;
    //Adding admin user to the user field of all products which tells that all the products are create by the admin
    products.map((product) => (product.user = adminUser));
    await Product.create(products);

    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (err) {
    console.error(`Error: ${err.message}`.red.bold);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (err) {
    console.error(`Error: ${err.message}`.red.bold);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  destroyData();
} else {
  console.log("Please give correct inputs -i/-d to import/destroy data");
}
