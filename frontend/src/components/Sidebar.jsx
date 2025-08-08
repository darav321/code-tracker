import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { AiOutlineMenu } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import titleImg from "../assets/evolution.png"; // Replace with your image path
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const user = useSelector((state) => state.user); 
  console.log(user._id);
  console.log("varad")

  return (
    <>
      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(true)} className="md:hidden p-3 fixed top-2 left-2 bg-gray-200 rounded-full shadow-lg z-50">
        <AiOutlineMenu size={24} />
      </button>

      {/* Sidebar (Always visible on MD+ screens, Hidden on Mobile) */}
      <div className={`fixed md:relative bg-white h-screen w-64 shadow-2xl transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

        {/* Close Button for Mobile */}
        <button onClick={() => setIsOpen(false)} className="absolute top-3 right-3 md:hidden">
          <IoClose size={24} />
        </button>

        {/* Sidebar Content */}
        <div className="flex flex-col items-center px-4">
          {/* Logo */}
          <div className="w-full flex items-center justify-center gap-3 pt-10">
            <img src={titleImg} alt="title icon" className="w-10" />
            <p className="text-2xl font-bold">CodeTracker</p>
          </div>

          {/* Divider */}
          <div className="bg-slate-300 p-[0.5px] mt-4 w-[91%]"></div>

          {/* Sidebar Links */}
          <div className="w-full flex flex-col mt-5">
            <Link to={`/home/dashboard/${user._id}`} className="w-full flex items-center px-6 py-2 rounded-lg hover:bg-slate-200 cursor-pointer">
              <MdDashboard size={22} className="text-slate-700" />
              <p className="font-semibold text-lg text-slate-700 ml-3">Dashboard</p>
            </Link>

            <Link to={"/home/profile"} className="w-full flex items-center px-6 py-2 rounded-lg hover:bg-slate-200 cursor-pointer mt-2">
              <ImProfile size={22} className="text-slate-700" />
              <p className="font-semibold text-lg text-slate-700 ml-3">Profile</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay (For Mobile) */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Sidebar;
