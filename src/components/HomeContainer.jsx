import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/Data";

const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2   w-full  ">
      <div className="py-2 flex-1 flex flex-col items-start  justify-center gap-6 ">
        <div className="flex justify-center items-center gap-2 bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Pike Delivery
          </p>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl">
            <img
              src={Delivery}
              alt="delivery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in{" "}
          <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
            {" "}
            your City
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ab
          veniam non officiis, ea soluta id similique a at libero facere neque,
          natus ipsam autem consequatur. Fugiat ab incidunt vel!
        </p>
        <button
          type="button"
          className=" md:w-auto bg-gradient-to-br from-orange-400 to-orange-500 w-full py-2 px-4 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-white"
          id="home"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img
          src={HeroBg}
          className="ml-auto h-full lg:w-auto lg:h-650"
          alt="HeroBg"
        />
        <div className="w-full h-full gap-4 flex-wrap absolute flex items-center justify-center lg:px-32 py-4">
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className="lg:w-190 p-4  drop-shadow-lg bg-cardOverlay backdrop-blur-md rounded-xl flex justify-center flex-col items-center "
              >
                <img
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20"
                  src={n.imageSrc}
                  alt="i1"
                />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {n.name}
                </p>
                <p className="lg:text-sm text-[12px] text-lighttextGray font-semibold my-1">
                  {" "}
                  {n.decp}
                </p>
                <p className="text-sm font-semibold text-lighttextGray">
                  <span className="text-xs text-red-600">$</span> {n.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
