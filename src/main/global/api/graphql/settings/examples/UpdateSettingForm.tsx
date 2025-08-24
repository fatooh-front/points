import React, { useState } from "react";

import { useUpdateSetting } from "../useSettingsQuery";

interface UpdateSettingFormProps {
  id: string;
  initialName: string;
  initialValue: string;
}

const UpdateSettingForm: React.FC<UpdateSettingFormProps> = ({ id, initialName, initialValue }) => {
  const [name, setName] = useState(initialName);
  const [value, setValue] = useState(initialValue);
  const { mutate: updateSetting, isPending } = useUpdateSetting({
    onSuccess: () => {
      alert("Setting updated successfully");
    },

    onError: (error) => {
      alert(`Error: ${error?.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSetting({ id, name, value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Value:</label>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} required />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update Setting"}
      </button>
    </form>
  );
};

export default UpdateSettingForm;
