import express from "express";
import * as authCtrl from "../controllers/user.js";

const router = express.Router();

router.post("/register", authCtrl.registerUser);
router.post("/login", authCtrl.loginUser);
router.get("/", authCtrl.getUser);

export { router as userRoutes };
