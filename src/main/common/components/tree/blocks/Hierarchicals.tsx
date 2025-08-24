import { cn } from "@/lib/utils";
import HierarchicalItem from "./blocks/HierarchicalItem";
import React from "react";

type HierarchicalsProps = {
  data: any[];
  level?: number;
  parentItem?: any;
  collapseAll: boolean;
  expandAll: boolean;
  nameChildrenFields: string;
  mainField?: string;
  subField?: string;
  interComponent?: (props: { item: any }) => JSX.Element;
  chart?: boolean;
};

const Hierarchicals = React.memo(
  ({
    data,
    level = 1,
    parentItem,
    collapseAll,
    expandAll,
    nameChildrenFields,
    interComponent,
    mainField,
    subField,
    chart = false,
  }: HierarchicalsProps) => {
    return (
      <div
        className={cn(
          "parent-of-tree flex",
          chart ? "flex-row justify-center" : "flex-col items-stretch",
          level > 1 && !chart ? "ms-6" : ""
        )}
      >
        {Array.isArray(data) &&
          data?.map((item, index) => (
            <HierarchicalItem
              key={index}
              item={item}
              level={level}
              lastElement={index === data.length - 1}
              parentItem={parentItem}
              collapseAll={collapseAll}
              expandAll={expandAll}
              nameChildrenFields={nameChildrenFields}
              interComponent={interComponent}
              mainField={mainField}
              subField={subField}
              chart={chart}
              index={index}
              lastIndex={data.length > 0 ? data.length - 1 : 0}
            />
          ))}
      </div>
    );
  }
);

export default Hierarchicals;
