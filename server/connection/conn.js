const mongoose = require("mongoose");
const conn = process.env.CONN;
mongoose
  .connect(conn)
  .then(() => {
    console.log(`database connected successfully...`);
  })
  .catch((err) => {
    console.log(err);
  });
