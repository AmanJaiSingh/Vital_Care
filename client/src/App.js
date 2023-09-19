import React from "react";

import Home from "./pages/Home";
import Clogin from "./pages/Clogin";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Order from "./pages/Order";
import Create from "./pages/Create";
import Myposts from "./pages/Myposts";
import Dregister from "./pages/Dregister";
import CompOrder from "./pages/CompleteOrder";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  function AuthRoute({ children }) {
    if (user) {
      //Not signed in
      return <Navigate to="/" />;
    }
    //Signed in
    return children;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Orders" element={<Order />} />
        <Route path="/OrderDone" element={<CompOrder />} />
        {/* <Route path="/Cart" element={<Cart />} /> */}
        <Route
          path="/Login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/CLogin"
          element={
            <AuthRoute>
              <Clogin />
            </AuthRoute>
          }
        />
        <Route path="/Myposts" element={<Myposts />} />
        <Route path="/post" element={<Create />} />;
        <Route path="/CRegister" element={<Register />} />
        <Route path="/DRegister" element={<Dregister />} />
      </Routes>
    </Router>
  );
}

export default App;
