import express from "express";

import { requireSignIn } from "../middleware/authWall.js"
import * as authCtrl from "../controllers/user.js";

const router = express.Router();

router.get("/",requireSignIn, authCtrl.getUser);
router.post("/register", authCtrl.registerUser);
router.post("/login", authCtrl.loginUser);
router.put("/:userId/updateProfile",requireSignIn, authCtrl.updateUser);
router.patch("/:userId/changePassword",requireSignIn, authCtrl.changePassword)

export { router as userRoutes };
