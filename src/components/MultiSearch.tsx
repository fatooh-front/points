import { customSearchStyles } from "@/main/common/components/TForm/reactSelect/styles/customStyleReactSelect";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import ReactSelect from "react-select";

export default function MultiSearch({
  searchsData,
  className,
  onSearch,
  onClear,
  search,
  hide,
}: {
  searchsData: {
    component?: (
      onChange: (key: string, value: string) => void
    ) => React.ReactNode;
    options?: { value: string; label: string }[];
    onChange?: (value: string) => any;

    inputDefaultValue?: string;
    minWidth?: string;
    name: string;
    title: string;
  }[];
  className?: string;

  onSearch: (value: { [key: string]: string }) => void;
  search?: { [key: string]: string };
  onClear?: () => void;
  hide?: boolean;
}) {
  const [searchOpj, setSearchOpj] = useState<{ [key: string]: string }>({});

  const onChange = (key: string, value: string) => {
    let searchOpjCopy = { ...(search ?? searchOpj) };
    searchOpjCopy[key] = value;
    setSearchOpj(searchOpjCopy);

    console.log(searchOpj, "searchOpjsearchOpj");

    onSearch(searchOpjCopy);
    console.log(searchOpjCopy);
  };
  return (
    <div className={` flex h-[48px] gap-1 ${hide ? "hidden" : ""}`}>
      <div
        className={
          ` rounded-[8px] ${
            onClear ? "rounded-e-none" : ""
          } flex border h-[48px] min-w-[321px] ` + className
        }
      >
        {searchsData.map((item, index) => {
          return (
            <div
              className=" flex items-center"
              style={{ minWidth: item.minWidth }}
            >
              {item.onChange ? (
                <ReactSelect
                  filterOption={() => true}
                  styles={customSearchStyles()}
                  className={`  !h-full  flex-1   ${
                    index === 0
                      ? "rounded-e-none rounded-[8px]"
                      : index === searchsData.length - 1
                      ? ""
                      : ""
                  }    text-sm text-[#7C7C7C] placeholder:text-[#7C7C7C] `}
                  onInputChange={(value, { action }) => {
                    console.log(value, action, "dsfsdfsdfsdf");

                    if (item.onChange) {
                      action === "input-change" ? item.onChange(value) : "";
                    }
                  }}
                  openMenuOnFocus={true}
                  autoFocus={
                    item.inputDefaultValue && item.inputDefaultValue !== ""
                      ? true
                      : false
                  }
                  inputValue={
                    search?.[item.name] || searchOpj[item.name]
                      ? ""
                      : item.inputDefaultValue
                  }
                  onChange={(e) => {
                    onChange(item.name, e?.value);
                  }}
                  onBlur={() => {
                    item.onChange && item.onChange("");
                  }}
                  value={
                    search?.[item.name] || searchOpj[item.name]
                      ? item.options?.find(
                          (option) =>
                            option.value === searchOpj[item.name] ||
                            option.value === search?.[item.name]
                        )
                      : null
                  }
                  placeholder={item.title || "بحث"}
                  name={item.name}
                  options={item.options || []}
                ></ReactSelect>
              ) : item.component ? (
                item.component(onChange)
              ) : (
                <input
                  className={` h-full w-full flex-1 w-[${item.minWidth}] $ ${
                    index === 0
                      ? "rounded-e-none rounded-[8px]"
                      : index === searchsData.length - 1
                      ? ""
                      : ""
                  }   px-4 py-2 text-sm text-[#7C7C7C] placeholder:text-[#7C7C7C] `}
                  type="text"
                  value={search?.[item.name] || searchOpj[item.name] || ""}
                  name={item.name}
                  placeholder={item.title || "بحث"}
                  onChange={(e) => {
                    onChange(e.target.name, e.target.value);
                  }}
                />
              )}{" "}
              {index !== searchsData.length - 1 && (
                <div className="h-[20px] w-[1px] bg-[#7C7C7C]"></div>
              )}
            </div>
          );
        })}

        {/* <div className=" rounded-[12px] bg-[#162A2B] cursor-pointer hover:opacity-70 mx-[12px] h-[40px] my-auto w-[48px]  flex justify-center items-center">
        <Search
          onClick={() => }
          className="text-white  "
        ></Search>
      </div> */}
      </div>
      {onClear ? (
        <div
          onClick={() => {
            onClear && onClear();
            setSearchOpj({});
            onSearch({});
          }}
          className=" h-full w-9 flex justify-center items-center bg-[#162A2B] rounded-e-[8px] cursor-pointer"
        >
          <RefreshCcw color="#fff" />
        </div>
      ) : null}
    </div>
  );
}
