const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Mustadonte:aqWzTcWQmiqHUFdX@cluster0.uptsfxc.mongodb.net/db_contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => console.log(error.message));

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
