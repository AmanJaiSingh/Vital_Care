import React from "react";

const Slider = () => {
  return (
    <div className="h-[700px] bg  w-screen flex items-center ">
      <div className=" h-[500px] w-full p-10  flex justify-evenly text-gray-200 flex-col   text-4xl">
        <div className="text-xl text-yellow-400 font-extralight ">
          Why Vital-Care
        </div>
        <div className="text-5xl font-medium">
          Time and health are two precious assets that we don't recognize and
          appreciate until they have been depleted.
        </div>

        <div className="border-2 h-10 w-32  border-[#10847e] text-2xl pt-0.5 pl-3 cursor-pointer bg-[#10847e] hover:text-[#10847e] hover:bg-slate-300 duration-300 rounded-sm">
          Register
        </div>
      </div>
    </div>
  );
};

export default Slider;
