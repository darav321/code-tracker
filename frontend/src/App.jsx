import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import BuildProfile from "./components/BuildProfile";
import Dashboard from "./components/Dashboard";
import { useDispatch } from "react-redux";
import { setToken } from "./redux/Users/userSlice";
import axios from "axios";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      dispatch(setToken(token));
      axios.get()
    }
  }, [])
  return (
    <GoogleOAuthProvider clientId="688355425044-a9gc0r1k00o304kskr0guiblhhrtd1jn.apps.googleusercontent.com">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />}>
            <Route path="/home/profile" element={<BuildProfile />}></Route>
            <Route path='/home/dashboard/:id' element={<Dashboard />}></Route>
          </Route>
        </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;

