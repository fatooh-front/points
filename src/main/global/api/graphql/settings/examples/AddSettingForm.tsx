import { useState } from "react";

import { useAddSetting } from "../useSettingsQuery";

const AddSettingForm: React.FC = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const { mutate: addSetting, isPending } = useAddSetting({
    onSuccess: () => {
      alert("Setting added successfully");
      setName("");
      setValue("");
    },
    onError: (error) => {
      alert(`Error: ${error?.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSetting({ name, value });
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
        {isPending ? "Adding..." : "Add Setting"}
      </button>
    </form>
  );
};

export default AddSettingForm;
