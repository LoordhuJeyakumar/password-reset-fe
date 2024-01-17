import React, { createContext, useEffect, useState } from "react";
import Signup from "./pages/Signup";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPasswordLink from "./pages/ResetPasswordLink";
import PasswordReset from "./pages/PasswordReset";
import axios from "axios";

const isLocalURL = false;

const API_URL = isLocalURL
  ? `http://localhost:3333`
  : `https://password-reset-api-2je2.onrender.com`;
const GlobelData = createContext(null);
function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allUsersDetails, setAllUsersDetails] = useState([]);
  const [getData, setGetData] = useState(false);
  async function getUsersDetails() {
    try {
      let allUsers = await axios.get(`${API_URL}/users`);

      setAllUsersDetails(allUsers.data.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    return () => {
      getUsersDetails();
      setGetData(true);
    };
  }, []);
  return (
    <>
      <ToastContainer theme="colored" position="top-left" />
      {
        <GlobelData.Provider
          value={{
            isUserLoggedIn,
            setIsUserLoggedIn,
            username,
            setUserName,
            email,
            setEmail,
            password,
            setPassword,
            allUsersDetails,
            setGetData,
            getData,
            API_URL,
          }}
        >
          <Router>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/password-reset/:id/verify/:token"
                element={<PasswordReset />}
              />
              <Route
                path="/reset-password-link"
                element={<ResetPasswordLink />}
              />
              {isUserLoggedIn ? (
                <Route path="/dashboard" element={<Dashboard />} />
              ) : (
                <Route path="/dashboard" element={<Login />} />
              )}
            </Routes>
          </Router>
        </GlobelData.Provider>
      }
    </>
  );
}

export { App as default, GlobelData, API_URL };
