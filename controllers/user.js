import User from "../models/user.js";
import { createJwtToken } from "../utils/token.js";

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      const err = new Error(`Please require all fields`);
      err.statusCode = 400;
      throw err;
    }

    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      const err = new Error(`Email already exists`);
      err.statusCode = 400;
      throw err;
    }

    const user = await User.create({
      name,
      email,
      password,
      createdAt: Date.now(),
    });

    res.status(201).json({ status: "success", id: user._id });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const err = new Error(`User not found`);
      err.statusCode = 404;
      throw err;
    }

    const authenticated = await user.comparePassword(password);
    if (!authenticated) {
      const err = new Error(`Invalid Credentials`);
      err.statusCode = 401;
      throw err;
    }
    const token = createJwtToken({ userId: user._id });
    res.status(200).json({ message: "Succesfull Login", token: token, userId: user._id });
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).select("-password");

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// update user's name or email
export const updateUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const updatedUserData = req.body;
    const user = await User.findById(userId);

    if (!user) {
      const err = new Error(`User not found`);
      err.statusCode = 404;
      throw err;
    }

    if (updatedUserData.name) {
      user.name = updatedUserData.name;
    }

    if (updatedUserData.email) {
      user.email = updatedUserData.email;
    }
    
    user.updatedAt = new Date();

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      const err = new Error(`User not found`);
      err.statusCode = 404;
      throw err;
    }
    
    const correctPassword = await user.comparePassword(currentPassword);
    if (!correctPassword) {
      const err = new Error(`Current password is incorrect`);
      err.statusCode = 401;
      throw err;
    }

    if (newPassword !== confirmNewPassword) {
      const err = new Error(`Passwords do not match`);
      err.statusCode = 400;
      throw err;
    }

    user.password = newPassword;

    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};
