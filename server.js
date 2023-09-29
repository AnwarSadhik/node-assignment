import express from "express";
import dotenv from "dotenv";
dotenv.config();
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import { connectDB } from "./utils/db.js";
import * as router from "./routes/index.js";
import errorHandler from "./middleware/errHandler.js";
import { swaggerDocs } from "./helper/docs.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node js Todo Challenge",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000/"
      },
    ],
  },
  apis: ["./routes/*.js"],
  paths: {
    "/users": {
        get: {}
    }
  }
};

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
  });
});

app.use("/api/user", router.userRoutes);
app.use("/api/todos", router.todoRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use((req, res) => {
  res.status(404).json({
    status: "Not Found",
    message: "check your HTTP method or endpoint",
  });
});

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  await connectDB();
});
