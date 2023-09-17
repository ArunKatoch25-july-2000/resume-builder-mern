require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");
require("./connection/conn");

const app = express();
app.use(express.urlencoded({ extended: true }));
const userRouter = require("./routes/userRouter.js");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// Routes
app.use(userRouter);
const PORT = process.env.PORT || 8080;
app.get("/", userRouter);

app.listen(PORT, () => {
  console.log(`app connected successfully at port ${PORT}`);
});
