import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";
import CompOrderCard from "../components/CompOrderCard";
import { Link } from "react-router-dom";

const CompleteOrder = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [product, setProduct] = useState([]);
  const [load, setload] = useState(false);
  const [total, setTotal] = useState(0);
  //   console.log(user._id);

  useEffect(() => {
    setload(true);
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/compOrder/find/" + user._id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();

    // setTotal(data);
    setload(false);
  }, []);

  return (
    <>
      <Navbar />
      {load || !product.length || !user ? (
        <div className="h-[465px] bg3 w-screen flex justify-center items-center">
          <div className="bg-red-300 p-2 rounded-xl text-2xl shadow-2xl">
            No Data Available{"------"}
            <br></br>
            <div className="h-[30px]"></div>
            Go to{"   "}
            <Link className="text-blue-500" to={"/"}>
              Homepage
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full bg3 h-auto flex justify-evenly bg-gray-400 pt-16">
          <div className=" w-[800px] mt-10 h-auto ">
            <span className="font-medium text-white underline duration-300 cursor-default hover:decoration-green-500 text-3xl us">
              MY ORDERS
            </span>
            {product.map((item) => {
              return <CompOrderCard data={item} key={item._id} />;
            })}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CompleteOrder;
