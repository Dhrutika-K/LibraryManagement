const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    title: {
        type: String,

    },

    description: {
        type: String,

    },

    author: {
        type: String,
      
    },

    genre: {
        type: String,

    },

    department: {
        type: String,

    },

    copies: {
        type: Number,
        // default:15 
    },

    vendor:{
        type:String,
    },

    vendor_id:{
        type:Number,
    },
    
    publisher: {
        type: String,
       
    },

    publisher_id: {
        type: Number,
       
    },
  
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);