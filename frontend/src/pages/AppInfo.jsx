import React from "react";
import { FaPhoneAlt, FaEnvelope, FaInfoCircle, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AppInfo = () => {

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white p-6">

      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8 text-gray-800">App Info</h1>

        <div className="backdrop-blur-md bg-white/60 border border-gray-200 shadow-lg rounded-2xl p-6 space-y-6">

          {/* App Name */}
          <div className="flex items-center gap-4">
            <FaInfoCircle className="text-xl text-gray-600" />
            <div>
              <p className="font-medium text-gray-800">App Name</p>
              <p className="text-gray-500">Fletto Food Delivery Website</p>
            </div>
          </div>

          {/* Version */}
          <div className="flex items-center gap-4">
            <FaInfoCircle className="text-xl text-gray-600" />
            <div>
              <p className="font-medium text-gray-800">Version</p>
              <p className="text-gray-500">1.0.0</p>
            </div>
          </div>

          {/* Customer Support */}
          <a
            href="tel:+917498605537"
            className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg transition"
          >
            <FaPhoneAlt className="text-xl text-gray-600" />
            <div>
              <p className="font-medium text-gray-800">Customer Support</p>
              <p className="text-gray-500">+91 7498605537</p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:fletto123fd@gmail.com"
            className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg transition"
          >
            <FaEnvelope className="text-xl text-gray-600" />
            <div>
              <p className="font-medium text-gray-800">Email</p>
              <p className="text-gray-500">fletto123fd@gmail.com</p>
            </div>
          </a>

          {/* About */}
          <div className="border-t pt-4">
            <p className="font-medium mb-2 text-gray-800">About</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Fletto is a food delivery platform connecting users with local shops,
              providing fast and reliable service.
            </p>
          </div>

        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow md:hidden z-50">

        <div className="flex justify-around py-2">

          <button
            onClick={() => navigate("/owner")}
            className="flex flex-col items-center text-xs text-black"
          >
            <FaHome size={16} />
            <span>Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppInfo;