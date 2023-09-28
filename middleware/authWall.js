
import User from "../models/user.js";
import { verifyJwtToken } from "../utils/token.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "header not present" });
    }
    const token = header.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({ message: "token not found, include a token" });
    }
    const userId = verifyJwtToken(token);
    // console.log(userId)

    if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found, check your token or login again" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
