import React from "react";
import { useSelector } from "react-redux";
import OwnerDashboard from "../components/OwnerDashboard";
import DeliveryBoy from "../components/DeliveryBoy";
import UserDashboard from "../components/userDashboard";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="w-screen min-h-screen pt-15 flex flex-col items-center bg-white">
      {userData?.role == "user" && <UserDashboard />}
      {userData?.role == "owner" && <OwnerDashboard />}
      {userData?.role == "deliveryBoy" && <DeliveryBoy />}
    </div>
  );
};

export default Home;
