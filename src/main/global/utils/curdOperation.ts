// Create
export const handleCreateFront = ({
  items,
  setItems,
  itemData,
}: {
  items?: any[];
  setItems?: any;
  itemData?: any;
}) => {
  if (!items || !setItems || !itemData) return;
  const newItem: any = {
    id: items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1,
    ...itemData,
  };
  setItems([...items, newItem]);
};

// Update
export const handleUpdateFront = ({
  id,
  items,
  setItems,
  itemData,
}: {
  id?: number | string;
  items?: any[];
  setItems?: any;
  itemData?: any;
}) => {
  if (!id || !items || !setItems || !itemData) return;
  setItems(
    items?.map((item) => (item.id === id ? { ...item, ...itemData } : item))
  );
};

// Delete
export const handleDeleteFront = ({
  id,
  items,
  setItems,
}: {
  id?: number | string;
  items?: any[];
  setItems?: any;
}) => {
  if (!id || !items || !setItems) return;
  setItems(items?.filter((item: any) => item.id !== id));
};
