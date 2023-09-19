import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";
import OrderCard from "../components/OrderCard";
import { Link } from "react-router-dom";

const Order = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [product, setProduct] = useState([]);
  const [load, setload] = useState(false);
  const [total, setTotal] = useState(0);
  //   console.log(user._id);

  useEffect(() => {
    setload(true);
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/order/find/" + user._id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();

    // setTotal(data);
    setload(false);
  }, []);

  useEffect(() => {
    var data = 0;
    for (let i = 0; i < product.length; i++) {
      console.log(product[i].price);
      data += product[i].price;
    }
    setTotal(data);
  }, [product]);

  const deleteall = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.delete("/order");
      window.location.reload();
    } catch (err) {}
  };

  return (
    <>
      <Navbar />
      {load || !product.length || !user ? (
        <div className="h-[465px] bg2 w-screen flex justify-center items-center">
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
        <div className="w-full bg2 h-auto flex justify-evenly bg-gray-400 pt-16">
          <span className="font-medium text-white underline duration-300 cursor-default hover:decoration-green-500 text-3xl us">
            Cart
          </span>
          <div className=" w-[800px] mt-10 h-auto ">
            {product.map((item) => {
              return <OrderCard data={item} key={item._id} />;
            })}
          </div>
          <div>
            <div className=" w-[400px] mb-10 bg-red-200 mt-10 h-auto ">
              <div className="b_sum">
                <h1 className="font-extralight m-0">ORDER SUMMARY</h1>
                <div>
                  <span>Subtotal</span>
                  <span>Rs{total}</span>
                </div>
                <div>
                  <span>Estimated Shipping</span>
                  <span>Rs{total / 10}</span>
                </div>
                <div>
                  <span>Shipping Discount</span>
                  <span>-Rs{total / 10}</span>
                </div>
                <div className="font-medium" style={{ fontSize: "24px" }}>
                  <span>Total</span>
                  <span>Rs {total}</span>
                </div>
                <button onClick={deleteall}>Check Out</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Order;
