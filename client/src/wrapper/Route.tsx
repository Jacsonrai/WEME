import { Routes, Route } from "react-router-dom";
import Home from "@/pages/home/Home";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/Signup";

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const WEMERoute = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  useEffect(() => {
    const auth = false;
    if (!auth) {
      path === "/" && navigate("/login");
      path === "/sign-up" && navigate("/sign-up");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};

export default WEMERoute;
