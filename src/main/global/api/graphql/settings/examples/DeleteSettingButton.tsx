import { useDeleteSetting } from "../useSettingsQuery";

interface DeleteSettingButtonProps {
  id: string;
}

const DeleteSettingButton: React.FC<DeleteSettingButtonProps> = ({ id }) => {
  const { mutate: deleteSetting, isPending } = useDeleteSetting({
    onSuccess: () => {
      alert("Setting deleted successfully");
    },
    onError: (error) => {
      alert(`Error: ${error?.message}`);
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this setting?")) {
      deleteSetting({ id });
    }
  };

  return (
    <button onClick={handleDelete} disabled={isPending}>
      {isPending ? "Deleting..." : "Delete Setting"}
    </button>
  );
};

export default DeleteSettingButton;
