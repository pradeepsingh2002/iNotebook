const express=require('express');
const User = require('../models/User');
const router= express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
let fetchuser=require('../middleware/fetchuser');

const JWT_SECRET='harryisagoodboy'
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

res.json({authtoken})

}catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured")    
    }


})
//Authentication a user using :post "/api/auth/loginuser": no login  required 
router.post('/loginuser',[
    body('email','enter a valid email').isEmail(),
    body('password','Password can not be blank').exists(),
 
],
async (req,res)=>{
    let success=false;
    // If there are errors then return bad request and the errors
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    // check wheater the user with this email already exits
    const {email,password}=req.body;
    try {
        
     
    let user=await User.findOne({email});
    if (!user){
        return res.status(400).json('please try to login with correct credential')
    }
    const passwordCompare=await bcrypt.compare(password ,user.password)
    if (!passwordCompare){
        return res.status(400).json('please try to login with correct credential')
    }
   
const data={
    user:{
        id:user.id
    }
}
const authtoken=jwt.sign(data,JWT_SECRET)
success=true;
res.json({success,authtoken})

}catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")    
    }
})


//Get loggedin user detail :post "/api/auth/getuser":  login  required 
router.post('/getuser',fetchuser,
async (req,res)=>{
    // If there are errors then return bad request and the errors
   try {
  userId=req.user.id;
    const user=await User.findById(userId).select('-password');
    res.send(user);

   } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error")
   }
})
module.exports = router;
