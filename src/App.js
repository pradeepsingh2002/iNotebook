import './App.css';
import {
  BrowserRouter as Router,
 Routes,
  Route,       
} from "react-router-dom";
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import About from './Component/About';
import NoteState from './context/notes/NoteState';

function App() {
  return (
 <>
 <NoteState>
 <Router>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>     
        </Routes>
 </Router>
 </NoteState>
 </>
  );
}

export default App;
