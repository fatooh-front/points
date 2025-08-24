import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface UseInternetConnectionReturn {
  isOnline: boolean;
  connectionType: "online" | "offline";
}

export const useInternetConnection = (): UseInternetConnectionReturn => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const { t } = useTranslation("internetConnection");

  useEffect(() => {
    // Handle online event
    const handleOnline = () => {
      setIsOnline(true);
      toast({ title: t("online") });
    };

    // Handle offline event
    const handleOffline = () => {
      setIsOnline(false);
      toast({ title: t("offline") });
    };

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return {
    isOnline,
    connectionType: isOnline ? "online" : "offline",
  };
};
