import React, { useEffect, useState } from "react";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { publicRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Cards = ({ data }) => {
  // console.log(data);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  let navigate = useNavigate();

  const [d, setd] = useState({});
  const [c, setc] = useState({});
  const user = useSelector((state) => state.user.currentUser);

  const OrderProduct = (e) => {
    e.preventDefault();
    setIsOpen(true);
    const ordered = (async) => {
      try {
        console.log(d);
        const res = publicRequest.post("/order/", d);
        const res2 = publicRequest.post("/compOrder/", c);
      } catch (err) {
        console.log(err);
      }
    };
    ordered();
    console.log(data);
    // navigate("/orders");
  };

  useEffect(() => {
    setd({ userId: user._id, productId: data._id, price: data.price });
    setc({ userId: user._id, OrderId: data._id, price: data.price });
  }, []);

  return (
    <div className="flex  bg-orange-300 opacity-95 rounded-md hover:border-[#10847e] border-gray-200 cursor-pointer border-2 shadow-sm duration-300 flex-row justify-between px-10 py-5  text-2xl  mx-20 my-4  h-auto">
      <div>
        <div className="font-medium">
          <LocalHospitalIcon
            style={{ background: "lightpink", color: "red" }}
          />
          <span className="pl-3">{data.title}</span>
        </div>
        <div className="text-xl pl-10 text-[#10847e]">{data.address}</div>
        <div className="text-xl pl-10">Total Tests: {data.tests.length}</div>
        <div className="text-lg pl-10 pt-2">₹{data.price}</div>
      </div>
      <div>
        {" "}
        <button
          onClick={OrderProduct}
          className="border-2 h-10 w-24 border-[#ffffff] text-black cursor-pointer bg-[#ffae82] hover:border-[#F97B22] hover:bg-red-500 duration-300 rounded-md"
        >
          Order
        </button>
        {isOpen && (
          <div className="fixed cursor-default inset-0 flex items-center justify-center z-10">
            <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
            <div className="bg-white p-8 rounded-lg shadow-lg z-20">
              <h2 className="text-xl font-bold mb-4">Order Status</h2>
              {/* Add your order status content here */}
              <p>
                Your Item is added to Cart... Check{" "}
                <Link className="text-blue-700 underline" to="/orders">
                  Cart{" "}
                </Link>
                page
              </p>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
