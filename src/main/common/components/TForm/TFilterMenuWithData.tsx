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
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import { ListFilter } from "lucide-react";
import { useMemo, useState } from "react";

// Generic type for data and options
type Option = { value: string; label: string; icon?: React.ElementType };

interface TFilterMenuProps<T> {
  data: T[];
  field: keyof T;
  title: string;
  options: Option[];
  onFilterChange?: (filteredData: T[]) => void;
}

// Utility function to filter data based on selected values
function filterData<T>(data: T[], field: keyof T, selected: Set<string>): T[] {
  if (selected.size === 0) return data;
  return data.filter((item) => selected.has(String(item[field])));
}

export function TFilterMenuWithData<T>({
  data,
  field,
  title,
  options,
  onFilterChange,
}: TFilterMenuProps<T>) {
  const { t } = useTranslation("sharedTable");
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());

  const filteredData = useMemo(
    () => filterData(data, field, selectedValues),
    [data, field, selectedValues]
  );

  const handleOptionToggle = (value: string) => {
    setSelectedValues((prev) => {
      const updated = new Set(prev);
      updated.has(value) ? updated.delete(value) : updated.add(value);
      return updated;
    });
  };

  const handleClearFilters = () => setSelectedValues(new Set());

  // Trigger callback whenever filtered data changes
  useMemo(() => onFilterChange?.(filteredData), [filteredData, onFilterChange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <ListFilter className="me-2 h-4 w-4" />
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <SelectedBadges
                options={options}
                selectedValues={selectedValues}
              />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>{t("sharedTable.noResults")}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleOptionToggle(option.value)}
                >
                  <Checkmark isSelected={selectedValues.has(option.value)} />
                  {option.icon && (
                    <option.icon className="me-2 h-4 w-4 text-muted-foreground" />
                  )}
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClearFilters}
                    className="justify-center text-center"
                  >
                    {t("table.clearFilters")}
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Helper component to render selected badges
const SelectedBadges = ({
  options,
  selectedValues,
}: {
  options: Option[];
  selectedValues: Set<string>;
}) => (
  <div className="hidden space-x-1 lg:flex">
    {selectedValues.size > 2 ? (
      <Badge variant="secondary" className="rounded-sm px-1 font-normal">
        {selectedValues.size} selected
      </Badge>
    ) : (
      options
        .filter((option) => selectedValues.has(option.value))
        .map((option) => (
          <Badge
            key={option.value}
            variant="secondary"
            className="rounded-sm px-1 font-normal"
          >
            {option.label}
          </Badge>
        ))
    )}
  </div>
);

// Helper component to render the checkmark icon
const Checkmark = ({ isSelected }: { isSelected: boolean }) => (
  <div
    className={cn(
      "me-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
      isSelected
        ? "bg-primary text-primary-foreground"
        : "opacity-50 [&_svg]:invisible"
    )}
  >
    <CheckIcon className="h-4 w-4" />
  </div>
);
