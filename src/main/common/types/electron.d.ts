// global.d.ts
type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
};

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemoryGB: number;
};
type EventPayLoadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
};

interface Window {
  electron: {
    getStaticData: () => Promise<StaticData>;
    subscribeStatistics: (callback: (statistics: any) => void) => void;
  }; // or a more specific type if you have one for electron
}
