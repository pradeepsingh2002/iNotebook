var jwt=require("jsonwebtoken");
const JWT_SECRET='harryisagoodboy'

const fetchuser=(req,res,next)=>{
    //get the user from the jwt token and add to req object
   
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using valid token"})
        
    }
   
    try{
       
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
        }
        catch(error){
            res.status(499).send({error:"please authenticate using valid token"})
        }
}
module.exports=fetchuser;