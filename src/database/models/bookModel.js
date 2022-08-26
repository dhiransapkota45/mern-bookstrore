const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        type:String
    }
})

const bookModel = new mongoose.model("bookmodel", bookSchema)

module.exports = bookModel