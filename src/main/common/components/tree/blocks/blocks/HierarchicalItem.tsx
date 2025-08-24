import { ArrowDownFromLine, DiamondMinus, DiamondPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState, memo } from "react";
import { useTranslation } from "react-i18next";
import Hierarchicals from "../Hierarchicals";

type HierarchicalItemProps = {
  item: any;
  level?: number;
  lastElement?: boolean;
  parentItem?: any;
  collapseAll: boolean;
  expandAll: boolean;
  nameChildrenFields: string;
  mainField?: string;
  subField?: string;
  interComponent?: (props: { item: any }) => JSX.Element;
  chart?: boolean;
  index: number;
  lastIndex: number;
};

const HierarchicalItem = ({
  item,
  level = 1,
  lastElement = false,
  parentItem: _parentItem,
  collapseAll,
  expandAll,
  nameChildrenFields,
  mainField,
  subField,
  interComponent = () => <div>No Component Provided</div>, // Default function
  chart,
  index,
  lastIndex,
}: HierarchicalItemProps) => {
  const { i18n } = useTranslation("accounts");
  const [hideChildren, setHideChildren] = useState(level !== 1);

  useEffect(() => {
    setHideChildren(collapseAll || (expandAll ? false : hideChildren));
  }, [collapseAll, expandAll]);

  if (!item) return null;

  const toggleChildren = () => setHideChildren((prev) => !prev);

  return (
    <div className="item-of-tree">
      {level > 1 && chart && (
        <div>
          {index === 0 && index === lastIndex ? (
            ""
          ) : index === 0 ? (
            <div
              className={
                "border-b-2 border-dashed border-[#999] h-0.5 w-1/2 ms-auto"
              }
            />
          ) : index === lastIndex ? (
            <div
              className={
                "border-t-2 border-dashed border-[#999] h-0.5 w-1/2 me-auto"
              }
            />
          ) : (
            <div
              className={"border-b-2 border-dashed border-[#999] h-0.5 w-full"}
            />
          )}
          <div
            className={cn(
              "border-s-2 border-dashed border-[#999] h-8 w-1 transform relative start-1/2"
              // i18n.language === "ar" ? "-translate-x-[10px]" : ""
            )}
          />
        </div>
      )}
      <div
        className={cn("flex", chart ? "justify-center px-3" : "items-stretch")}
      >
        <div
          className={cn(
            "border-s-2 border-dashed border-[#999]",
            (lastElement || chart || level === 1) && "h-0"
          )}
        />
        <div className={cn(chart ? "flex flex-col" : "")}>
          <div
            className={cn("flex", chart ? "justify-center" : "items-stretch")}
          >
            {level > 1 && !chart && (
              <div className="flex">
                {lastElement && (
                  <div className="border-s-2 border-dashed border-[#999] h-1/2 -ms-0.5 mt-0.5" />
                )}
                {!chart && (
                  <div className="border-b-2 border-dashed border-[#999] w-6 h-1 self-center" />
                )}
              </div>
            )}
            <div
              className={cn(
                `flex items-center gap-4`,
                !chart && !(level === 1 && index === 0) ? "mt-4" : ""
              )}
            >
              <div
                className={cn(
                  "relative px-3 py-2 ring-1 max-w-max rounded-md ring-[#E4E4E7]",
                  chart ? "pb-5" : ""
                )}
              >
                <div
                  className={cn(
                    "flex items-center gap-6 ps-2",
                    chart ? "border-b-4" : "border-s-4",
                    {
                      "border-primary": item.type === (mainField || "main"),
                      "border-secondary": item.type === (subField || "sub"),
                    }
                  )}
                >
                  <div>{interComponent({ item })}</div>
                  {item[nameChildrenFields]?.length > 0 && !chart && (
                    <div className="flex items-center gap-1">
                      <div
                        className="w-5 text-primary cursor-pointer transform transition-transform"
                        onClick={toggleChildren}
                      >
                        <ArrowDownFromLine
                          className={`w-4 translate-transform duration-150 transform ${
                            hideChildren
                              ? i18n.language === "ar"
                                ? "rotate-90"
                                : "-rotate-90"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>
                {item[nameChildrenFields]?.length > 0 && chart && (
                  <div
                    className={cn(
                      "flex items-center justify-center absolute z-[1] bg-white bottom-0 transform start-1/2 translate-y-1/2 gap-1",
                      i18n.language === "ar"
                        ? "translate-x-[13px]"
                        : "-translate-x-[13px]"
                    )}
                  >
                    <div
                      className="w-5 text-primary cursor-pointer transform transition-transform"
                      onClick={toggleChildren}
                    >
                      {hideChildren ? (
                        <DiamondPlus className={`w-7`} />
                      ) : (
                        <DiamondMinus className={`w-7`} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {chart && !hideChildren && item[nameChildrenFields]?.length > 0 && (
            <div className="flex flex-col items-center">
              {
                <div
                  className={cn(
                    "border-s-2 border-dashed border-[#999] h-8 w-1 transform",
                    i18n.language === "ar"
                      ? "-translate-x-0.5"
                      : "translate-x-0.5"
                  )}
                />
              }
            </div>
          )}

          {item[nameChildrenFields]?.length > 0 && (
            <div
              className={cn(chart ? "" : "ms-6", {
                hidden: hideChildren,
              })}
            >
              <Hierarchicals
                data={item[nameChildrenFields]}
                level={level + 1}
                parentItem={item}
                collapseAll={collapseAll}
                expandAll={expandAll}
                nameChildrenFields={nameChildrenFields}
                interComponent={interComponent}
                chart={chart}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(HierarchicalItem);
