const bookModel = require("../database/models/bookModel");
const { options } = require("../routes/bookRoute");

class Bookcontoller {
  async addBook(req, res, imagename) {
    try {
      const { name, author, genre } = req.body;
      if (!name || !author || !genre) {
        return res
          .status(400)
          .json({ success: false, msg: "input required field" });
      }
      const insertedData = await bookModel.create({
        ...req.body,
        image: imagename,
      });
      if (insertedData) {
        res.status(200).json({
          success: true,
          msg: "book has been added successfully",
          insertedData,
        });
      } else {
        return res
          .status(400)
          .json({ success: false, msg: "some problem occured" });
      }
    } catch (error) {
      console.log("some error occured", error);
    }
  }

  async getBookById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, msg: "id not found" });
    }

    const data = await bookModel.findById(id);
    if (data) {
      res.json({ success: true, msg: "data found", data });
    } else {
      res.status(400).json({ success: false, msg: "data not found" });
    }
  }

  async updateBook(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ success: false, msg: "id not found" });
      }
      const updateData = await bookModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      if (!updateData) {
        return res
          .status(400)
          .json({ success: false, msg: "update can not be done" });
      }

      return res.json({
        success: true,
        msg: "data has been updated successfully",
        updateData,
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async deleteBook(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ success: false, msg: "id not found" });
      }

      const deleteInfo = await bookModel.deleteOne({ _id: id });
      return res.status(200).json({
        success: true,
        msg: "book details has been deleted successfully!",
        deleteInfo,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async searchBook(req, res) {
    try {
      const { query } = req.query;
      console.log(req.url);
      console.log(query);
      if (!query) {
        return res.status(400).json({ success: false, msg: "query not found" });
      }

      const searchResult = await bookModel.find({$or:[{name:{$regex:".*"+query+".*"}}, {genre:{$regex:".*"+query+".*"}}]})
      if(searchResult.length == 0){
        return res.json({success:false, msg:"nothing found of that query"})
      }
      return res.status(200).json({success:true, msg:"search has been successful", searchResult})

    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = Bookcontoller;
