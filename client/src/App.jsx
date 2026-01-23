import { Route, Routes, useLocation } from "react-router";
import { useEffect, useState } from "react";
import SignUp from "./pages/SignUp";
import Nav from "./components/UI/Nav1.jsx";
import Login from "./pages/Login.jsx";
import Panel from "./pages/Panel.jsx";
import Protect from "./components/utils/Protect.jsx";
import Catalog from "./pages/Catalog.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/UI/Footer1.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PageTransitionLoader = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [location]);

  if (!isLoading) return null;

  const digits = ["0", "1", "0", "1", "1", "0", "1", "0"]; 

  return (
    <div className="page-loader">
      <div className="ai-matrix-loader">
        {digits.map((digit, index) => (
          <div key={index} className="digit">
            {digit}
          </div>
        ))}
        <div className="glow" />
      </div>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <>
      <PageTransitionLoader />
      <ScrollToTop />
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

      <Footer />

      <ToastContainer position="bottom-right" />
    </>
  );
};

export default App;
