
const { detokenize } = require("../services/usage");


function authe() {
    return async (req,res,next)=>{
        const token = req.cookies?.token;
        if(!token){
           return next();
        }
        try {
            const userpayload = await detokenize(token);
            req.user=userpayload;
        }catch(e){
            console.error(e);
        }
       next();
        
    }

}
 module.exports ={
    authe
 }