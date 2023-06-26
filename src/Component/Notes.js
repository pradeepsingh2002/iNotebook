import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate} from "react-router-dom";
const Notes = (props) => {
  let history=useNavigate()
    const context=useContext(noteContext);
  const {notes,getNotes,editNote}=context;
  useEffect(()=>{
    if(localStorage.getItem('token')){
    getNotes();
  }else{
    props.showAlert("Please Login",'warning')
    history("/login");
  }
     // eslint-disable-next-line
  },[])
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
  const ref=useRef(null)
  const refClose=useRef(null)
  const updateNote=(currentnote)=>{
ref.current.click();
setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})

  }
  const handleClick=(e)=>{
    
    console.log("updating the note..", note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    props.showAlert("Updated Successfully","success")
  refClose.current.click();
// addNote(note.title,note.description,note.tag);
}
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
  return (
    <>
    <Addnote showAlert={props.showAlert}/>
    
  
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header"> 
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">Descripton</label>
    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
  </div>
 
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
  </div>
 
 
</form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.etitle.length<3 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Upadte Note</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-3">
    <h2>Your Notes</h2>
    <div className="container">
      {notes.length===0 && "No Notes to display"}
    </div>
    {notes.map((note)=>{
      return <Noteitem  key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note}/>
    })}
  </div>
  </>
  )
}

export default Notes
