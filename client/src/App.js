import React from "react";
// import logo from './logo.svg';
// import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth'

function App() {
  const AuthLandingPage = Auth(LandingPage, null)
  const AuthLoginPage = Auth(LoginPage, false)
  const AuthRegisterPage = Auth(RegisterPage, false)
  //Auth(SpecificComponent, option, adminRoute)

  return (
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<AuthLandingPage />} />
            <Route path="/Login" element={<AuthLoginPage />} />
            <Route path="/Register" element={<AuthRegisterPage />} /> 
          </Routes>
        </div>
      </Router>
  );
}

export default App;
