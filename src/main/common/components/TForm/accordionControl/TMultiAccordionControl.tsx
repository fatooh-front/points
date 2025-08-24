import { FoldVertical, UnfoldVertical } from "lucide-react";

type Props = {
  handleCollapseAll: () => void;
  handleExpandAll: () => void;
};

export function TMultiAccordionControl({
  handleCollapseAll,
  handleExpandAll,
}: Props) {
  return (
    <div className="flex gap-4 items-center w-fit">
      <FoldVertical
        className="shrink-0 w-7 h-7 text-primary cursor-pointer"
        onClick={() => handleCollapseAll()}
      />
      <UnfoldVertical
        className="shrink-0 w-7 h-7 text-primary cursor-pointer"
        onClick={() => handleExpandAll()}
      />
    </div>
  );
}
