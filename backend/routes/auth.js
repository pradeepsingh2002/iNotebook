const express=require('express');
const User = require('../models/User');
const router= express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET='harry is a good boy'
//Create a user using :post "/api/auth/createuser": no login  required 
router.post('/createuser',[
    body('email','enter a valid email').isEmail(),
    body('password','Password must have atleast 5 character').isLength({min:5}),
    body('name','Enter a valid name').isLength({min:3})
],
async (req,res)=>{
    // If there are errors then return bad request and the errors
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    // check wheater the user with this email already exits
    try {
        
     
    let user=await User.findOne({email:req.body.email});
    if (user){
        return res.status(400).json('Sorry! user with is email already exist')
    }
    const salt=await bcrypt.genSalt(10);
    const secpass= await bcrypt.hash(req.body.password,salt); 
    user= await User.create({
    name:req.body.name,
    password:secpass,
    email:req.body.email
})// .then(user=>res.json(user)).catch(
//     err=>{console.log(err);
//     res.json({error:'please enter a unique email',message:err.message})}
// )
const data={
    user:{
        id:user.id
    }
}
const authtoken=jwt.sign(data,JWT_SECRET)

res.json(authtoken)

}catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured")    
    }


})
module.exports = router;
