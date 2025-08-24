import { Link } from "react-router-dom";
import Search from "../../cars/blocks/HeadeBar/blocks/Search";

type HeadeBarProps = {
  OnChangeSearchBar: (value: string) => void;
  value: string;
};

export default function HeadeBar({ OnChangeSearchBar, value }: HeadeBarProps) {
  return (
    <div
      className="px-6
     bg-white items-center h-appbar flex justify-between md:w-[calc((100%)-269px)] max-md:w-full absolute right-0 top-[80px] ms-sidebar"
    >
      {" "}
      <div className=" flex gap-4 items-center">
        <Search onChange={OnChangeSearchBar} value={value}></Search>
      </div>
      <Link to={"/client/add"}>
        <div></div>
      </Link>
    </div>
  );
}
