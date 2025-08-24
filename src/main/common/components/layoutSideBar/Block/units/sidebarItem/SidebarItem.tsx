// components/SidebarItem.tsx
import { useTranslation } from "react-i18next";
import { SidebarLink } from "../../types/Sidebar";

interface SidebarItemProps {
  item: SidebarLink;
  isChild?: boolean;
}

export const SidebarItem = ({ item, isChild = false }: SidebarItemProps) => {
  const { t } = useTranslation("navbar");

  return (
    <div className="flex items-center gap-2 w-full">
      {item.icon ? (
        <div className="shrink-0 flex justify-center items-center w-sidebar h-appbar">
          <item.icon
            size={22}
            className="text-primary min-w-[18px]"
            // strokeWidth={2}
          />
        </div>
      ) : isChild ? (
        <div className="shrink-0 flex justify-center items-center h-7">
          <div className="rounded-full w-2 h-2 bg-primary min-w-[8px]" />
        </div>
      ) : null}
      <p className="font-semibold truncate">{t(item.id)}</p>
    </div>
  );
};
