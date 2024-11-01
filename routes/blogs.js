const {Router} = require("express")
const router = Router();
const mongoose = require('mongoose');
const blog = require('../models/blog');
const comment = require("../models/comments")
const path= require('path')
const multer = require("multer");
const { detokenize } = require("../services/usage");
const { user } = require("../models/user");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
        const fileName = Date.now()+'-'+file.originalname
        cb(null, fileName )
    }
})
const upload = multer({storage:storage})

router.get('/index',async (req,res)=>{
    const token = req.cookies?.Token;
    if(!token) return res.redirect("/user/login");
    const newuser = await detokenize(token);
            return res.render("blogs",{
                user:{
                    fullname: newuser.fullname,
                },
                bloged: await blog.find({})
            });
})
router.get("/add",async (req,res)=>{
    const token = req.cookies?.Token;
    if(!token) return res.redirect("/user/login");
    const newuser = await detokenize(token);
    res.render("addblog",{
        user:{
            fullname:newuser.fullname
        }
    });
})
router.post("/add",upload.single("thumbnail"),async (req,res)=>{
    const token = req.cookies?.Token;
    const {title,des} = req.body;
    if(!token) return res.redirect('/user/login');
    const uss = await detokenize(token)
    const bg = await blog.create({
        blogtitle:title,
        blogDes:des,
        blogThumb:`/uploads/${req.file.filename}`,
        theid:uss._id
    });
    return res.redirect(`/blogs/${bg._id}`,
    //     {
    //     // user:{
    //     //     fullname:uss.fullname,
    //     // },
    // }
);

})

router.get('/myblog',async (req,res)=>{
    const token = req.cookies?.Token;
    if(!token) return res.redirect("/user/login");
    const newuser = await detokenize(token);
    const blogg = await blog.find({theid:newuser._id});
    return res.render('main',{
        user :{
            fullname:newuser.fullname,
        },
        bloged:blogg,
    });
})

router.get('/:id',async(req,res)=>{
    const id = req.params.id
    const blogg = await blog.findOne({_id:id})
    const token = req.cookies?.Token;
    if(!token) return res.redirect('/user/login');
    const uss = await detokenize(token);
    const coms = await comment.find({blogid:id}).populate(
        "userid"
      );
    
    if(!blogg) res.end("Not Found")
    
    // console.log(blogg)
    return res.render("bll",{
        blogg,
        user:{
            fullname:uss.fullname,
        },
        coms


    })
});
router.post('/comment/:blogid',async(req,res)=>{
    const id = req.params.blogid;
    const {txt} = req.body;
    const token = req.cookies?.Token;
    if(!token) return res.redirect("/user/login");
    const newuser = await detokenize(token);
    const qwt = comment.create({
        blogid:id,
        userid:newuser._id,
        txt:txt
    })
    res.redirect(`/blogs/${id}`)
})
module.exports= router;