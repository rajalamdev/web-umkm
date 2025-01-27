"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { IoSearch, IoBagOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();

  const navLinks = [
    {
      name: "Categories",
      url: "/products",
    },
    {
      name: "Transaction",
      url: "/cart",
    },
  ];

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserName(data.data.name);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // When sign out, redirect to login page
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUserName(null);
    router.push("/login");
  };

  return (
    <div className="flex py-4 container mx-auto bg-transparent font-sans min-h-[70px] tracking-wide absolute z-50 left-0 right-0">
      <div className="flex flex-wrap items-center gap-4 w-full justify-between">
        {/* left */}
        <Link href="/">
          <h3 className="text-2xl font-extrabold">For UMKM</h3>
        </Link>

        {/* center */}
        <div
          className={`lg:!flex gap-10 items-center ${
            isSidebarOpen ? "block" : "max-lg:hidden"
          } max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50`}
        >
          <button
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </button>
          <label
            htmlFor="search"
            className="bg-[rgba(214,216,222,0.4)] cursor-pointer items-center px-4 rounded-lg hidden lg:flex w-72"
          >
            <div>
              <IoSearch className="text-muted-foreground" size={20} />
            </div>
            <Input
              className="border-none "
              type="text"
              placeholder="Search..."
              name="search"
              id="search"
            />
          </label>
          <div
            className={`lg:!flex lg:flex-auto max-lg:fixed max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 ${
              isSidebarOpen ? "block bg-white" : "max-lg:hidden bg-none"
            }`}
          >
            <ul className="lg:flex lg:gap-x-12 max-lg:space-y-2">
              {navLinks.map((link) => (
                <li key={link.name} className="max-lg:border-b max-lg:py-3">
                  <Link href={link.url} className="block font-semibold">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* right */}
        <div className="flex items-center space-x-6">
          <CartIcon />
          {userName ? (
            <div className="relative">
              <Button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="font-semibold"
              >
                {userName}
              </Button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <Button className="rounded-full py-5 px-8 hidden lg:flex">
                Sign in
              </Button>
            </Link>
          )}
          <button className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
