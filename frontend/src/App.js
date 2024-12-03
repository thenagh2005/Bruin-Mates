
import './Styles/App.css';
import NavBar from './Components/NavBar';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import About from './Pages/About';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import ProfileForm from './Pages/ProfileForm'
import ViewProfile from './Pages/ViewProfile';
import FindPeople from './Pages/FindPeople';
import UserInfo from './Pages/UserInfo';

import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './Components/ThemeContext';

function App() {
  return (
    <>
      <Router>
      <AuthProvider>
        <ThemeProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile-form" element={<ProfileForm />} />
            <Route path="/view-profile" element={<ViewProfile />} />
            <Route path="/find" element={<FindPeople />} />
            <Route path="/users/:id" element={<UserInfo />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
      </Router>
    </>
  );
}

export default App;
