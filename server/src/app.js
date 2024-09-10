const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const blogRouter = require("./routes/blogRoutes");
const app = express();

//global middleware configuration to receive JSON data from client
app.use(express.json());

//global middleware configuration for cross origin resource sharing
app.use(
  cors({ origin: ["https://gomycode-blog.vercel.app"], credentials: true })
);

//global middleware configuration for cookie parser
app.use(cookieParser());

//base route
app.get("/", (req, res) => {
  res.send("Server is Live");
});

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/blogs", blogRouter);

module.exports = app;
