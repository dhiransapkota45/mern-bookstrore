const mongoose = require("mongoose");
const connection =  () => {
   mongoose.connect("mongodb://localhost:27017/Bookstore", () =>
    console.log("connected to the database")
  );
};

connection()
