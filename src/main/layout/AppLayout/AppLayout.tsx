import { Outlet, useLocation } from "react-router-dom";
import Appbar from "./blocks/appBar/Appbar";
import background from "./background.png";
import Sidebar from "./blocks/sideBar/blocks/sideBar/Sidebar";
import { cn } from "@/lib/utils";

const AppLayout = () => {
  const { pathname } = useLocation();
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url('${background}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hidden md:block border-r rtl:border-r-0 rtl:border-l fixed z-20 shadow-lg">
        <Sidebar />
      </div>
      <div className="md:ms-sidebar w-appbar">
        <div className="h-appbar w-full"></div>
        <div className="fixed h-appbar w-appbar z-10 top-0">
          <Appbar />
        </div>
        <div
          className={cn(
            `shrink-1 w-full overflow-x-hidden box`,
            !pathname.includes("/profile") ? "p-3 max-sm:px-4" : "p-0"
          )}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AppLayout;
