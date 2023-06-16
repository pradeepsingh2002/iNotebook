const express=require('express');
const router= express.Router();

router.post('/',(req,res)=>{
    obj={
        a:"pradeep singh hada",
        number:34
    }
    res.json(obj);
})
module.exports = router;