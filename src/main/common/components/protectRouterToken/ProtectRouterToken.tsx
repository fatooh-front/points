import useAddDirLangHTML from "@/main/global/hooks/addDirLangHTML/useAddDirLangHTML";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function ProtectRouterToken() {
  useAddDirLangHTML();

  const token = true;
  const [mount, setMount] = useState(false);
  useEffect(() => {
    if (token) {
      location.replace("/");
    }
    setMount(true);
  }, [token]);

  return mount && <Outlet />;
}
