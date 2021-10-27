import JWT from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    let token = req.headers.authorization.split(" ")[1];
    try {
      var decoded = JWT.verify(token, process.env.JWT_SECRET);
      const id = decoded.id;
      const user = await User.findById(id).select("-password");
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401);
        throw new Error("Not authorized to access this route");
      }
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error("Not authorized token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized to access this route");
  }
});
