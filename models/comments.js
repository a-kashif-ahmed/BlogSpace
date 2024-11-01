const mongoose = require('mongoose');

const commentSc = mongoose.Schema({
    blogid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog",
        required:true,
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    txt:{
        type:String,
        required:true,
    }
},{timestamps:true})

const com = mongoose.model("comment",commentSc);

module.exports=com; 