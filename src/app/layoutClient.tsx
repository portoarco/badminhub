"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hiddenLayoutRoutes = ["/checkout", "/login", "/register"];
  const isHidden = hiddenLayoutRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!isHidden && <Navbar />}
      {children}
      {!isHidden && <Footer />}
    </>
  );
}
