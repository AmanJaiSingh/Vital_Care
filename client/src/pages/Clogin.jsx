import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { Dlogin } from "../redux/apiCalls";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.5s ease;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
  border: 1px solid white;
`;

const CLogin = () => {
  const [username, setName] = useState("");
  const [password, setPass] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleClick = (e) => {
    // console.log("----here-----");
    e.preventDefault();
    Dlogin(dispatch, { username, password });
  };

  return (
    <div>
      <Navbar />
      <div className="reg_con_login">
        <div className="l_reg_wrap">
          <h1>SIGN IN AS CORPORATE</h1>
          <form>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <input
              type="password"
              placeholder="password"
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />

            <Button onClick={handleClick} disabled={isFetching}>
              LOGIN
            </Button>
            {error ? (
              <span className="text-red-500 underline">
                Something Went Wrong
              </span>
            ) : (
              <></>
            )}
            <a>DO NOT REMEMBER THE PASSWORD?</a>
            <div className="font-medium text-2xl text-green-500">
              <Link to="/Login">Login as Customer</Link>
            </div>
          </form>
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default CLogin;
