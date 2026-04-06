// import React from "react";
// import { IoArrowBack } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import UserOrderCard from "../components/UserOrderCard";
// import OwnerOrderCard from "../components/OwnerOrderCard";
// import { useEffect } from "react";
// import { socket } from "../socket";
// import { setMyOrders, updateRealTimeOrderStatus } from "../redux/userSlice";

// const MyOrders = () => {
//   // const { userData, myOrders, socket } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     socket?.on("newOrder", (data) => {
//       if (data?.shopOrders?.owner?._id === userData._id) {
//         dispatch(setMyOrders([data, ...myOrders]));
//       }
//     });

//     socket?.on("update-Status", ({ orderId, shopId, status, userId }) => {
//       if (userId == userData._id) {
//         dispatch(updateRealTimeOrderStatus({ orderId, shopId, status }));
//       }
//     });

//     return () => {
//       socket?.off("newOrder");
//       socket?.off("update-Status");
//     };
//   }, [userData, dispatch]);
//   // return (
//   //   <div className="w-full min-h-screen bg-[#ffff6] flex justify-center px-4">
//   //     <div className="w-full max-w-200 p-4">
//   //       <div className="flex items-center gap-5 mb-6">
//   //         <div className="z-10" onClick={() => navigate("/")}>
//   //           <IoArrowBack size={35} className="text-[#ff4d2d]" />
//   //         </div>
//   //         <h1 className="text-2xl font-bold text-start">My Orders</h1>
//   //       </div>

//   //       <div className="space-y-6">
//   //         {myOrders?.map((order, index) =>
//   //           userData.role == "user" ? (
//   //             <UserOrderCard data={order} key={index} />
//   //           ) : userData.role == "owner" ? (
//   //             <OwnerOrderCard data={order} key={index} />
//   //           ) : null,
//   //         )}
//   //       </div>
//   //     </div>
//   //   </div>
//   // );
//   return (
//     <div className="w-full min-h-screen bg-linear-to-br bg-slate-50 flex justify-center px-4">

//       <div className="w-full max-w-7xl py-6 md:py-10">

//         {/* Header */}
//         <div className="flex items-center gap-4 mb-8">

//           <div
//             className="cursor-pointer hover:scale-110 transition"
//             onClick={() => navigate("/")}
//           >
//             <IoArrowBack size={28} className="text-orange-500" />
//           </div>

//           <h1 className="text-xl md:text-2xl font-bold text-gray-800">
//             My Orders
//           </h1>
//         </div>

//         {/* Orders */}
//         <div className="space-y-6">

//           {myOrders?.length === 0 && (
//             <p className="text-center text-gray-500 mt-20">
//               No orders yet.
//             </p>
//           )}

//           {myOrders?.map((order) =>
//             userData.role === "user" ? (
//               <UserOrderCard data={order} key={order._id} />
//             ) : userData.role === "owner" ? (
//               <OwnerOrderCard data={order} key={order._id} />
//             ) : null
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyOrders;

import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  setMyOrders,
  updateRealTimeOrderStatus,
} from "../redux/userSlice";
import UserOrderCard from "../components/UserOrderCard";
import OwnerOrderCard from "../components/OwnerOrderCard";
import { FaHome, FaShoppingBag } from "react-icons/fa";

const MyOrders = () => {
  const { userData, myOrders, socket } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  // ================= SOCKET =================
  useEffect(() => {
    if (!socket || !userData) return;

    const handleNewOrder = (data) => {
      if (data?.shopOrders?.owner?._id === userData?._id) {
        dispatch(setMyOrders((prev) => [data, ...(prev || [])]));
      }
    };

    const handleStatusUpdate = ({ orderId, shopId, status, userId }) => {
      if (userId === userData?._id) {
        dispatch(updateRealTimeOrderStatus({ orderId, shopId, status }));
      }
    };

    socket.on("newOrder", handleNewOrder);
    socket.on("updateStatus", handleStatusUpdate);

    return () => {
      socket.off("newOrder", handleNewOrder);
      socket.off("updateStatus", handleStatusUpdate);
    };
  }, [socket, userData, dispatch]);

  useEffect(() => {
    if (myOrders) setLoading(false);
  }, [myOrders]);

  const handleBack = () => {
    navigate(userData?.role === "owner" ? "/owner" : "/");
  };

  // ================= STATUS HELPER =================
  const getStatus = (order) => {
    if (order?.status) return order.status;

    if (Array.isArray(order?.shopOrders)) {
      return order.shopOrders[0]?.status;
    }

    return order?.shopOrders?.status;
  };

  // ================= STATS =================
  const totalOrders = myOrders?.length || 0;

  const delivered = myOrders?.filter(
    (o) => getStatus(o)?.toLowerCase() === "delivered"
  ).length;

  const pending = totalOrders - delivered;

  return (
    <div className="min-h-screen bg-white pb-20">

      {/* ================= HEADER ================= */}
      <div className="bg-white shadow px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <IoArrowBack
            size={24}
            className="cursor-pointer text-[#ff4d2d]"
            onClick={handleBack}
          />
          <h1 className="text-lg md:text-xl font-semibold">
            {userData?.role === "owner" ? "Shop Orders" : "My Orders"}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* ================= STATS (OWNER ONLY) ================= */}
        {userData?.role === "owner" && (
          <div className="grid grid-cols-3 gap-4">

            <div className="bg-white p-4 rounded-xl shadow text-center">
              <p className="text-sm text-gray-500">Total</p>
              <h2 className="font-bold text-lg">{totalOrders}</h2>
            </div>

            <div className="bg-white p-4 rounded-xl shadow text-center">
              <p className="text-sm text-gray-500">Delivered</p>
              <h2 className="font-bold text-lg text-green-600">
                {delivered}
              </h2>
            </div>

            <div className="bg-white p-4 rounded-xl shadow text-center">
              <p className="text-sm text-gray-500">Pending</p>
              <h2 className="font-bold text-lg text-yellow-600">
                {pending}
              </h2>
            </div>

          </div>
        )}

        {/* ================= LIST ================= */}
        {loading ? (
          <p className="text-center mt-20 text-gray-500">
            Loading orders...
          </p>
        ) : totalOrders === 0 ? (
          <div className="flex flex-col items-center mt-20 text-gray-500">
            <FaShoppingBag size={40} className="mb-3" />
            <p>No orders yet</p>
          </div>
        ) : (
          <div className="space-y-5">
            {myOrders.map((order) => {
              const status = getStatus(order);
              const isDelivered =
                status?.toLowerCase() === "delivered";

              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow p-4"
                >
                  {userData?.role === "user" ? (
                    <UserOrderCard data={order} />
                  ) : (
                    <OwnerOrderCard data={order} />
                  )}

                  <div className="flex justify-end mt-3">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${isDelivered
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {isDelivered ? "Delivered" : "In Progress"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ================= FOOTER ================= */}
        <div className="text-center text-sm text-gray-500 mt-10">
          © {new Date().getFullYear()} Fletto
        </div>
      </div>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      {userData?.role === "owner" && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow md:hidden z-50">
          <div className="flex justify-around py-2 text-xs">

            <button
              onClick={() => navigate("/owner")}
              className="flex flex-col items-center text-black"
            >
              <FaHome size={16} />
              Home
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;