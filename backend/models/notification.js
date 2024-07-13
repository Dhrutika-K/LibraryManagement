const mongoose=require("mongoose")

const NotificationSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    message:{
        type:String
    },
    type:{
        type:String
    },
    read:{
        type:Boolean,
        default:false
    },
}, { timestamps: true })

module.exports=mongoose.model("Notification", NotificationSchema);