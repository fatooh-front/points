import { useState } from "react";

export default function useMultiAccordionControl({
  defaultExpandedItems,
  items,
}: {
  defaultExpandedItems?: string[];
  items?: string[];
}) {
  const [expandedItems, setExpandedItems] = useState<string[]>(
    defaultExpandedItems ? defaultExpandedItems : []
  );

  const handleExpandAll = () => {
    setExpandedItems(items ? items : []);
  };

  const handleCollapseAll = () => {
    setExpandedItems([]);
  };

  const handleExpandReset = () => {
    setExpandedItems(defaultExpandedItems ? defaultExpandedItems : []);
  };

  return {
    expandedItems,
    setExpandedItems,
    handleExpandAll,
    handleCollapseAll,
    handleExpandReset,
  };
}
