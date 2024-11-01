const PORT =8000;
const mongoose = require('mongoose');
const express = require("express")
const app = express();
const path = require('path')
const rerouter = require('./routes/user')
const reblog = require('./routes/blogs')
const {authe}= require('./middlewares/auth')
// const blog = require("")
const cokpar =require('cookie-parser')
app.set('view engine','ejs')
app.set("views", path.resolve("./views"))
app.use(cokpar());
app.use(express.urlencoded({extended:false}))
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authe())

app.use("/blogs",reblog);
app.use(express.static(path.resolve('./public')));
app.use("/user",rerouter);

app.get("/",(req,res)=>{
    return res.render('home',{
     
    });
})






app.listen(PORT,(req,res)=>{
    console.log(`Server Started at ${PORT}`);
})