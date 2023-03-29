// import  { ReactNode } from "react";
import { useLocation } from "@remix-run/react";
import "tailwindcss/tailwind.css";

interface IndexLayoutProps {
  children: React.ReactNode;
}

export default function IndexLayout({ children }: IndexLayoutProps) {
  const location = useLocation();
  console.log(location);
  const isIndex = location.pathname === "/";
  console.log(isIndex);

  return (
    <div className={`bg-blue-500 min-h-screen ${isIndex ? "" : "hidden"}`}>
      {children}
    </div>
  );
}
