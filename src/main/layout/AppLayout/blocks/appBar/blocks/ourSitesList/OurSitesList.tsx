import useSettingsStore from "@/main/global/store/settings/useSettingsStore";
import { Grip } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function OurSitesList() {
  const [openModelSites, setOpenModelSites] = useState(false);

  const appData = useSettingsStore((store) => store.settings);
  const { i18n, t } = useTranslation("licenses");
  // const ourSitesData = [
  //   {
  //     _id: "site-1",
  //     logo: "/images/sanad-logo.svg",
  //     portalLink: "",
  //     name: "سند",
  //   },
  //   {
  //     _id: "site-2",
  //     logo: "/images/rafiq-logo.svg",
  //     portalLink: "",
  //     name: "فريق",
  //   },
  //   {
  //     _id: "site-3",
  //     logo: "/images/taiseer-logo.svg",
  //     portalLink: "",
  //     name: "تيسير",
  //   },
  //   {
  //     _id: "site-4",
  //     logo: "/images/flow-logo.svg",
  //     portalLink: "",
  //     name: "تدفق",
  //   },
  //   {
  //     _id: "site-5",
  //     logo: "/images/injaz-logo.svg",
  //     portalLink: "",
  //     name: "انجز",
  //   },
  // ];

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setOpenModelSites(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);

  return (
    <div ref={divRef} className="relative">
      <Grip
        color="#6b7280"
        role="button"
        className="cursor-pointer"
        onClick={() => setOpenModelSites((isOpen) => !isOpen)}
      />
      {openModelSites && (
        <div
          className={`flex flex-wrap justify-between gap-x-3 gap-y-5 w-[280px] md:w-[400px] py-5 absolute z-50 bg-white transform ${
            i18n.language === "ar" ? "-translate-x-[60%]" : "translate-x-[80%]"
          } md:translate-x-0 top-10 md:top-7 end-1/2 md:end-0 rounded-lg border-solid border-green-300 border-4`}
        >
          {Array.isArray(appData) &&
            appData?.map((data: any) => (
              <a
                key={data?._id}
                href={data?.portalLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col place-items-center py-0.5 text-base text-black w-[120px] text-center"
              >
                <img
                  alt={data?.name}
                  loading="lazy"
                  src={data?.logo}
                  className="self-center aspect-[0.98] w-[41px] rounded-md"
                />
                <p className="mt-1">{t(data?.name)}</p>
              </a>
            ))}
        </div>
      )}
    </div>
  );
}
