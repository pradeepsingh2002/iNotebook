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
import Alert from './Component/Alert';
import Login from './Component/Login';
import Signup from './Component/Signup';
function App() {
  return (
 <>
 <NoteState>
 <Router>
  <Navbar/>
  <Alert message="Be! Happy"/>
  <div className="container">
  <Routes>
    <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>     
          <Route path="/login" element={<Login/>}/>     
          <Route path="/Signup" element={<Signup/>}/>     
        </Routes>
        </div>
 </Router>
 </NoteState>
 </>
  );
}

export default App;
