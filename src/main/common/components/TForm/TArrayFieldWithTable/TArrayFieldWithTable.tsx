import React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import TButton from "@/main/common/components/TForm/TButton";
import { FilePenLine, Plus } from "lucide-react";
import useArrayFieldWithTableDialog from "./hooks/useArrayFieldWithTableDialog";
import ArrayFieldTable from "./blocks/arrayFieldTabel/ArrayFieldTable";
import { ColumnDef } from "@tanstack/react-table";

type Props = {
  type?: "add" | "edit" | "view" | string;
  form: any;
  name: string;
  itemData?: any;
  children?: React.ReactNode;
  columnsPassed?: ColumnDef<any>[];
  defaultValue: any;
};

export default function TArrayFieldWithTable({
  type,
  form,
  name,
  itemData,
  children,
  columnsPassed,
  defaultValue,
}: Props) {
  const { t } = useTranslation("arrayFieldWithTable");
  const {
    mode,
    activeIndex,
    handleAddArrayField,
    handleEditArrayField,
    handleTriggerEditArrayField,
    handleTriggerViewArrayField,
    handleDeleteArrayField,
    handleCancelMode,
    derivedUnitsValues,
    FieldArray,
  } = useArrayFieldWithTableDialog({
    form,
    name,
    type,
    itemData,
    defaultValue,
  });

  // Helper function to inject base name and custom props recursively
  const injectBaseName = (child: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(child)) {
      return child;
    }

    const baseName = `${name}[${activeIndex}]`;

    // Special component handler to add common props
    const specialComponentHandler = (comp: React.ReactElement) => {
      // Add common props if the component has props
      const additionalProps = {
        ...comp.props,
        key: `${baseName}.${comp.props.name || ""}`,
        name: `${baseName}.${comp.props.name || ""}`,
        mode,
        readOnly: type === "view" || mode === "view",
        type: type as any,
        activeIndex,
        form,
      };

      // Recursively process children of the component
      const processedChildren = comp.props.children
        ? React.Children.map(comp.props.children, injectBaseName)
        : comp.props.children;
      return React.cloneElement(comp, additionalProps, processedChildren);
    };

    // Recursively process children
    const processChildren = (children: React.ReactNode): React.ReactNode => {
      return React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        // Check if it's a div or other container with children
        if (child.props.children) {
          const processedChildren = React.Children.map(
            child.props.children,
            (grandChild) => injectBaseName(grandChild)
          );

          return React.cloneElement(child, {
            ...child.props,
            children: processedChildren,
          });
        }

        // Handle specific component types
        return specialComponentHandler(child);
      });
    };

    // Handle the current element
    if (child.props.children) {
      const processedChildren = processChildren(child.props.children);
      return React.cloneElement(child, {
        ...child.props,
        children: processedChildren,
      });
    }

    return specialComponentHandler(child);
  };

  return (
    <div className="p-4">
      <div className="m-0 p-0">
        <div className="flex flex-col max-h-full gap-6 pt-3 h-100-31px">
          <div className="flex flex-col md:flex-1 gap-y-3">
            {React.Children?.map(children, injectBaseName)}
            {type !== "view" && (
              <div className={cn(`flex gap-2`, mode === "view" && "self-end")}>
                {mode === "add" && (
                  <TButton
                    type="button"
                    onClick={handleAddArrayField}
                    className="flex items-center gap-2 w-full"
                    variant="secondary"
                  >
                    <Plus size={16} />
                    <span>{t("arrayFieldWithTable.form.addArrayField")}</span>
                  </TButton>
                )}
                {mode === "edit" && (
                  <TButton
                    type="button"
                    onClick={handleEditArrayField}
                    className="flex items-center gap-2 w-full"
                    variant="secondary"
                  >
                    <FilePenLine size={16} />
                    <span>
                      {t("arrayFieldWithTable.form.updateArrayField")}
                    </span>
                  </TButton>
                )}
                {(mode === "edit" || mode === "view") && (
                  <TButton
                    type="button"
                    onClick={handleCancelMode}
                    className="flex items-center gap-2 bg-red-800 self-end"
                    variant="destructive"
                  >
                    {t("arrayFieldWithTable.form.cancel")}
                  </TButton>
                )}
              </div>
            )}
            {derivedUnitsValues?.length > 1 && (
              <div className="flex justify-center mx-auto w-full">
                <ArrayFieldTable
                  type={type}
                  fields={FieldArray.fields?.slice(0, -1)}
                  onDelete={handleDeleteArrayField}
                  onEdit={handleTriggerEditArrayField}
                  onView={handleTriggerViewArrayField}
                  columnsPassed={columnsPassed}
                  readOnly={type === "view"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
// ⚠️ should component of field contain prop called"from"
