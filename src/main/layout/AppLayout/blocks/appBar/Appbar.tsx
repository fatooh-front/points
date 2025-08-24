import BreadCrumbs from "./blocks/breadCrumps/BreadCrumps";
import { UserNav } from "./blocks/userNav/UserNav";
import { MobileSidebar } from "../sideBar/MobileSidebar";
// import ChangeLang from "./blocks/changeLang/ChangeLang";

import ThemeSwich from "./blocks/themeSwich/ThemeSwich";
import Notifications from "./blocks/notifications/Notifications";
// import Notifications from "./units/notifications/Notifications";

const Appbar = () => {
  return (
    <div className="border-b bg-white flex h-full items-center px-[24px] ">
      <div className="flex items-center gap-5">
        <MobileSidebar />
        <BreadCrumbs />
      </div>
      <div className="ms-auto flex items-center gap-5">
        <Notifications></Notifications>
        {/* <ChangeLang /> */}
        <ThemeSwich />

        <UserNav />
      </div>
    </div>
  );
};

export default Appbar;
