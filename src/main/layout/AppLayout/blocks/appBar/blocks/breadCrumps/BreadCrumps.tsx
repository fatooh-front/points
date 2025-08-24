import React from "react";
import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BreadCrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const pathnameSegments = pathname.split("/").filter(Boolean);
  const { i18n } = useTranslation();
  const t = i18n.getResourceBundle(i18n.language, "navbar");

  return (
    <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap text-sm max-sm:hidden">
      {/* Home link */}
      <Link to="/" className="text-gray-600 flex items-center hover:underline">
        <Home className="h-4 w-4 me-2" />
        {t?.[`/`]}
      </Link>

      {pathnameSegments?.map((path, index) => (
        <div key={path}>
          {path.length <= 23 ? (
            <span className="mx-2 text-gray-500 dark:text-gray-300">/</span>
          ) : null}
          {path.length <= 23 ? (
            <Link to={`/${pathnameSegments.slice(0, index + 1).join("/")}`}>
              {t?.[`/${path}`] || path}
            </Link>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
