"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { GrCart } from "react-icons/gr";

const sidebarMenu = [
  {
    title: "Dashboard",
    icon: LuLayoutDashboard,
    dropdown: false,
    href: "/admin",
  },
  {
    title: "Product",
    icon: MdOutlineCategory,
    dropdown: true,
    items: [
      { label: "Add Product", href: "/admin/product/addproduct" },
      { label: "All Product", href: "/admin/product/getproduct" },
    ],
  },
  {
    title: "Order",
    icon: GrCart,
    dropdown: false,
    href: "/admin/orders",
  },
  {
    title: "Users Profile",
    icon: FaRegUserCircle,
    dropdown: false,
    href: "/admin/users",
  },
];

export default function AdminSidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <aside className="w-64 p-5 border-r bg-white">
      <div className="flex justify-center mb-6">
        <Image src="/logo.png" alt="Logo" width={100} height={30} />
      </div>

      <ul className="space-y-2 text-black">
        <p className="text-gray-500">Menu</p>

        {sidebarMenu.map((menu) => (
          <li key={menu.title}>
            {menu.dropdown ? (
              <>
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === menu.title ? null : menu.title)
                  }
                  className="flex w-full items-center justify-between p-2 rounded hover:bg-gray-100"
                >
                  <span className="flex items-center gap-3">
                    <menu.icon size={18} />
                    {menu.title}
                  </span>
                  <MdKeyboardArrowDown />
                </button>

                {openMenu === menu.title && (
                  <ul className="ml-8 mt-1 space-y-1 text-gray-600">
                    {menu.items.map((item) => (
                      <li key={item.label}>
                        <Link href={item.href} className="block p-2 hover:bg-gray-100 rounded">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link href={menu.href} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
                <menu.icon size={18} />
                {menu.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
