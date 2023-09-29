import express from "express";
import dotenv from "dotenv"
dotenv.config();

import { connectDB } from "./utils/db.js";
import * as router from "./routes/index.js"
import errorHandler from "./middleware/errHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/",(req,res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is running"
    })
})

app.use("/api/user",router.userRoutes)
app.use("/api/todos",router.todoRoutes)

app.use((req, res) => {
    res.status(404).json({
        status: "Not Found",
        message: "check your HTTP method or endpoint"
    })
})

app.use(errorHandler);

app.listen(PORT,async() => {
    console.log(`Listening on port ${PORT}`);
    await connectDB();
});