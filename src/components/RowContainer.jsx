import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import Notfound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/Reducer";
const RowContainer = ({ flag, data, scrollValue }) => {
  const RowContainer = useRef();
  const [{ cartItems }, dispatch] = useStateValue();
  const [items, setitems] = useState([]);
  useEffect(() => {
    RowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);
  const addToCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };
  useEffect(() => {
    addToCart();
  }, [items]);
  return (
    <div
      ref={RowContainer}
      className={`w-full my-12 flex drop-shadow-2xl gap-3  scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[225px] min-w-[275px] my-12  md:w-300 md:min-w-[300px]  backdrop-blur-lg
             bg-cardOverlay rounded-lg p-2  hover:drop-shadow-md flex flex-col items-center justify-between"
          >
            <div className=" w-full flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-40  h-40 drop-shadow-2xl -mt-8"
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className=" w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-lg"
                onClick={() => setitems([...cartItems, item])}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p className="text-textColor font-semibold md:text-lg text-base">
                {item?.title}
              </p>
              <p className="mt-1 text-gray-500 text-sm">
                calories : {item?.calories}
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500"> $ </span>
                  {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex items-center flex-col justify-center">
          <img src={Notfound} className="h-340" />
          <p className="text-xl mt-6 text-textColor font-semibold">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
