import BottomBar from "@/components/shared/BottomBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSideBar />
      {/* Outlet is used to render the child component like about , explore sign out etc */}
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <BottomBar/>
    </div>
  );
};

export default RootLayout;
