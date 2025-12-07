"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

export default function AssistantInfoDialog({
  children,
  show,
  setShow,
}: {
  children: React.ReactNode;
  show: boolean;
  setShow: (val: boolean) => void;
}) {
  const informations = [
    {
      title: "Menampung Keluhan Pengguna",
      icon: "🤖",
      description:
        "Asisten ini dapat dipakai langsung untuk menyampaikan keluhan, menyediakan sarana evaluasi yang membantu menentukan prioritas dan milestone pengembangan berikutnya",
    },
    {
      title: "Mendukung Perintah Transaksional",
      icon: "💉",
      description:
        "Mampu menjalankan tugas transaksional berdasarkan instruksi pengguna, seperti penambahan transaksi, pengecekan status milestone, atau membuat task baru, dan perintah lainnya.",
    },
    {
      title: "Menyesuaikan Personality Bisnis",
      icon: "👤",
      description:
        "Dirancang untuk mengikuti karakter bisnis dan preferensi pengguna agar komunikasi terasa lebih alami dan relevan dengan identitas brand.",
    },
    {
      title: "Mendukung Pengembangan Berkelanjutan",
      icon: "🌟",
      description:
        "Setiap interaksi yang terjadi dapat dijadikan referensi peningkatan fitur, sehingga produk berkembang selaras dengan kebutuhan pengguna.",
    },
    {
      title: "Integrasi Fleksibel dengan Sistem yang Ada",
      icon: "🚥",
      soon: true,
      description:
        "Asisten dapat dihubungkan dengan berbagai sistem internal maupun eksternal untuk mendukung alur kerja yang sudah berjalan.",
    },
    {
      title: "Interaksi Multi-Platform",
      icon: "🌐",
      soon: true,
      description:
        "Dapat digunakan di berbagai kanal seperti web, aplikasi mobile, atau platform pesan instan agar pengguna bisa berinteraksi dari mana saja.",
    },
  ];

  const handleComplete = () => {
    localStorage.setItem("assistant_info_showed", "true");
    setShow(false);
  };

  useEffect(() => {
    const isShowed = localStorage.getItem("assistant_info_showed");

    if (!isShowed) {
      setShow(true);
    }
  }, []);

  return (
    <Dialog open={show}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <div>
          <DialogTitle>Assistant Adaptif</DialogTitle>
          <DialogDescription>
            Memperkenalkan{" "}
            <span className="underine text-primary">
              Asisten AI yang dapat beradaptasi
            </span>{" "}
            dengan kebutuhan bisnis Anda.
          </DialogDescription>
        </div>

        <div>
          <ul className="max-h-[60vh] overflow-y-auto list-disc">
            {informations.map((information, i) => {
              return (
                <li key={i} className="mb-4 list-disc">
                  <div className="flex items-end gap-2 mb-1">
                    <div className="text-xl">{information.icon}</div>
                    <span className="font-semibold text-sm mb-1">
                      {information.title}
                    </span>
                    {information.soon && (
                      <span className="text-sm text-muted-foreground">
                        (Sedang dalam pengembangan)
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {information.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleComplete}>Saya mengerti</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
