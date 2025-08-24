// import { Trash } from "lucide-react";
// // import { useEffect } from "react";
// // import { useInView } from "react-intersection-observer";
// import { GetNotification } from "@/types/NotificationsTypes";
// import {
//   useDeleteNotification,
//   useReadNotification,
// } from "@/managers/notificationsManager/useNotificationsQuery";
// import { formatDateTime } from "@/utils/dateUtils";
// import { Link } from "react-router-dom";

// const NotificationItem = ({
//   notification,
// }: {
//   notification: GetNotification;
// }) => {
//   const { mutate, isPending } = useDeleteNotification(notification._id);
//   const { mutate: mutateRead, isPending: isPendingRead } = useReadNotification(
//     notification._id
//   );

//   return (
//     <Link
//       to={`/notifications?id=${notification._id}`}
//       className={`flex flex-col gap-1 justify-between  ease-in-out transition-all p-2  rounded-md hover:bg-slate-200 ${
//         notification.read ? "opacity-50" : ""
//       } ${isPending ? "cursor-not-allowed" : ""}`}
//       onClick={() => !isPendingRead && !notification?.read && mutateRead()}
//     >
//       <div className="flex flex-col gap-1">
//         <h3
//           className="text-start font-semibold leading-[1.3]"
//           title={notification.message}
//         >
//           {notification.message}
//         </h3>
//       </div>
//       <div className="flex items-center w-full justify-between">
//         <div className="text-xs text-gray-500">
//           {formatDateTime(notification?.created_at)}
//         </div>
//         <Trash
//           className={`text-primary-500 cursor-pointer shrink-0 ${
//             isPending ? "cursor-not-allowed" : ""
//           }`}
//           size={18}
//           onClick={() => !isPending && mutate()}
//         />
//       </div>
//     </Link>
//   );
// };
// export default NotificationItem;
