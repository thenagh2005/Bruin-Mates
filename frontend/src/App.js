
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import About from './Pages/About';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import ProfileForm from './Pages/profileform'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/profile-form" element={<ProfileForm />}/>
      </Routes>
    </Router>
  );
}

export default App;
