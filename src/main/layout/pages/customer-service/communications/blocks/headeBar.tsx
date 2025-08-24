import { useState } from "react";
import Search from "./Search";

export default function HeadeBar() {
  const [textSearch, setTextSearch] = useState("");
  return (
    <div
      className="px-6
     bg-white items-center h-appbar flex justify-start md:w-[calc((100%)-269px)] max-md:w-full absolute right-0 top-[80px] ms-sidebar"
    >
      <div>
        <Search onChange={(E) => setTextSearch(E)} value={textSearch}></Search>
      </div>
    </div>
  );
}
