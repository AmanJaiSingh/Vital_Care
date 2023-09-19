import React from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import { publicRequest } from "../requestMethods";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { useDispatch, useSelector } from "react-redux";
import Slider from "../components/Slider";

function Home() {
  const user = useSelector((state) => state.user.currentUser);

  const [product, setProduct] = useState([]);
  const [load, setload] = useState(false);

  useEffect(() => {
    setload(true);
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/product/");
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
    setload(false);
  }, []);

  // console.log(product);

  return (
    <div className="reg_con1">
      <Navbar />
      <Slider></Slider>
      <div className="w-full flex justify-center">
        {load || !user || !product.length ? (
          <>Hello</>
        ) : (
          <div className=" w-[800px] ">
            <div className="text-5xl hover:decoration-orange-300 hover:text-black duration-300 cursor-default font-medium text-orange-600 underline underline-offset-8 hover  h-24 flex  items-center justify-center w-[695px]">
              Affordable Packages
            </div>
            {product.map((item) => {
              return (
                <>
                  <Cards data={item} key={item._id} />;
                </>
              );
            })}
          </div>
        )}
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
