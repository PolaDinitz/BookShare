import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";

const Routing = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </>
    </Router>
  );
};

export default Routing;
