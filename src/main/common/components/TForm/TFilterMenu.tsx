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
import { useState } from "react";

// Option type definition
type Option = { value: string; label: string; icon?: React.ElementType };

interface TFilterMenuProps {
  title: string;
  options: Option[];
  onSelectionChange: (selected: string[]) => void;
  singleSelect?: boolean; // New prop to toggle between single and multi-select
}

export function TFilterMenu({
  title,
  options,
  onSelectionChange,
  singleSelect = false, // Default to multi-select if not specified
}: TFilterMenuProps) {
  const { t } = useTranslation("sharedTable");
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());

  const handleOptionToggle = (value: string) => {
    setSelectedValues((prev) => {
      let updated: Set<string>;

      if (singleSelect) {
        // If single select, only keep the current value
        updated = new Set([value]);
      } else {
        // Toggle selection for multi-select behavior
        updated = new Set(prev);
        updated.has(value) ? updated.delete(value) : updated.add(value);
      }

      onSelectionChange(Array.from(updated)); // Notify parent of changes
      return updated;
    });
  };

  const handleClearFilters = () => {
    setSelectedValues(new Set());
    onSelectionChange([]); // Reset selection
  };

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
      <Badge
        variant="secondary"
        className="rounded-sm px-1 font-normal text-white"
      >
        {selectedValues.size} selected
      </Badge>
    ) : (
      options
        .filter((option) => selectedValues.has(option.value))
        .map((option) => (
          <Badge
            key={option.value}
            variant="secondary"
            className="rounded-sm px-1 font-normal text-white"
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
