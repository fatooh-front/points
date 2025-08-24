import Select, { MultiValue } from "react-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { useState } from "react";
// import UserManager, { User } from "@/managers/users-manager";
import { useTranslation } from "react-i18next";
// import { useAuth } from "@/store/useAuth";

interface DataTableTasksFilterProps<TData> {
  table: Table<TData>;
}

export function DataTableAdvancedFilter<TData>({
  table,
}: DataTableTasksFilterProps<TData>) {
  // const { token } = useAuth();
  // const [users, setUsers] = useState<User[]>([]);
  type Option = {
    label?: any;
    value?: any;
  };
  const [assignValue, setAssignValue] = useState<MultiValue<Option>>([]);
  const [reviewValue, setReviewValue] = useState<MultiValue<Option>>([]);

  const { t } = useTranslation("sharedTable");

  const [startDate, setStartDate] = useState<Date | undefined | null>(
    undefined
  );
  const [dueDate, setDueDate] = useState<Date | undefined | null>(undefined);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const fetchedUsers = await UserManager.getAllUsers(token as string);
  //     setUsers(fetchedUsers.data);
  //   };
  //   fetchUsers();
  // }, [token]);

  // const peopleOptions = users.map((user) => ({
  //   value: user._id,
  //   label: user.name,
  // }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const assignees = assignValue.map((val) => val.value);
    const reviewers = reviewValue.map((val) => val.value);

    const assigneeColumn = table.getColumn("assigned");
    const reviewerColumn = table.getColumn("reviewer");
    const startDateColumn = table.getColumn("start_date");
    const dueDateColumn = table.getColumn("due_date");

    assigneeColumn?.setFilterValue(assignees.length ? assignees : undefined);
    reviewerColumn?.setFilterValue(reviewers.length ? reviewers : undefined);
    startDateColumn?.setFilterValue(startDate ?? undefined);
    dueDateColumn?.setFilterValue(dueDate ?? undefined);
  };

  const resetFilters = () => {
    setAssignValue([]);
    setReviewValue([]);
    setStartDate(undefined);
    setDueDate(undefined);
    table.resetColumnFilters();
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 lg:flex"
        >
          <MixerHorizontalIcon className="me-2 h-4 w-4" />
          {t("table.toolbar.advancedFilters")}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-2">
              <div className="field">
                <Label htmlFor="assignees" className="pt-2 text-xs">
                  {t("tasks.table.advancedFilters.assignedTo")}
                </Label>
                <div>
                  <Select
                    onChange={(val) => setAssignValue(val)}
                    closeMenuOnSelect={false}
                    isMulti
                    value={assignValue}
                    placeholder={t(
                      "tasks.table.advancedFilters.assignedTo.placeholder"
                    )}
                    name="assignees"
                    // options={peopleOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    classNames={{
                      placeholder: () => "text-sm",
                      menu: () => "text-xs",
                      multiValueLabel: () => "bg-slate-200",
                      multiValueRemove: () => "bg-slate-200",
                    }}
                  />
                </div>
              </div>
              <div className="field">
                <Label htmlFor="reviewers" className="pt-3 text-xs">
                  {t("tasks.table.advancedFilters.reviewedBy")}
                </Label>
                <div>
                  <Select
                    onChange={(val) => setReviewValue(val)}
                    closeMenuOnSelect={false}
                    isMulti
                    placeholder={t(
                      "tasks.table.advancedFilters.reviewedBy.placeholder"
                    )}
                    name="reviewers"
                    value={reviewValue}
                    // options={peopleOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    classNames={{
                      placeholder: () => "text-sm",
                      menu: () => "text-xs",
                      multiValueLabel: () => "bg-slate-200",
                      multiValueRemove: () => "bg-slate-200",
                    }}
                  />
                </div>
              </div>
              <div className="field">
                <Label htmlFor="start-date" className="pt-2 text-xs">
                  {t("tasks.table.advancedFilters.startDate")}
                </Label>
                <div>
                  <Input
                    id="start-date"
                    name="start-date"
                    type="date"
                    // value={startDate as Date}
                    onChange={(e: any) => {
                      setStartDate(new Date(e?.target?.value));
                    }}
                  />
                </div>
              </div>
              <div className="field">
                <Label htmlFor="due-date" className="pt-2 text-xs">
                  {t("tasks.table.advancedFilters.dueDate")}
                </Label>
                <div>
                  <Input
                    id="due-date"
                    name="due-date"
                    type="date"
                    // value={dueDate as Date}
                    onChange={(e) => {
                      setDueDate(new Date(e.target.value));
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={resetFilters}
                  className="h-8 px-2 lg:px-3"
                >
                  {t("tasks.table.advancedFilters.reset")}
                </Button>
                <Button type="button" className="mt-2 justify-self-end">
                  {t("tasks.table.advancedFilters.apply")}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
