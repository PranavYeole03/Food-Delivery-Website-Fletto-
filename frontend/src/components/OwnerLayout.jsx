import { Outlet } from "react-router-dom";
import OwnerSidebar from "./OwnerSidebar";
import Nav from "./Nav";

export default function OwnerLayout() {
  return (
    <div className="flex">

      <OwnerSidebar />

      <div className="flex-1 md:ml-64">
        <Nav />

        <div className="pt-16 px-4 md:px-6">
          <Outlet />
        </div>
      </div>

    </div>
  );
}