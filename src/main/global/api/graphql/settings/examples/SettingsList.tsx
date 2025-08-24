import { useGetAllSettings } from "../useSettingsQuery";

const SettingsList: React.FC = () => {
  const { data, isLoading, isError, error } = useGetAllSettings();

  if (isLoading) {
    return <div>Loading settings...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <h1>Settings</h1>
      <ul>
        {data?.settings.map((setting) => (
          <li key={setting.id}>
            {setting.name}: {setting.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsList;
