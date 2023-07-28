import './App.css';
import React, {useState} from 'react';
import About from './Components/About';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert=(type,message)=>{
    setAlert({
      type:type,
      msge:message
    });
    setTimeout(() => {
      setAlert(null)
     }, 3000);
    }

  return (
   <>
   <NoteState>
   <BrowserRouter>
   <Navbar/>
   <Alert resp={alert}/>
   <div className="container">
      <Routes>
     
          <Route exact path="/" element={<Home showAlert={showAlert}/>} />
          <Route exact path="/about" element={<About showAlert={showAlert}/>} />
          <Route exact path="/profile" element={<Profile showAlert={showAlert}/>} />
          <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
       
      </Routes>
      </div>
    </BrowserRouter>
   </NoteState>
   
   
   
   </>
  );
}

export default App;
