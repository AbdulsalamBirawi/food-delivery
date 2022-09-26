import React, { useState } from "react";
import Logo from "../img/logo.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import Avatar from "../img/avatar.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { actionType } from "../context/Reducer";
import { useStateValue } from "../context/StateProvider";

const Header = () => {
  const fireBaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(fireBaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };
  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  return (
    // desktop
    <header className="w-screen fixed z-50 p-3 px-4 md:p-6 md:px-16 bg-primary">
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className=" flex items-center gap-2">
          <img className="w-8 object-cover" src={Logo} />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 "
          >
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <Link to={"/menu"}>
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                Menu
              </li>
            </Link>

            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Service
            </li>
          </motion.ul>
          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="  text-white text-xs font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            {/* <div>{JSON.stringify(user)}</div> */}
            {/* <div>{user.photoURL}</div> */}
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />
          </div>
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-20 "
            >
              <Link to={"/createItem"} onClick={() => setIsMenu(false)}>
                <p className="px-4 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer ">
                  New Item <MdAdd />
                </p>
              </Link>

              <p
                onClick={logout}
                className="px-4 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer "
              >
                Logout <MdLogout />{" "}
              </p>
            </motion.div>
          )}
        </div>
      </div>
      {/* {mobile} */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="  text-white text-xs font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>
        <Link to={"/"} className=" flex items-center gap-2">
          <img className="w-8 object-cover" src={Logo} />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="relative">
          {/* <div>{JSON.stringify(user)}</div> */}

          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userprofile"
            onClick={login}
          />
        </div>
        {isMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-10 right-10 "
          >
            <Link to={"/createItem"}>
              <p className="px-4 py-4 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer ">
                New Item <MdAdd />
              </p>
            </Link>
            <ul className="   flex flex-col ">
              <li
                onClick={() => setIsMenu(false)}
                className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2 "
              >
                Home
              </li>
              <Link to={"/menu"}>
                <li
                  onClick={() => setIsMenu(false)}
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer  hover:bg-slate-100 px-4 py-2 "
                >
                  Menu
                </li>
              </Link>

              <li
                onClick={() => setIsMenu(false)}
                className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer  hover:bg-slate-100 px-4 py-2 "
              >
                About Us
              </li>
              <li
                onClick={() => setIsMenu(false)}
                className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer  hover:bg-slate-100 px-4 py-2 "
              >
                Service
              </li>
            </ul>

            <p
              onClick={logout}
              className=" m-2 p-2 rounded-md shadow-lg flex items-center justify-center bg-gray-200 gap-3 hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer "
            >
              Logout <MdLogout />{" "}
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
