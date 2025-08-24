import { UnitFormDialog } from "./dialogs/UnitFormDialog";

export default function HeadeBar({ refetch }: any) {
  return (
    <div
      className="px-6
     bg-white items-center h-appbar flex justify-end md:w-[calc((100%)-269px)] max-md:w-full absolute right-0 top-[80px] ms-sidebar"
    >
      <UnitFormDialog refetch={refetch} type={"add"} btn />{" "}
    </div>
  );
}
