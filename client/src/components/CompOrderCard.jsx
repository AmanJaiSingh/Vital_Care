import React from "react";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";

const OrderCard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const [product, setProduct] = useState([]);
  const [load, setload] = useState(false);
  useEffect(() => {
    setload(true);
    const getProduct = async () => {
      try {
        console.log("/product/find/" + data.OrderId);
        const res = await publicRequest.get("/product/find/" + data.OrderId);
        setProduct(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
    setload(false);
  }, []);

  const delete1 = (e) => {
    // e.preventDefault();

    const deleteProduct = async () => {
      try {
        console.log("/delete/" + data._id);
        const res = await publicRequest.delete("compOrder/delete/" + data._id);
      } catch (err) {
        console.log(err);
      }
    };

    deleteProduct();

    window.location.reload();
  };
  return (
    <>
      {load ? (
        <div className="h-[695px] w-screen flex justify-center items-center">
          <div className="bg-red-300 p-2 rounded-xl text-2xl shadow-2xl">
            No Data Available{"------"}
          </div>
        </div>
      ) : (
        <div className="flex bg-red-200 rounded-lg text-black  hover:border-[#10847e] border-gray-500 cursor-pointer border-1 shadow-sm duration-300 flex-row justify-between px-10 py-5  text-2xl  mx-20 my-4  h-auto">
          <div className="w-[360px]">
            {/* {console.log(product)} */}
            <div className="font-medium">
              <LocalHospitalIcon
                style={{ background: "lightpink", color: "red" }}
              />
              <span className="pl-3">{product.title}</span>
            </div>
            <div className="text-xl pl-10 text-[#10847e]">
              {product.address}
            </div>
            <div className="text-lg pl-10 pt-2">₹{product.price}</div>
          </div>
          <div className="h-auto flex w-[194px]  flex-col justify-between">
            {" "}
            <div>
              <button
                className="bg-blue-500 h-11  text-lg hover:bg-white duration-300 hover:text-blue-500 text-white font-bold py-2 px-4 rounded-md "
                onClick={handleOpenModal}
              >
                Check Order Status
              </button>

              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                  <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
                  <div className="bg-white p-8 rounded-lg shadow-lg z-20">
                    <h2 className="text-xl font-bold mb-4">Order Status</h2>
                    {/* Add your order status content here */}
                    <p>Your order is being processed.</p>
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
            <button
              onClick={delete1}
              className="border-2 h-10 w-auto border-[#10847e] text-white hover:text-[#10847e] cursor-pointer bg-[#10847e] hover:bg-slate-300 duration-300 rounded-md"
            >
              Cancel Order
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCard;
