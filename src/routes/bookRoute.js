const express = require("express");
const router = express.Router();
const bookModel = require("../database/models/bookModel");
const multer = require("multer");
const Bookcontoller = require("../controller/bookController");
const addFileValidate = require("../middlewares/addFileValidate")

let imagename;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    imagename =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname.trim();
    cb(null, imagename);
  },
});

const upload = multer({ storage });

const bookcontoller = new Bookcontoller();

//add a new book to the db
router.post("/add", upload.single("image"), (req, res) => {
  console.log(req.body);
  bookcontoller.addBook(req, res, imagename);
});

//search the required book
router.get("/search", bookcontoller.searchBook)

//get book from db
router.get("/:id", bookcontoller.getBookById);

//update details of book
router.put("/update/:id", bookcontoller.updateBook);

//delte book details
router.delete("/delete/:id", bookcontoller.deleteBook)

//find book as given limit
router.get("/", bookcontoller.findLimitBooks)

module.exports = router;
