// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Bell } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import { useEffect, useState } from "react";

// import { socket } from "@/main/global/hooks/socket/useSocketConnection";
// import { useAuth } from "@/main/global/store/auth/useAuth";
// import { GetNotification } from '@/types/NotificationsTypes';
// import { useGetAllNotifications } from '@/managers/notificationsManager/useNotificationsQuery';
// import NotificationsList from './bLock/NotificationsList';

// function Notifications() {
//   const { i18n } = useTranslation("navbar");
//   const [notificationsList, setNotificationsList] = useState<GetNotification[]>(
//     []
//   );
//   const [unReadNum, setUnReadNum] = useState(0);

//   const { user } = useAuth();
//   const {
//     data: notifications,
//     isLoading,
//     error: errorNotifications,
//   } = useGetAllNotifications({ limit: Number.MAX_SAFE_INTEGER, to: user?.id });

//   useEffect(() => {
//     notifications && setNotificationsList(notifications?.data);
//   }, [notifications]);

//   useEffect(() => {
//     const unReadNum = notificationsList?.reduce(
//       (acc, element) => (element.read ? acc : acc + 1),
//       0
//     );
//     notificationsList && setUnReadNum(unReadNum);
//   }, [notificationsList]);

//   const { token } = useAuth();
//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("Connected to test server:", socket.id);
//     });

//     if (!token) return;
//     console.log("Socket connected", socket);
//     socket.on("notification", (data) => {
//       console.log("Received notification:", data);
//       setNotificationsList((prev) => [data, ...prev]);
//     });
//     return () => {
//       socket.off("notification");
//     };
//   }, [token, notificationsList]);

//   return (
//     <DropdownMenu dir={i18n.dir(i18n.language)}>
//       <DropdownMenuTrigger asChild className="outline-0">
//         <Button variant="link" className="p-0 relative outline-0">
//           {unReadNum > 0 && (
//             <span className="w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs absolute -top-1 -right-1 outline-0">
//               {unReadNum}
//             </span>
//           )}
//           <Bell className="h-5 w-5 text-gray-500" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="flex flex-col justify-center w-72 mx-20 p-0">
//         <NotificationsList
//           notificationsList={notificationsList}
//           error={errorNotifications}
//           isLoading={isLoading}
//         />
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// export default Notifications;
import icon from "./bLock/notification.svg";
export default function Notifications() {
  return (
    <>
      <img src={icon}></img>
    </>
  );
}
