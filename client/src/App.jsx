import SignUp from "./pages/SignUp";
import Nav from "./components/UI/Nav.jsx";
import {Route, Routes} from "react-router";
import Login from "./pages/Login.jsx";
import Panel from "./pages/Panel.jsx";
import Protect from "./components/utils/Protect.jsx";
import Catalog from "./pages/Catalog.jsx";
import {ToastContainer} from "react-toastify";

const App = () => {

  return (
      <>
          <Nav/>

          <Routes>
              <Route path="/" element={<p>Home</p>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/panel" element={<Protect><Panel/></Protect>}/>
              <Route path="/laptops" element={<Catalog/>}/>
          </Routes>

          <ToastContainer position="bottom-right" />
      </>
  )
};

export default App;