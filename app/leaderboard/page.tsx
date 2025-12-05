"use client";

import useBusinessProfile from "@/hooks/services/business/use-business-profile";
import { BusinessAddress } from "@/types/entity/business";
import UserAvatar from "@/components/UserAvatar";
import Image from "next/image";
import { useAuthStore } from "@/hooks/stores/use-auth.store";
import { Globe, User } from "lucide-react";
import CurrentLevelLeaderBoard from "@/components/leaderboard/CurrentLevelLeaderBoard";
import { Button } from "@/components/ui/button";

const leaderboardData = [
  {
    name: "Ayu Pratiwi",
    email: "ayu@telaten.com",
    avatar: "https://ui-avatars.com/api/?name=Ayu+Pratiwi",
    experience: 1200,
  },
  {
    name: "Budi Santoso",
    email: "budi@telaten.com",
    avatar: "https://ui-avatars.com/api/?name=Budi+Santoso",
    experience: 950,
  },
  {
    name: "Citra Dewi",
    email: "citra@telaten.com",
    avatar: "https://ui-avatars.com/api/?name=Citra+Dewi",
    experience: 800,
  },
  {
    name: "Ayu Pratiwi",
    email: "ayu1@telaten.com",
    avatar: "https://ui-avatars.com/api/?name=Ayu+Pratiwi",
    experience: 1200,
  },
  {
    name: "Budi Santoso",
    email: "budi1@telaten.com",
    avatar: "https://ui-avatars.com/api/?name=Budi+Santoso",
    experience: 950,
  },
  {
    name: "Citra Dewi",
    email: "citra1@telaten.com",
    avatar: "https://ui-avatars.com/api/?name=Citra+Dewi",
    experience: 800,
  },
  {
    name: "Ayu Pratiwi",
    email: "ayu2@telaten.com",
    avatar: "https://ui-avatars.com/api/?name=Ayu+Pratiwi",
    experience: 1200,
  },
  {
    name: "Budi Santoso",
    email: "budi2@telaten.com",
    avatar: "https://ui-avatars.com/api/?name=Budi+Santoso",
    experience: 950,
  },
  {
    name: "Citra Dewi",
    email: "citra2@telaten.com",
    avatar: "https://ui-avatars.com/api/?name=Citra+Dewi",
    experience: 800,
  },
];

function formatAddress(address: BusinessAddress | undefined) {
  if (!address) return "-";
  const { street, city, state, zip_code, country } = address;
  return [street, city, state, zip_code, country].filter(Boolean).join(", ");
}

export default function LeaderboardPage() {
  const { data: businessProfile, isLoading: loadingProfile } =
    useBusinessProfile();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 min-h-screen space-y-5">
      <header className="mb-6 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">
                <Globe className="text-white" />
              </span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Leaderboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Kumpulkan pencapaian untuk naik level
              </p>
            </div>
          </div>
        </div>
      </header>

      <CurrentLevelLeaderBoard businessProfile={businessProfile} />

      <section className="pt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold mb-4">Leaderboard Pengalaman</h2>
          <Button type="button" size="sm">
            <User className="h-4 w-4 mr-3"></User>
            Skor saya
          </Button>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-10 bg-card rounded items-center py-2 font-semibold text-muted-foreground">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-7">Nama Pengusaha</div>
            <div className="text-right font-mono text-yellow-400">XP</div>
          </div>
          {leaderboardData.map((item, i) => {
            const isCurrentUser = user && item.email === "budi@telaten.com";
            return (
              <div
                className={`grid grid-cols-10 border border-border overflow-hidden bg-card rounded-lg relative items-center py-4 transition-all duration-300 ${isCurrentUser ? "ring-1 !ring-primary after:content-[''] after:!bg-gradient-to-br after:!from-primary/5 after:!to-accent/10 shadow-lg scale-[102%]" : ""} ${i < 3 ? "ring-1 after:content-[''] after:absolute after:top-0 after:right-0 after:left-0 after:bottom-0 after:bg-yellow-500/5 ring-yellow-400/60" : ""}`}
                key={item.email}
              >
                <div className="col-span-1 text-center">
                  {i + 1 <= 3 ? (
                    <Image
                      src={`/images/rank/${i + 1}.png`}
                      width={26}
                      height={26}
                      alt={(i + 1).toString()}
                      className="inline"
                    />
                  ) : (
                    (i + 1).toString()
                  )}
                </div>
                <div className="col-span-7">
                  <div className="flex items-center gap-2 truncate">
                    <UserAvatar user={item as any}></UserAvatar>
                    <div className="flex md:items-center md:flex-row md:gap-2 flex-col">
                      <div className="flex-1 min-w-0 truncate">
                        <span>{item.name}</span>
                        {isCurrentUser && (
                          <span className="ml-2 px-2 rounded-full text-xs font-bold bg-primary text-white">
                            Kamu
                          </span>
                        )}
                      </div>

                      <span className="text-xs text-muted-foreground">
                        Sate kelinci
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right font-semibold font-mono text-yellow-400">
                  {item.experience}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
