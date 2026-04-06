// import React from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
// import ForgotPassword from "./pages/ForgotPassword";
// import useGetCurrentUser from "./hooks/useGetCurrentUser";
// import { useDispatch, useSelector } from "react-redux";
// import Home from "./pages/Home";
// import useGetCity from "./hooks/useGetCity";
// import useGetMyShop from "./hooks/useGetMyShop";
// import CreateEditShop from "./pages/CreateEditShop";
// import AddItem from "./pages/AddItem";
// import EditItem from "./pages/EditItem";
// import useGetShopByCity from "./hooks/useGetShopByCity";
// import useGetItemByCity from "./hooks/useGetItemByCity";
// import CartPages from "./pages/CartPages";
// import CheckOut from "./pages/CheckOut";
// import OrderPlaced from "./pages/OrderPlaced";
// import MyOrders from "./pages/MyOrders";
// import useGetMyOrders from "./hooks/useGetMyOrders";
// import useUpdateLocation from "./hooks/useUpdateLocation";
// import TrackOrderPage from "./pages/TrackOrderPage";
// import ShopItems from "./pages/ShopItems";
// import { useEffect } from "react";
// import { io } from "socket.io-client";
// import { setSocket } from "./redux/userSlice";

// export const serverUrl = "http://localhost:8000";

// const App = () => {
//   const { userData } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   useGetCurrentUser();
//   useGetCity();
//   useGetMyShop();
//   useGetShopByCity();
//   useGetItemByCity();
//   useGetMyOrders();
//   useUpdateLocation();

//   useEffect(() => {
//     const socketInstance = io(serverUrl, { withCredentials: true });
//     dispatch(setSocket(socketInstance));
//     socketInstance.on("connect", () => {
//       if (userData) {
//         socketInstance.emit("identity", { userId: userData._id });
//       }
//     });
//     return () => {
//       socketInstance.disconnect()
//     }

//   }, [userData, dispatch]);
//   useEffect(() => {
//     if (userData) {
//       // Prevent duplicate loading
//       if (!document.getElementById("fletto-chatbot")) {
//         const script = document.createElement("script");
//         script.id = "fletto-chatbot";
//         script.src = "https://ai-chat-bot-five-lake.vercel.app/chatBot.js";
//         script.setAttribute("data-owner-id", "usr_110779774695178759");
//         script.async = true;

//         document.body.appendChild(script);
//       }
//     } else {
//       // Remove chatbot on logout
//       const existing = document.getElementById("fletto-chatbot");
//       if (existing) existing.remove();
//     }
//   }, [userData]);



//   useEffect(() => {
//     if (userData) {
//       if (!document.getElementById("fletto-chatbot")) {
//         const script = document.createElement("script");
//         script.id = "fletto-chatbot";
//         script.src = "https://ai-chat-bot-five-lake.vercel.app/chatBot.js";
//         script.setAttribute("data-owner-id", "usr_110779774695178759");
//         script.async = true;

//         document.body.appendChild(script);
//       }
//     } else {
//       // Remove chatbot on logout
//       const existing = document.getElementById("fletto-chatbot");
//       if (existing) existing.remove();
//     }
//   }, [userData]);


//   return (
//     <Routes>
//       <Route
//         path="/signup"
//         element={!userData ? <SignUp /> : <Navigate to={"/"} />}
//       />
//       <Route
//         path="/signin"
//         element={!userData ? <SignIn /> : <Navigate to={"/"} />}
//       />
//       <Route
//         path="/forgot-password"
//         element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
//       />
//       <Route
//         path="/"
//         element={userData ? <Home /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/create-edit-Shop"
//         element={userData ? <CreateEditShop /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/add-items"
//         element={userData ? <AddItem /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/edit-items/:itemId"
//         element={userData ? <EditItem /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/cart"
//         element={userData ? <CartPages /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/checkOut"
//         element={userData ? <CheckOut /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/order-place"
//         element={userData ? <OrderPlaced /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/my-order"
//         element={userData ? <MyOrders /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/track-order/:orderId"
//         element={userData ? <TrackOrderPage /> : <Navigate to={"/signin"} />}
//       />
//       <Route
//         path="/shop-items/:shopId"
//         element={userData ? <ShopItems /> : <Navigate to={"/signin"} />}
//       />
//     </Routes>
//   );
// };

