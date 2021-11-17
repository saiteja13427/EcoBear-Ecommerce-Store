import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

//@desc     Auth the user and get a token
//@route    POST /api/users/login
//@access   public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.checkPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email/password");
  }
});

//@desc     Register a user
//@route    POST /api/users/
//@access   public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   private
export const getProfile = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id);
  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc     Update user profile
//@route    PUT /api/users/profile
//@access   private
export const updateProfile = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.currentPassword && req.body.newPassword) {
      if (await user.checkPassword(req.body.currentPassword)) {
        user.password = req.body.newPassword;
      } else {
        res.status(400);
        throw new Error("Password don't match");
      }
    }
    const updatedUser = await user.save();
    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc     Get all users
//@route    GET /api/users/
//@access   Private/ Admin only
export const getUsers = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const users = await User.find({});
  res.json(users);
});

//@desc     Delete a user with a particular id
//@route    DELETE /api/users/:id
//@access   Private/ Admin only
export const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  if (id === userId.toString()) {
    res.status(400);
    throw new Error("You can't delete yourself");
  } else {
    const user = await User.findById(id);
    if (user) {
      await user.remove();
      res.json({ message: "User Removed" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
});

//@desc     Get a user by ID
//@route    GET /api/users/:id
//@access   Private/ Admin only
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc     Update a user
//@route    PUT /api/users/:id
//@access   Private / Admin Only
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.isAdmin === true || req.body.isAdmin === false) {
      user.isAdmin = req.body.isAdmin;
    }
    const updatedUser = await user.save();
    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
