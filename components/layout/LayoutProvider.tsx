// Use the client directive for using usePathname hook.
"use client";

// Use usePathname for catching route name.
import { usePathname } from "next/navigation";
import Navbar from "../Navbar";
import Footer from "../Footer";

export const LayoutProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      {!isAuthPage && (
        <footer>
          <Footer />
        </footer>
      )}
    </>
  );
};
