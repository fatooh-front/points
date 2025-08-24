import { useGetSetting } from "../useSettingsQuery";

interface SettingDetailProps {
  id: string;
}

const SettingDetail: React.FC<SettingDetailProps> = ({ id }) => {
  const { data, isLoading, isError, error } = useGetSetting(id);

  if (isLoading) {
    return <div>Loading setting...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <h2>Setting Details</h2>
      {data?.setting ? (
        <div>
          <strong>{data.setting.name}:</strong> {data.setting.value}
        </div>
      ) : (
        <div>No setting found</div>
      )}
    </div>
  );
};

export default SettingDetail;
