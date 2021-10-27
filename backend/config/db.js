import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
    });
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.blue.bold.underline
    );
  } catch (err) {
    console.error(`Error: ${err.message}`.red.bold.underline);
    process.exit(1);
  }
};

export default connectDB;
