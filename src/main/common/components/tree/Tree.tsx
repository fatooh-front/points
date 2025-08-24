import { useTranslation } from "react-i18next";
import Hierarchicals from "./blocks/Hierarchicals";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FolderTree,
  FoldVertical,
  Network,
  // Table,
  UnfoldVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useCollapseExpand from "./hooks/useCollapseExpand";
type TreeProps = {
  data: any[];
  level?: number;
  parentItem?: any;
  nameChildrenFields: string;
  mainField?: string;
  subField?: string;
  interComponent?: (props: { item: any }) => JSX.Element;
  chart?: boolean;
  disableCollapseExpand?: boolean;
  enableCollapseAll?: boolean;
  setEnableCollapseAll?: Dispatch<SetStateAction<boolean>>;
};

export default function Tree({
  data,
  nameChildrenFields,
  interComponent,
  mainField,
  subField,
  chart = false,
  disableCollapseExpand = false,
  enableCollapseAll = false,
  setEnableCollapseAll,
}: TreeProps) {
  const { i18n, t } = useTranslation("tree");
  const [type, setType] = useState("tree");

  const { collapseAllAccounts, expandAllAccounts, collapseAll, expandAll } =
    useCollapseExpand();

  useEffect(() => {
    chart ? setType("chart") : setType("tree");
  }, [chart]);

  useEffect(() => {
    enableCollapseAll && collapseAllAccounts();
    setEnableCollapseAll && setEnableCollapseAll(false);
  }, [collapseAllAccounts]);

  return (
    <div className="flex flex-col gap-5 min-h-[200px] pb-7 overflow-auto w-full items-start">
      <div className="flex gap-3 items-center w-fit">
        <Tabs
          defaultValue={type}
          dir={i18n.dir(i18n.language)}
          className="w-fit"
          onValueChange={(value) => setType(value)}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tree">
              <FolderTree
                className={cn(
                  "h-4 w-4 me-2",
                  i18n.language === "ar" ? "-scale-x-100" : ""
                )}
              />
              {t("tree.tabs.tree")}
            </TabsTrigger>
            <TabsTrigger value="chart">
              <Network className="h-4 w-4 me-2" />
              {t("tree.tabs.chart")}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {!disableCollapseExpand && (
          <div className="flex itmes-center gap-4">
            <FoldVertical
              className="shrink-0 w-7 h-7 text-primary cursor-pointer"
              onClick={() => collapseAllAccounts()}
            />
            <UnfoldVertical
              className="shrink-0 w-7 h-7 text-primary cursor-pointer"
              onClick={() => expandAllAccounts()}
            />
          </div>
        )}
      </div>
      <Hierarchicals
        data={data}
        collapseAll={collapseAll}
        expandAll={expandAll}
        nameChildrenFields={nameChildrenFields}
        interComponent={interComponent}
        mainField={mainField}
        subField={subField}
        chart={type === "chart" ? true : false}
      />
    </div>
  );
}
