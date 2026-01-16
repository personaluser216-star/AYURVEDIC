"use client";

import { CgMenuLeftAlt } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function AdminHeader() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center px-6 justify-between">

      {/* Left */}
      <div className="flex items-center gap-4 w-full max-w-xl">
        <button className="p-2 rounded border border-gray-200 hover:bg-gray-100">
          <CgMenuLeftAlt size={22} className="text-gray-500" />
        </button>

        <div className="relative flex-1">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100">
          <MdOutlineDarkMode size={20} />
        </button>

        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded">
          <FaRegUserCircle size={22} />
          <span className="text-sm font-medium">Admin</span>
          <MdKeyboardArrowDown />
        </div>
      </div>

    </header>
  );
}
