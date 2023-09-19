import React, { useEffect, useState } from "react";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { publicRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";

const PostsCard = ({ data }) => {
  // console.log(data);
  //   const [d, setd] = useState({});
  const user = useSelector((state) => state.user.currentUser);

  const OrderProduct = (e) => {
    e.preventDefault();
    const ordered = (async) => {
      try {
        console.log("/product/delete/" + data._id);
        const res = publicRequest.delete("/product/delete/" + data._id);
      } catch (err) {
        console.log(err);
      }
    };
    ordered();
    window.location.reload();
  };

  return (
    <div className="flex bg-red-200  hover:border-[#10847e] border-gray-300 rounded-2xl cursor-pointer border-[3.5px] shadow-sm duration-300 flex-row justify-between px-10 py-5  text-2xl  mx-20 my-4  h-auto">
      <div>
        <div className="font-medium">
          <LocalHospitalIcon
            style={{ background: "lightpink", color: "red" }}
          />
          <span className="pl-3">{data.title}</span>
        </div>
        <div className="text-xl pl-10 text-[#10847e]">{data.address}</div>
        <div className="text-lg pl-10 pt-2">₹{data.price}</div>
      </div>
      <div>
        {" "}
        <button
          onClick={OrderProduct}
          className="border-2 text-white h-auto w-24 hover:text-[#10847e] border-[#10847e]  cursor-pointer bg-[#10847e] hover:bg-white duration-300 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostsCard;
