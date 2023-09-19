import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { publicRequest } from "../requestMethods";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [email, setEmail] = useState("");
  const [Data, setData] = useState(false);
  const [age, setage] = useState(0);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  const handleClick = (e) => {
    console.log(typeof age);
    e.preventDefault();
    console.log(username, password);
    if (password != cpassword) {
      console.log("password doesent match");
    } else {
      const createAcc = async () => {
        const res = await publicRequest.post("/auth/Cregister", {
          username,
          password,
          email,
          age,
          address,
          name,
        });
        console.log(res);
        setData(true);
      };
      createAcc();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="reg_con px-20">
        <div className="reg_wrap rounded-lg bg-orange-200 ">
          <h1>CREATE AN CUSTOMER ACCOUNT</h1>
          <form>
            <input
              type="text"
              placeholder="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="number"
              placeholder="age"
              value={age}
              onChange={(e) => {
                setage(parseInt(e.target.value));
              }}
            />

            <input
              type="text"
              placeholder="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="confirm password"
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="address"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            {password != cpassword && (
              <span className="text-red-300">Password does not Match</span>
            )}
            {Data && (
              <span className="text-green-600">
                Account Has been created redirect to{" "}
                <Link className="underline" to="/">
                  Login page
                </Link>{" "}
                to login{" "}
              </span>
            )}
            <span>
              By creating an account, I consent to the processing of my personal
              data on accordance with the <b>PRIVACY POLICY</b>
              <div className="pt-3 text-xl text-blue-500 underline cursor-pointer">
                <Link to="/DRegister">Create Account as Corporate</Link>
              </div>
            </span>

            <button onClick={handleClick}>Create</button>
          </form>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Register;
