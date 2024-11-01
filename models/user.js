const {createHmac, randomBytes} =require("crypto");
const mongoose = require('mongoose');


const Sc = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true
        },
        fullname:{
            type:String,
            required:true
        },
        salt:{
            type:String,
            // required:true
        },

        role:{
            type:String,
            enum:["admin","user"],
            default:"user"
        }
    },{ timestamps: true }
);
Sc.pre("save", async function assaulting(next){
    const user =this;
    if(!user.isModified("password")) return ;
    const salt= randomBytes(16).toString();
    const hashed =  createHmac("sha256",salt).update(user.password).digest("hex");
    this.salt=salt;
    this.password=hashed;
    // console.log(salt)
})


Sc.static("passwordCheck", async function (news,Password){
    // const {Email,Password} =req.body;
    //     const newuser = await User.findOne({email:Email});
        // console.log(news.password)
        const {password,salt  }= await news;
        // console.log(salt);
        // if (!news.salt) {
        //     console.error("Salt not found in the user object.");
        //     return; // Or handle the error as needed
        // }
                
        const newp = createHmac("sha256",salt).update(Password).digest("hex");
        // console.log(newp)
        if(newp===password){
            return news;
        }else{
            return null;
        }
    

})
const User = mongoose.model('user',Sc);


module.exports={
    User,
    
  
};
