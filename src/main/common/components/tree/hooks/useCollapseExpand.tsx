import { useStateCallback } from "@/main/common/hooks/stateCallBack/useStateCallBack";

export default function useCollapseExpand() {
  const [collapseAll, setCollapseAll] = useStateCallback(false);
  const [expandAll, setExpandAll] = useStateCallback(false);
  const collapseAllAccounts = () => {
    setCollapseAll(true, () => {
      setCollapseAll(false);
    });
  };

  const expandAllAccounts = () => {
    setExpandAll(true, () => {
      setExpandAll(false);
    });
  };

  return {
    collapseAllAccounts,
    expandAllAccounts,
    collapseAll,
    expandAll,
  };
}
