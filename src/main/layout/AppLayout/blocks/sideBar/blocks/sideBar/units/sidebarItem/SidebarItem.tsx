// components/SidebarItem.tsx
import { useTranslation } from "react-i18next";
import { SidebarLink } from "../../types/Sidebar";

interface SidebarItemProps {
  item: SidebarLink;
  isChild?: boolean;
  acteive?: boolean;
}

export const SidebarItem = ({
  item,
  isChild = false,
  acteive,
}: SidebarItemProps) => {
  const { t } = useTranslation("navbar");
  console.log(acteive, item, "sidebarLinks");

  return (
    <div className="flex items-center gap-2 w-full">
      {item.icon ? (
        <div
          className={`shrink-0 flex justify-center items-center w-min   h-[45px] ms-6 ${
            acteive ? "text-[#F2AE31]  " : ""
          }`}
        >
          {item.acteveIcon ? (
            <item.acteveIcon
              size={22}
              color={acteive ? "#F2AE31" : undefined}
              className={`text-[#B4B8BD] min-w-[18px]${
                acteive ? " !text-[#F2AE31]" : ""
              }`}
            />
          ) : typeof item.icon === "string" ? (
            <img src={item.icon} className="text-[#B4B8BD] min-w-[18px]" />
          ) : (
            <item.icon
              size={22}
              className={`text-[#B4B8BD] min-w-[18px]${
                acteive ? " !text-[#F2AE31]" : ""
              }`}
            />
          )}
        </div>
      ) : isChild ? (
        <div className="shrink-0 flex my-[6px] justify-center items-center h-[34px]">
          <div
            className={`rounded-full   ${
              acteive ? "bg-[#F2AE31]" : ""
            } w-[3px] h-6`}
          />
        </div>
      ) : null}
      <p
        className={`font-semibold truncate ${
          acteive ? "text-[#F2AE31]  " : ""
        }`}
      >
        {t(item.id)}
      </p>
    </div>
  );
};
