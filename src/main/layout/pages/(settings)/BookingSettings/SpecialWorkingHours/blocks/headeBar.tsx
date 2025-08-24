import { UnitFormDialog } from "./dialogs/UnitFormDialog";

export default function HeadeBar({
  selectedBranch,
  refetch,
}: {
  selectedBranch?: { value: string | number };
  refetch?: () => void;
}) {
  return (
    <div
      className="px-6
     bg-white items-center h-appbar flex justify-end md:w-[calc((100%)-269px)] max-md:w-full absolute right-0 top-[80px] ms-sidebar"
    >
      {selectedBranch?.value && (
        <UnitFormDialog
          type={"add"}
          btn
          refetch={refetch}
          unit={{
            day: "",
            Closekey: "",
            Openkey: "",
            status: "",
          }}
          allDays={{ objId: selectedBranch?.value || "" }}
        />
      )}{" "}
    </div>
  );
}
