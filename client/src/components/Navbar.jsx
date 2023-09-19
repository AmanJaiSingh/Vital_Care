import React from "react";
import Search from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/userRedux";

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const Logout = () => {
    dispatch(logout());
  };

  return (
    <div className="container absolute">
      <div className="Wrap flex justify-between items-center">
        <div className=" flex-1 flex items-center"></div>
        <Link to="/">
          <div className="flex-1 text-white underline-offset-2 underline cursor-pointer  font-bold text-center nav_logo">
            Vital Care
          </div>
        </Link>

        <div className="flex-1 text-[#FFA559]  nav_right flex items-center justify-end text-2xl font-medium">
          {!user ? (
            <>
              <Link to="/CRegister">
                <div className="MenuItems">REGISTER</div>
              </Link>
              <Link to="/Login">
                <div className="MenuItems">SIGN IN</div>
              </Link>
            </>
          ) : (
            <>
              {user.type === "customer" ? (
                <>
                  <Link to="/orders">
                    <div className="flex-1 nav_right flex items-center justify-end mr-20 font-medium ">
                      Cart
                    </div>
                  </Link>
                  <Link to="/orderdone">
                    <div className="flex-1 nav_right flex items-center justify-end mr-20 font-medium ">
                      Orders
                    </div>
                  </Link>
                </>
              ) : (
                <></>
              )}
              {user.type === "corporate" ? (
                <>
                  <Link to="/post">
                    <div className="flex-1 nav_right flex items-center justify-end mr-20">
                      Post Data
                    </div>
                  </Link>
                  <Link to="/Myposts">
                    <div className="flex-1 nav_right flex items-center justify-end mr-20">
                      My Posts
                    </div>
                  </Link>
                </>
              ) : (
                <></>
              )}
              <button onClick={Logout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
