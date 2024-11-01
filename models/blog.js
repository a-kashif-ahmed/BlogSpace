const mongoose = require('mongoose');


const blogSc = new mongoose.Schema({
    blogtitle:{
        type:String,
        required:true
    },
    blogDes:{
        type:String,
        required:true
    },
    blogThumb:{
        type:String,
        required:true
    },
    theid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    }



},{timestamps:true})


const blog = mongoose.model("blog",blogSc);

module.exports=blog;