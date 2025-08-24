// import { Separator } from "@/components/ui/separator";
// import { useTranslation } from "react-i18next";
// import NotificationItem from "./units/NotificationItem";
// import NoNotification from "./units/NoNotification";
// import Loading from "@/components/common/loading/Loading";
// import { NotificationsListProps } from "@/types/NotificationsTypes";
// import { useReadAllNotification } from "@/managers/notificationsManager/useNotificationsQuery";

// const NotificationsList = ({
//   notificationsList,
//   error,
//   isLoading,
// }: NotificationsListProps) => {
//   const { t } = useTranslation("navbar");
//   const { mutate, isPending } = useReadAllNotification();

//   if (isLoading) return <Loading className={"h-fit"} />;
//   if (notificationsList?.length === 0 || error) return <NoNotification />;
//   return (
//     <div className="py-3">
//       <div className="flex justify-between items-center px-4">
//         <h2 className="font-bold text-lg">{t("navbar.notifications.title")}</h2>
//         <p
//           className={`text-xs cursor-pointer hover:underline ${
//             isPending ? "cursor-not-allowed" : ""
//           }`}
//           onClick={() => !isPending && mutate()}
//         >
//           {t("navbar.notifications.markAll")}
//         </p>
//       </div>
//       <Separator className="mt-2 mb-1 w-full" />
//       <div className="flex flex-col divide-y divide-opacity-90 max-h-80 overflow-y-scroll px-2">
//         {notificationsList?.map((notification) => (
//           <NotificationItem
//             key={notification._id}
//             notification={notification}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
// export default NotificationsList;
