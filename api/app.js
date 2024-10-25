import express from "express";
import dotenv from "dotenv"; // Import dotenv
import cors from "cors";
import connectDB from "./config/mongoose.js";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
dotenv.config(); // Load environment variables from .env file

const app = express();

connectDB();
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(8800, () => {
  console.log("Server is running");
});
