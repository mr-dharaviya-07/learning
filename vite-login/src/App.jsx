
import './App.css'
import Login from './components/login.jsx'
import Profile from './components/profile.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from './components/register.jsx';
import { ShowProfile } from './components/showProfile.jsx';
function App() {


  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/showProfile" element={<ShowProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
