"use client";

import Loading from "@/components/loading";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/store/useAuth";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

export default function page() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState<string>("");
  const [gmapsLink, setGmapsLink] = useState("");
  const [photo, setPhoto] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const { toast } = useToast();

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
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
          setName(data.data.name || "");
          setUsername(data.data.username || "");
          setEmail(data.data.email || "");
          setPhone(data.data.phone || "");
          setBirthDate(data.data.birth_date || "");
          setAddress(data.data.address || "");
          setGender(data.data.gender || "");
          setGmapsLink(data.data.link_gmaps || "");
          setPhoto(data.data.photo_url || "");
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  async function editProfileHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            username: username,
            gender: gender === "" ? "Laki-Laki" : gender,
            birth_date: birthDate,
            phone,
            address: address,
            link_gmaps: gmapsLink,
            _method: "PATCH",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Failed to Update user profile");
      }

      toast({
        title: (
          <div className="flex items-center gap-2">
            <FaRegCheckCircle className="text-green-500 text-xl" />
            <span className="font-bold text-lg text-gray-800">
              Profile Berhasil Disimpan!
            </span>
          </div>
        ),
      });
    } catch (error) {
      console.error("Error Update user profile:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-32">
      <form
        onSubmit={editProfileHandler}
        className="bg-gray-100 rounded-xl p-10 w-full max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <Image
              className="rounded-full"
              src={"/pp-default.png"}
              width={200}
              height={300}
              alt="profile"
            />
            <div>
              <h1 className="font-bold text-xl mb-3">{name}</h1>
              <h1 className="font-semibold text-sm">{email}</h1>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center mb-4">
              <Loading /> {/* Komponen loading ditampilkan */}
            </div>
          ) : (
            <button
              type="submit"
              className="rounded-lg bg-[#F7411B] text-white px-6 py-2"
            >
              Save
            </button>
          )}
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
              <p className="text-sm">Username</p>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter your Username"
                className="w-full p-3 border mb-4 mt-2 rounded-lg"
              />
            </div>
            <div>
              <p className="text-sm">Tanggal Lahir</p>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full p-3 border mb-4 mt-2 rounded-lg"
              />
            </div>
            <div>
              <p className="text-sm">Jenis Kelamin</p>
              <select
                value={gender || ""}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 border mt-2 rounded-lg"
              >
                <option value="" disabled>
                  Pilih Jenis Kelamin
                </option>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
          </div>
          <div className="w-1/2">
            <div>
              <p className="text-sm">Nomor Telp</p>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Masukkan Detail Alamat"
                type="text"
                className="w-full p-3 border mt-2 mb-4 rounded-lg bg-white"
              />
            </div>
            <div>
              <p className="text-sm">Link Google Maps</p>
              <input
                value={gmapsLink}
                onChange={(e) => setGmapsLink(e.target.value)}
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
