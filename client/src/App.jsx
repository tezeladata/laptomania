import { Route, Routes, useLocation } from "react-router";
import { useEffect, useState } from "react";
import SignUp from "./pages/SignUp";
import Nav from "./components/UI/Nav.jsx";
import Login from "./pages/Login.jsx";
import Panel from "./pages/Panel.jsx";
import Protect from "./components/utils/Protect.jsx";
import Catalog from "./pages/Catalog.jsx";
import Home from "./pages/Home.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PageTransitionLoader = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timeout);
  }, [location]);

  if (!isLoading) return null;

  return (
    <div className="page-loader">
      <div className="page-loader__dot" />
      <div className="page-loader__dot" />
      <div className="page-loader__dot" />
    </div>
  );
};

const App = () => {
  return (
    <>
      <PageTransitionLoader />
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/panel"
          element={
            <Protect>
              <Panel />
            </Protect>
          }
        />
        <Route path="/laptops" element={<Catalog />} />
      </Routes>

      <ToastContainer position="bottom-right" />
    </>
  );
};

export default App;
