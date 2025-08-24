import { Link } from "react-router-dom";

type TlinkBelowField = {
  href: string;
  label: string;
};

export default function TlinkBelowField({ href, label }: TlinkBelowField) {
  return (
    <Link to={href} className="text-xs text-gray-500 hover:underline">
      {label}
    </Link>
  );
}
