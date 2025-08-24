import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Search from "./blocks/Search";
import { AdvancedFilterPyColumn } from "./blocks/AdvancedFilterPyColumn/AdvancedFilterPyColumn";

interface HeadeBarProps {
  OnChangeSearchBar: (event: string) => void;
  value: string;
}

export default function HeadeBar({ OnChangeSearchBar, value }: HeadeBarProps) {
  const { t } = useTranslation("cars");

  return (
    <div
      className="px-6
     bg-white items-center h-appbar flex justify-between md:w-[calc((100%)-269px)] max-md:w-full absolute right-0 top-[80px] ms-sidebar"
    >
      <div className=" flex gap-4 items-center">
        <Search onChange={OnChangeSearchBar} value={value}></Search>
        <AdvancedFilterPyColumn />
      </div>{" "}
      <div>
        <Link to={"/cars/add"}>
          <Button
            type="button"
            className={cn(
              " lg:flex  shadow-xl font-normal text-sm h-[48px]  gap-2 hover:opacity-70 w-full sm:w-fit"
            )}
          >
            + {t("cars.form.addText")}
          </Button>{" "}
        </Link>{" "}
      </div>
    </div>
  );
}
