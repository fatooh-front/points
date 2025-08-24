// import dayjs from "dayjs";

// export const formatDateTime = (date: string | Date | null | undefined) => {
//   if (!date) return "";
//   const newDate = new Date(Number(date));
//   return dayjs(newDate).format("YYYY-MM-DD, h:mmA");
// };

// export const formatDate = (date: string | Date | null | undefined) => {
//   if (!date) return "";
//   // return date only
//   const newDate = new Date(Number(date));
//   return dayjs(newDate).format("YYYY-MM-DD");
// };

export function formatDate(
  inputDate: string | Date | null | undefined
): string {
  if (!inputDate) return "";
  const date = new Date(inputDate);
  const pad = (num: number) => num.toString().padStart(2, "0");
  return `${pad(date.getDate())}/${pad(
    date.getMonth() + 1
  )}/${date.getFullYear()}`;
}

export function formatDateTime(inputDate: string): string {
  const date = new Date(inputDate);
  const pad = (num: number) => num.toString().padStart(2, "0");
  const formattedDay = pad(date.getDate());
  const formattedMonth = pad(date.getMonth() + 1);
  const formattedHours = pad(date.getHours());
  const formattedMinutes = pad(date.getMinutes());
  const formattedYear = date.getFullYear();
  return `${formattedDay}/${formattedMonth}/${formattedYear} - ${formattedHours}:${formattedMinutes}`;
}

export const isNotFutureDate = (date: string) => {
  const val = new Date(date);
  // Check if the date is not in the future based on day

  const now = new Date();
  now.setDate(now.getDate() + 1);
  now.setHours(0, 0, 0, 0);
  return val < now;
};

export function getTime(inputDate: string | Date | null | undefined): string {
  if (!inputDate) return "";
  const date = new Date(inputDate);
  const pad = (num: number) => num.toString().padStart(2, "0");
  const formattedHours = pad(date.getHours());
  const formattedMinutes = pad(date.getMinutes());
  return `${formattedHours}:${formattedMinutes}`;
}

export function formatDateToISOString(date: Date | null | undefined): string {
  if (date) {
    return date.toISOString();
  } else {
    return "";
  }
}
// formate date ex: `202408101217` to `10/08/2024 - 12:17`
export const formatStringDate = (dateString: string) => {
  if (!dateString) return "";

  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);
  const hour = dateString.slice(8, 10);
  const minute = dateString.slice(10, 12);

  return `${day}/${month}/${year} - ${hour}:${minute}`;
};

export const formatToPanelNumberDate = (date: Date | undefined): string => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}:${hours}:${minutes}:${seconds}`;
};
