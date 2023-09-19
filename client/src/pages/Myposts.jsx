import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";

import PostsCard from "../components/PostsCard";

const Myposts = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [product, setProduct] = useState([]);
  const [load, setload] = useState(false);
  //   console.log(user._id);

  useEffect(() => {
    setload(true);
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/product/finds/" + user._id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
    setload(false);
  }, []);

  return (
    <>
      <Navbar />
      {load || !product.length || !user ? (
        <div className="h-[495px] bg2 w-screen flex justify-center items-center">
          <div className="bg-red-300 p-2 rounded-xl text-2xl shadow-2xl">
            No Data Available{"------"}
          </div>
        </div>
      ) : (
        <div className="w-full bg2 h-auto flex justify-center bg-green-100">
          <div className=" w-[800px] mt-10 h-auto ">
            <span className="font-medium underline text-white duration-300 cursor-default hover:decoration-green-500 text-3xl us">
              MY POSTS
            </span>
            {product.map((item) => {
              return <PostsCard data={item} key={item._id} />;
            })}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Myposts;
