import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { publicRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";

const Create = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [de, setDe] = useState("");
  const [Data, setData] = useState({
    title: "",
    desc: "",
    price: 0,
    tests: [],
    address: "",
    createdBy: user._id,
  });
  const [Respose, setRespose] = useState(0);
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    const sendData = async () => {
      try {
        const res = await publicRequest.post("/product", Data);
        setRespose(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    sendData();
    navigate("/");
  };
  return (
    <div className="h-screen bg-no-repeat bg-cover bg-[url('https://images.pexels.com/photos/1739842/pexels-photo-1739842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
      <Navbar />
      {!Respose ? (
        <div className="h-[695px] w-full pt-12 flex items-center justify-around ">
          <div className=" text-xl h-[600px] p-3 font-mono w-[600px] flex flex-col rounded-2xl  justify-between bg-red-200 shadow-lg">
            <div className="">
              <span>Title :</span>
              <input
                type="text"
                placeholder="Title"
                required
                name=""
                value={Data.title}
                id="Clg_name"
                onChange={(e) => {
                  setData({ ...Data, title: e.target.value });
                }}
              />
            </div>
            <div>
              Discription :
              <input
                type="text"
                placeholder="Description"
                name="totalstudents"
                id=""
                value={Data.desc}
                onChange={(e) => {
                  setData({ ...Data, desc: e.target.value });
                }}
              />
            </div>

            <div className="flex flex-col w-full ">
              <div className=" flex justify-between">
                Tests:
                <input
                  type="departments"
                  placeholder="Add Tests"
                  name="add departments"
                  className="h-[30px] mt-1 w-[300px]"
                  id=""
                  value={de}
                  onChange={(e) => {
                    setDe(e.target.value);
                  }}
                />
                <button
                  className="bg-orange-300 h-[40px] rounded-lg w-[100px] text-white hover:border-2 hover:border-orange-500 hover:bg-white hover:text-orange-400 duration-300 border-2 border-orange-300 "
                  onClick={() => {
                    let newDep = Data.tests;
                    newDep.push(de);
                    setData({ ...Data, tests: newDep });
                    setDe("");
                  }}
                >
                  Add
                </button>
              </div>

              <div className="items-center flex flex-wrap ">
                {Data.tests.map((item, i) => {
                  return (
                    <div
                      className="bg-slate-500 m-2 rounded-xl text-sm  text-gray-300 mb-2 p-3 flex justify-between"
                      key={i}
                    >
                      <span>{item}</span>
                      <button
                        className="pl-2 text-black"
                        onClick={() => {
                          const newval = Data.tests.filter((it) => it != item);
                          setData({ ...Data, tests: newval });
                        }}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              Address:
              <div className="flex justify-evenly">
                <span className="w-20">Street:</span>
                <input
                  type="text"
                  className="m-1"
                  value={Data.address}
                  placeholder="Address"
                  onChange={(e) => {
                    setData({
                      ...Data,
                      address: e.target.value,
                    });
                    // console.log(Data.address.street);
                  }}
                />
              </div>
            </div>
            <div>
              Your Id
              <input
                type="text"
                className="p-1 w-full"
                placeholder="Image Online Address"
                disabled
                value={user._id}
              />
            </div>
            <div>
              Price :
              <input
                type="number"
                placeholder="Price"
                name="totalstudents"
                id=""
                value={Data.price}
                onChange={(e) => {
                  setData({ ...Data, price: e.target.value });
                }}
              />
            </div>
            <div className="flex justify-center">
              <Link to="/">
                <button
                  className="bg-green-400 w-[120px] py-2 rounded-2xl border-2 border-green-400 hover:bg-white text-white hover:text-green-400 duration-300 "
                  onClick={handleClick}
                >
                  Create
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="text-4xl  flex h-screen justify-center items-center flex-col
        "
        >
          <div className="bg-red-200 p-5 font-serif rounded-xl shadow-xl my-2 text-gray-500">
            Data Created With ID {Respose}
          </div>
          <div className="bg-red-200 p-5 font-serif rounded-xl shadow-xl text-blue-500">
            Redirect to
            <Link className="underline" to="/">
              Home Page
            </Link>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
