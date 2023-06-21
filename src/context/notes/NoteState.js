import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
    const s1={
        "name": "Pradeep",
"class":"sb"
    }
   const [state,setState]=useState(s1);
  const update=()=>{
        setTimeout(()=>{
            setState({
                "name":"Rohit",
                "class":"satte"
            })
        },1000)
    }
return(
    <NoteContext.Provider value={{state,update}}>
          {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;