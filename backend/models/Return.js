const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema({
    author: {
        type: String,   
    },
    genre: {
        type: String,
    },
    department: {
        type: String,
    },
    userId:{
        type: String, 
    },
    bookId:{
        type: String, 
    }
}, { timestamps: true });

module.exports = mongoose.model("ReturnBook", returnSchema);