import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiPlus,
  FiBarChart2,
  FiX,
  FiInfo,
} from "react-icons/fi";
import { useState, useEffect } from "react";

export default function OwnerSidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // ✅ TOGGLE SIDEBAR (FIXED)
  useEffect(() => {
    const toggleSidebar = () => setOpen((prev) => !prev);

    window.addEventListener("toggleSidebar", toggleSidebar);

    return () =>
      window.removeEventListener("toggleSidebar", toggleSidebar);
  }, []);

  // ✅ AUTO CLOSE ON ROUTE CHANGE
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const menu = [
    { name: "Dashboard", path: "/owner", icon: <FiHome /> },
    { name: "Orders", path: "/my-order", icon: <FiShoppingBag /> },
    { name: "Add Item", path: "/owner/add-items", icon: <FiPlus /> },
    { name: "Analytics", path: "/owner/analytics", icon: <FiBarChart2 /> },
  ];

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex flex-col justify-between`}
      >
        {/* TOP SECTION */}
        <div>
          {/* HEADER */}
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-2xl font-bold text-[#ff4d2d]">Fletto</h1>

            {/* ✅ CLOSE BUTTON (CORRECT) */}
            <button
              className="md:hidden"
              onClick={() => setOpen(false)}
            >
              <FiX size={20} />
            </button>
          </div>

          {/* MENU */}
          <div className="flex flex-col p-4 gap-2">
            {menu.map((item, i) => {
              const active =
                item.path === "/owner"
                  ? location.pathname === "/owner"
                  : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={i}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
                  ${active
                      ? "bg-[#ff4d2d] text-white"
                      : "hover:bg-gray-100"
                    }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="p-4 border-t">
          <Link
            to="/owner/app-info"
            onClick={() => setOpen(false)}
            className={`hidden md:flex items-center gap-3 px-4 py-2 rounded-lg transition
            ${location.pathname === "/owner/app-info"
                ? "bg-[#ff4d2d] text-white"
                : "hover:bg-gray-100"
              }`}
          >
            <FiInfo />
            App Info
          </Link>
        </div>
      </div>
    </>
  );
} 