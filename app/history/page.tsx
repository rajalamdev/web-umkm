"use client";

import Image from "next/image";
import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";
import { FaRegComments } from "react-icons/fa";

export default function History() {
  return (
    <div className="container mx-auto py-32">
      <div>
        <h3 className="font-bold text-2xl mb-4">Riwayat Pembelian</h3>
        <hr />
        <div className="rounded-lg border border-gray-200 mt-5">
          <div className="bg-[#F7411B] rounded-t-lg">
            <h4 className="text-white font-semibold px-5 py-8 text-xl">
              Pesanan Selesai
            </h4>
          </div>
          <div className="px-5">
            <div className="text-[#0080A4] flex items-center gap-2 font-semibold">
              <p className="mt-4 mb-2">Info Pengiriman</p>
              <IoIosArrowUp />
            </div>
            <div className="flex items-center">
              <p className="font-semibold">Sicepat : </p>
              <p className="text-sm">RESI</p>
            </div>
            <p className="text-sm">Pesanan Telah Tiba di Tujuan</p>
            <p className="text-[#0080A4] font-semibold mt-4 mb-2">
              Alamat Pengiriman
            </p>
            <div className="flex items-center gap-3">
              <LuMapPin className="text-lg text-[#D85B53]" />
              <p className="font-semibold text-sm">Jalan Ciampelas</p>
            </div>
            <div className="flex items-center gap-3 text-sm mb-5">
              <p>Nama</p>
              <p>No.hp</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 my-7">
          <Image
            src={"/image/products/coach.png"}
            alt="Catalogue-pana.svg"
            width={200}
            height={200}
            className="rounded-lg"
          />
          <div>
            <p className="font-semibold">Tas Coach Swift</p>
            <p className="text-[#606061] text-sm">Coklat, XXL</p>
          </div>
        </div>
        <div className="flex items-center md:justify-end text-2xl font-semibold my-5">
          <p>Total Pesanan : </p>
          <p>Rp160.000</p>
        </div>
        <div className="flex justify-between">
          <div>
            <button className="flex items-center gap-3">
              <FaRegComments className="text-2xl text-[#D85B53]" />
              <p>Hubungi Penjual</p>
            </button>
            <button className="flex items-center gap-3">
              <FaRegComments className="text-2xl text-[#D85B53]" />
              <p>Return Barang</p>
            </button>
            <button className="flex items-center gap-3">
              <FaRegComments className="text-2xl text-[#D85B53]" />
              <p>Pusat Bantuan</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
