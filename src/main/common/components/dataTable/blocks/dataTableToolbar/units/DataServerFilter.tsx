import { useEffect, useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslation } from "react-i18next";
import { GalleryVerticalEnd } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { statuses } from "../../../types/commonTableTypes";

interface DataServerFilterProps {
  title?: string;
  options: statuses;
  onSelectedValueChange?: (value: { [key: string]: string | null }) => void;
  // isSelectValue: any;
  setIsSelectedValue: any;
  name: string;
}

export function DataServerFilter({
  title,
  options,
  onSelectedValueChange,
  // isSelectValue,
  setIsSelectedValue,
  name,
}: DataServerFilterProps) {
  const { t } = useTranslation("sharedTable");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  let [searchParams, setSearchParams] = useSearchParams();
  console.log("optionwwwws", options);
  const valueSearchParams = searchParams.get("filter");

  // useEffect(() => {
  //   console.log("isSelectValue222", isSelectValue);
  //   if (!isSelectValue) {
  //     setSelectedValue(null);
  //     onSelectedValueChange && onSelectedValueChange({ [name]: null });
  //     updateSearchParams(name, null);
  //   }
  // }, [isSelectValue]);

  useEffect(() => {
    if (valueSearchParams) {
      const filters = parseFilterString(valueSearchParams);
      const currentFilterValue = filters[name] || null;
      setSelectedValue(currentFilterValue);
      onSelectedValueChange &&
        onSelectedValueChange({ [name]: currentFilterValue });
      setIsSelectedValue(!!currentFilterValue);
    } else {
      setSelectedValue(null);
      onSelectedValueChange && onSelectedValueChange({ [name]: null });
      setIsSelectedValue(false);
    }
  }, [valueSearchParams]);

  const handleOptionSelect = (optionValue: string) => {
    const newValue = selectedValue === optionValue ? null : optionValue;
    setSelectedValue(newValue);
    onSelectedValueChange && onSelectedValueChange({ [name]: newValue });
    setIsSelectedValue(!!newValue);
    updateSearchParams(name, newValue);
  };

  const updateSearchParams = (filterName: string, value: string | null) => {
    // Parse the existing filter query parameter
    const filters = parseFilterString(searchParams.get("filter") || "");
    if (value) {
      filters[filterName] = value; // Add or update the filter value
    } else {
      delete filters[filterName]; // Remove the filter if value is null
    }

    // Construct the updated filter string
    const updatedFilterString = createFilterString(filters);

    if (updatedFilterString) {
      searchParams.set("filter", updatedFilterString); // Update the filter parameter
    } else {
      searchParams.delete("filter"); // Remove the filter parameter if empty
    }

    // Update the URL while preserving other query parameters
    setSearchParams(searchParams);
  };

  const parseFilterString = (filterString: string): Record<string, string> => {
    return filterString.split("&").reduce((acc, pair) => {
      const [key, val] = pair.split(",");
      if (key && val) {
        acc[key] = val;
      }
      return acc;
    }, {} as Record<string, string>);
  };

  const createFilterString = (filters: Record<string, string>): string => {
    return Object.entries(filters)
      .map(([key, val]) => `${key},${val}`)
      .join("&");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 border-dashed"
        >
          <GalleryVerticalEnd className="me-2 h-4 w-4" />
          {title}
          {selectedValue && (
            <Badge
              variant="secondary"
              className="ms-2 rounded-sm px-1 font-normal text-white"
            >
              {options?.find((option) => option.value === selectedValue)?.label}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>{t("sharedTable.noResults")}</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => {
                const isSelected = selectedValue === option.value;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleOptionSelect(option.value)}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "me-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="me-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
