const express=require('express');
const { body, validationResult } = require('express-validator');
const router= express.Router();
const Note = require('../models/Notes');
const fetchuser=require("../middleware/fetchuser");

//Router 1: Get all notes using: GET "/api/notes/fetchallnotes", Login Required
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try {
       const notes=await Notes.find({user:req.user.id});
res.json(notes); 
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured") 
    }

})
//Router 2:  Add new notes using: GET "/api/notes/addnotes", Login Required
router.get('/addnote',fetchuser,[
    body('title','enter a valid title').isLength({min:3}),
    body('description','Description must have alleast 5 characters').isLength({min:5}),
],async (req,res)=>{
    try {
        
   
    const {title,description,tag}=req.body;
     // If there are errors then return bad request and the errors
     const errors=validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({errors:errors.array()})
     }
   const note=new Note({
title,description,tag,user:req.user.id
   })
   const  saveNote=await note.save();
   res.json(saveNote); }
   catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured")    
    }
    })
//Router 3: Update the existing Note using: PUT "/api/notes/updatenote", Login Required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const{title,description,tag}=req.body;
    const newNote={};
    if(title){
        newNote.title=title;
    }
    if(description){
        newNote.description=description;
    }
    if(tag){
        newNote.tag=tag;
    }
    //find the note to be updated
    let note= await Note.findById(req.params.id);
    if(!note){
     return   res.status(404).send("not Found")
    }
    if(note.user.toString()!==req.user.id){
return res.status(401).send("not Allowed");
    }
    note=await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
    res.json({note});
})
//Router 4: delete the existing Note using: DELETe "/api/notes/updatenote", Login Required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    
    //find the note to be deleted and delete it
    let note= await Note.findById(req.params.id);
    if(!note){
     return   res.status(404).send("not Found")
    }
    if(note.user.toString()!==req.user.id){
return res.status(401).send("not Allowed");
    }
    note=await Note.findByIdAndDelete(req.params.id)
    res.json({"success":"Note have been deleted"});
})
module.exports = router;