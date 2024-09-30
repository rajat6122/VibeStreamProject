import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ContactForm from "./pages/ContactForm";
import MainApp from "./MainApp";

function LoginApp({ setIsLoggedIn }) {
  const handleLogin = (token) => {
    // Store the token in local storage
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <div className="max-w-[100%] md:max-w-[100%] mx-auto">
        <Routes>
          <Route element={<Login handleLogin={handleLogin}/>} path="/login"/>
          <Route element={<Register />} path="/register"/>
          <Route element={<HomePage />} path="/HomePage"/>
          <Route element={<Profile />} path="/profile" />
          <Route element={<MainApp />} path="/" />
          <Route element={<ContactForm /> }path="/contactform"/>
        </Routes>
      </div>
    </div>
  );
};

export default LoginApp;