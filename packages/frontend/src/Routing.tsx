import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Header from "./components/header/Header";

const Routing = () => {
  return (
    <Router>
      <>
        <Header/>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </>
    </Router>
  );
};

export default Routing;
