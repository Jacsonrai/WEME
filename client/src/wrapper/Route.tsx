/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/home/Home";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/Signup";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
const WEMERoute = () => {
  const authSelector = useSelector((state: any) => state.authReducer);
  const token = localStorage.getItem("_weme_token") || null;
  const navigate = useNavigate();
  const path = useLocation().pathname;

  useEffect(() => {
    const { isLoggedIn } = authSelector;
    if (!isLoggedIn || !token) {
      path === "/" && navigate("/login");
      path === "/sign-up" && navigate("/sign-up");
    } else {
      navigate("/");
    }
  }, [authSelector, token]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};

export default WEMERoute;
