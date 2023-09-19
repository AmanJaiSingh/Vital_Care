import React from "react";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";

const OrderCard = ({ data }) => {
  const [product, setProduct] = useState([]);
  const [load, setload] = useState(false);
  useEffect(() => {
    setload(true);
    const getProduct = async () => {
      try {
        console.log("/product/find/" + data.productId);
        const res = await publicRequest.get("/product/find/" + data.productId);
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
        const res = await publicRequest.delete("order/delete/" + data._id);
        const res2 = await publicRequest.delete("compOrder/delete/" + data._id);
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
        <div className="flex text-black bg-red-200 rounded-md  hover:border-[#10847e] border-gray-500 cursor-pointer border-3 shadow-sm duration-300 flex-row justify-between px-10 py-5  text-2xl  mx-20 my-4  h-auto">
          <div>
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
          <div>
            {" "}
            <button
              onClick={delete1}
              className="border-2 h-10 w-24 border-[#10847e] text-black cursor-pointer bg-[#10847e] hover:bg-slate-300 duration-300 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCard;
