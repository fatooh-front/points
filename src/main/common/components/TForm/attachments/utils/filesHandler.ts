export const pureNoTypeFileArray = (files: any) =>
  files.filter((file: any) => !(file instanceof File));
export const pureTypeFileArray = (files: any) =>
  files.filter((file: any) => file instanceof File);

export const isFile = (file: any) => file instanceof File;

export const renderFileSize = (size: number): string => {
  if (size < 1024) return `${size} bytes`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  if (size < 1024 * 1024 * 1024)
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

// File:
// {
// displayName: "Moloper.pdf"
// path: "Moloper.pdf"
// lastModified: 1730565219180
// lastModifiedDate: Sat Nov 02 2024 18:33:39 GMT+0200 (Eastern European Standard Time) {}
// name: "Moloper.pdf"
// size: 87463
// type: "application/pdf"
// webkitRelativePath: ""
// }
