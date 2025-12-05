"use client";

import useBusinessProfile from "@/hooks/services/business/use-business-profile";
import UserAvatar from "@/components/UserAvatar";
import Image from "next/image";
import { Globe, User } from "lucide-react";
import CurrentLevelLeaderBoard from "@/components/leaderboard/CurrentLevelLeaderBoard";
import { Button } from "@/components/ui/button";
import useLeaderboard from "@/hooks/services/leaderboard/use-leaderboard";
import LeaderBoardSkeletonLoading from "@/components/leaderboard/LeaderBoardSkeletonLoading";

export default function LeaderboardPage() {
  const { data: businessProfile, isLoading: loadingProfile } =
    useBusinessProfile();
  const { data: leaderboardData = [], isLoading: loadingLeaderboard } =
    useLeaderboard();

  const scrollToMe = () => {
    const element = document.getElementById("me");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
          <Button type="button" size="sm" onClick={scrollToMe}>
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
          {loadingLeaderboard ? (
            <LeaderBoardSkeletonLoading />
          ) : (
            leaderboardData.map((item, i) => {
              const isCurrentUser = item.is_current_user;
              return (
                <div key={item.business_id}>
                  {i > 0 && item.rank - leaderboardData[i - 1].rank > 1 && (
                    <div className="flex justify-center items-center gap-1 py-4 pb-8">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <div
                          key={j}
                          className="rounded-full h-1.5 w-1.5 bg-foreground"
                        ></div>
                      ))}
                    </div>
                  )}
                  <div
                    className={`grid grid-cols-10 border border-border overflow-hidden bg-card rounded-lg relative items-center py-4 hover:scale-105 transition-all duration-300 after:content-[''] after:absolute after:top-0 after:right-0 after:left-0 after:bottom-0  ${isCurrentUser ? "ring-1 !ring-primary after:!bg-gradient-to-br after:!from-primary/5 after:!to-accent/10 shadow-lg scale-[102%]" : ""} ${i < 3 ? "ring-1 after:bg-yellow-500/5 ring-yellow-400/60" : ""}`}
                    id={isCurrentUser ? "me" : ""}
                  >
                    <div className="col-span-1 text-center">
                      {item.rank <= 3 ? (
                        <Image
                          src={`/images/rank/${item.rank}.png`}
                          width={26}
                          height={26}
                          alt={item.rank.toString()}
                          className="inline"
                        />
                      ) : (
                        item.rank.toString()
                      )}
                    </div>
                    <div className="col-span-7">
                      <div className="flex items-center gap-2 truncate">
                        <UserAvatar
                          user={{ name: item.user_name } as any}
                        ></UserAvatar>
                        <div className="flex md:items-center md:flex-row md:gap-2 flex-col">
                          <div className="flex-1 min-w-0 truncate">
                            <span>{item.business_name}</span>
                            {isCurrentUser && (
                              <span className="ml-2 px-2 rounded-full text-xs font-bold bg-primary text-white">
                                Kamu
                              </span>
                            )}
                          </div>

                          <span className="text-xs text-muted-foreground">
                            {item.level_name}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right font-semibold font-mono text-yellow-400">
                      {item.total_points}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
