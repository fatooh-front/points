import { Link } from "react-router-dom";

export default function TLinkBtn({
  href,
  text,
  isRouterLink = false,
  ...props
}: {
  href: string;
  text: string;
  isRouterLink?: boolean;
  [key: string]: any;
}) {
  return (
    <>
      {isRouterLink && (
        <Link
          to={href}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          {...props}
        >
          {text}
        </Link>
      )}
      {!isRouterLink && (
        <a
          href={href}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          {...props}
        >
          {text}
        </a>
      )}
    </>
  );
}
