"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [gmapsLink, setGmapsLink] = useState("");

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
          setName(data.data.name);
          setEmail(data.data.email);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="container mx-auto py-32">
      <form className="bg-gray-100 rounded-xl p-20">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <Image
              className="rounded-full"
              src={"/image/rendang.png"}
              width={200}
              height={300}
              alt="profile"
            />
            <div>
              <h1 className="font-bold text-xl mb-3">{name}</h1>
              <h1 className="font-semibold text-sm">{email}</h1>
            </div>
          </div>
          <button
            type="submit"
            className="rounded-lg bg-[#F7411B] text-white px-6 py-2"
          >
            Edit
          </button>
        </div>
        <div className="flex gap-5">
          <div className="w-1/2">
            <div>
              <p className="text-sm">Email</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your Email"
                className="w-full p-3 border mb-4 mt-2 rounded-lg"
              />
            </div>
            <div>
              <p className="text-sm">Full Name</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 border mb-4 mt-2 rounded-lg"
              />
            </div>
            <div>
              <p className="text-sm">Tanggal Lahir</p>
              <input
                type="date"
                placeholder="Enter your Birthdate"
                className="w-full p-3 border mb-4 mt-2 rounded-lg"
              />
            </div>
            <div>
              <p className="text-sm">Jenis Kelamin</p>
              <input
                type="text"
                placeholder="Laki-Laki/Perempuan"
                className="w-full p-3 border mt-2 rounded-lg"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div>
              <p className="text-sm">Nomor Telp</p>
              <input
                placeholder="ex: 0881234456"
                type="text"
                className="w-full p-3 border mb-4 mt-2 rounded-lg"
              />
            </div>
            <div>
              <p className="text-sm">Photo Profile</p>
              <input
                type="file"
                className="w-full p-3 border mt-2 mb-4 rounded-lg bg-white"
              />
            </div>
            <div>
              <p className="text-sm">Alamat</p>
              <input
                placeholder="Masukkan Detail Alamat"
                type="text"
                className="w-full p-3 border mt-2 mb-4 rounded-lg bg-white"
              />
            </div>
            <div>
              <p className="text-sm">Link Google Maps</p>
              <input
                placeholder="Masukkan Link yang didapat dari Google Maps"
                type="text"
                className="w-full p-3 border mt-2 rounded-lg bg-white"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
