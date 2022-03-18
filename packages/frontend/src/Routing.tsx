import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Register from "./components/register/Register";

const Routing = () => {
  return (
    <Router>
      <>
        <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </>
    </Router>
  );
};

export default Routing;
