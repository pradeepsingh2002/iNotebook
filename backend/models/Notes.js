const mongoose=require('mongoose')
const NotesSchema=new Schema({
title:{
    type:string,
    required:true
},
description:{
    type:string,
    required:true
},
tag:{
    type:string,
    default:"General"
},
date:{
    type:string,
    default:true
}
});
module.exports=mongoose.model('notes',NotesSchema)