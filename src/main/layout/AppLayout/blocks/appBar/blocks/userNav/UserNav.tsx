import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import useUserNav from "./hooks/useUserNav";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/main/global/store/auth/useAuth";

export function UserNav() {
  const { i18n, t } = useTranslation("navbar");

  const { handleLogOut } = useUserNav();
  const { user } = useAuth();

  // const user = {
  //   fullName: "mo",
  //   picture: undefined,
  // };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className=" flex items-center">
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={user?.picture || ""}
                alt={
                  user?.fullName ? user?.fullName.trim()[0]?.toUpperCase() : ""
                }
              />
              <AvatarFallback>
                {user?.fullName
                  ? user?.fullName.trim()?.slice(0, 2)?.toUpperCase()
                  : ""}
              </AvatarFallback>
            </Avatar>
          </Button>{" "}
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align={i18n.language === "ar" ? "start" : "end"}
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p
              className={`text-sm font-bold leading-none ${
                i18n.language === "ar" ? "text-end" : "text-start"
              }`}
            >
              {user?.fullName}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem
          className={`text-sm ${
            i18n.language === "ar" ? "text-end" : "text-start"
          }`}
        >
          {/* <Link
            to={"/profile"}
            className={`flex flex-col space-y-1 text-sm w-full`}
          >
            {t("navbar.userNav.profile")}
          </Link> */}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogOut}
          className={`flex  space-y-1 text-sm w-full cursor-pointer ${
            i18n.language === "ar" ? "justify-end" : "justify-start"
          }`}
        >
          {t("navbar.userNav.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>{" "}
    </DropdownMenu>
  );
}
