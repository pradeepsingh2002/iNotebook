import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";

function About() {
  const a = useContext(NoteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, []);
  return <div>this is about {a.state.name}</div>;
}

export default About;
