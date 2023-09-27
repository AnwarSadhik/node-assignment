
import express from "express";
import dotenv from "dotenv"
dotenv.config();

import { connectDB } from "./lib/db.js";
import * as router from "./routes/index.js"

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());

// routes
app.get("/",(req,res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is running"
    })
})
app.use("/api/user",router.userRoutes)
// 404 route
app.use((req, res) => {
    res.status(404).json({
        status: "Not Found",
        message: "check your HTTP method or endpoint"
    })
})

app.listen(PORT,async () => {
    console.log(`Listening on port ${PORT}`);
    await connectDB();
});