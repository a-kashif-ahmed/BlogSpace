const {Router} = require("express")
const router = Router();
const mongoose = require('mongoose');
if(mongoose.connect("mongodb://127.0.0.1:27017/space")) console.log("MangoDB Connected");
const {User} =require("../models/user");
const blog = require("../models/blog")
const { tokenizer } = require("../services/usage");




router.get("/login",(req,res)=>{
   return  res.render("signin");
})

router.post("/login",async (req,res)=>{
    const {Email, Password} =req.body
    const toke=req.cookies?.Token;
    if(toke) return res.redirect("/blogs/index");
    // console.log(Email);
    const news = User.findOne({email:Email}).exec();
    // console.log(news)
    
    const newuser = await User.passwordCheck(news,Password);
  if(newuser){
    const token = await tokenizer(newuser);
    res.cookie("Token",token).render("blogs",{
        user:{
            fullname:newuser.fullname
        },
        bloged: await blog.find({})
    });
    }else{
        res.redirect("/");
    }
})

router.get("/signup",(req,res)=>{
    return  res.render("signup");
 })
 
router.post("/signup",async (req,res)=>{
     const {Fullname, Email, Password} = req.body;
     console.log(req.body)
     const h = await User.create({
        email:Email,
        password:Password,
        fullname:Fullname
    })
     if(!h) return res.render("signup");
     const token= await tokenizer(h);
     return res.cookie("Token",token).redirect("/blogs/index");
 }
)


router.get('/logout',(req,res)=>{
    res.clearCookie('Token').render("home");
})


module.exports = router;