// export default App;
import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { socket } from "./socket";

// Pages
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import CreateEditShop from "./pages/CreateEditShop";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import CartPages from "./pages/CartPages";
import CheckOut from "./pages/CheckOut";
import OrderPlaced from "./pages/OrderPlaced";
import MyOrders from "./pages/MyOrders";
import TrackOrderPage from "./pages/TrackOrderPage";
import ShopItems from "./pages/ShopItems";
import Analytics from "./pages/Analytics";
import AppInfo from "./pages/AppInfo"

// Hooks
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import useGetCity from "./hooks/useGetCity";
import useGetMyShop from "./hooks/useGetMyShop";
import useGetShopByCity from "./hooks/useGetShopByCity";
import useGetItemByCity from "./hooks/useGetItemByCity";
import useGetMyOrders from "./hooks/useGetMyOrders";
import useUpdateLocation from "./hooks/useUpdateLocation";

// Layout
import OwnerLayout from "./components/OwnerLayout";
import OwnerDashboard from "./components/OwnerDashboard";
import { serverUrl } from "./config";

export { serverUrl };

const App = () => {
  const { userData } = useSelector((state) => state.user);

  // Hooks
  useGetCurrentUser();
  useGetCity();
  useGetMyShop();
  useGetShopByCity();
  useGetItemByCity();
  useGetMyOrders();
  useUpdateLocation();

  // ✅ Socket
  useEffect(() => {
    if (userData) {
      socket.connect();

      socket.emit("identity", {
        userId: userData._id,
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [userData]);

  // ✅ Chatbot
  useEffect(() => {
    if (userData) {
      if (!document.getElementById("fletto-chatbot")) {
        const script = document.createElement("script");
        script.id = "fletto-chatbot";
        script.src = "https://ai-chat-bot-five-lake.vercel.app/chatBot.js";
        script.setAttribute("data-owner-id", "usr_110779774695178759");
        script.async = true;

        document.body.appendChild(script);
      }
    } else {
      const existing = document.getElementById("fletto-chatbot");
      if (existing) existing.remove();
    }
  }, [userData]);

  return (
    <Routes>

      {/* AUTH */}
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/" />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to="/" />}
      />



      {/* USER */}
      {/* USER */}
      <Route
        path="/"
        element={
          userData
            ? userData.role === "owner"
              ? <Navigate to="/owner" />
              : <Home />
            : <Navigate to="/signin" />
        }
      />

      <Route path="/cart" element={<CartPages />} />
      <Route path="/checkOut" element={<CheckOut />} />
      <Route path="/order-place" element={<OrderPlaced />} />
      <Route path="/track-order/:orderId" element={<TrackOrderPage />} />
      <Route path="/shop-items/:shopId" element={<ShopItems />} />

      {/* ✅ USER MY ORDERS */}
      <Route
        path="/my-order"
        element={userData ? <MyOrders /> : <Navigate to="/signin" />}
      />

      {/* OWNER */}
      <Route element={userData ? <OwnerLayout /> : <Navigate to="/signin" />}>

        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/owner/add-items" element={<AddItem />} />
        <Route path="/owner/edit-items/:itemId" element={<EditItem />} />
        <Route path="/owner/create-shop" element={<CreateEditShop />} />
        <Route path="/owner/analytics" element={<Analytics />} />
        <Route path="/owner/app-info" element={<AppInfo />} />
        {/* ✅ THIS LINE MUST BE HERE */}

      </Route>

    </Routes>
  );
};

export default App;
