const jwt = require('jsonwebtoken');
const secretkey = "SpaceIsVar@1207"
// const { User } = require("../models/user")


async function tokenizer(newuser) {
    const { email ,roles,_id,fullname} = newuser;
    console.log(fullname);

    return token = jwt.sign({
        email,
        roles,
        _id,
        fullname

    }, secretkey);

}
async function detokenize(token) {
   
    try {
        const userr =  jwt.verify(token,secretkey);
        return userr;
        
    }catch(e){
        throw e;

    }
    
}
module.exports = {
    tokenizer,
    detokenize
}