import { useGetBusinessLevels } from "@/hooks/services/business-level";
import { BusinessProfile } from "@/types";
import { Skeleton } from "../ui/skeleton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Check, X } from "lucide-react";

interface Props {
  businessProfile?: BusinessProfile;
}

export default function CurrentLevelLeaderBoard({ businessProfile }: Props) {
  const { data: levels = [], isLoading: loadingLevels } =
    useGetBusinessLevels();

  const sortedLevels = [...levels].sort(
    (a, b) => a.required_points - b.required_points
  );

  return (
    <>
      <div className="flex flex-row gap-4 overflow-x-auto pb-2 pt-2">
        {loadingLevels
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[72px]"
              >
                <Skeleton className="w-16 h-16"></Skeleton>
              </div>
            ))
          : sortedLevels.map((level) => (
              <HoverCard openDelay={400} key={level.id}>
                <HoverCardTrigger asChild>
                  <div className="flex flex-col items-center min-w-[72px] pl-2 cursor-pointer">
                    <div
                      className={`w-16 h-16 relative hover:scale-105 transition rounded-full flex items-center justify-center shadow text-center mb-2 ${level.required_points <= (businessProfile?.total_points || 0) ? `bg-card` : `bg-card`}`}
                    >
                      {level.required_points <=
                      (businessProfile?.total_points || 0) ? (
                        <>
                          <div className="absolute -right-0 -bottom-0 -left-0 -top-0 scale-105 border border-accent border-l-primary border-t-primary rounded-full"></div>
                          <div className="absolute right-0 bottom-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white">
                            <Check className="h-4 w-4"></Check>
                          </div>
                          <span className="text-3xl">{level.icon}</span>
                        </>
                      ) : (
                        <span className="text-3xl opacity-30">
                          {level.icon}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium truncate w-16 text-center text-foreground">
                      {level.name}
                    </span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 max-w-full flex items-center gap-4">
                  <div className="text-4xl">{level.icon}</div>
                  <div className="flex flex-col">
                    <h4 className="font-semibold">{level.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Poin dibutuhkan:{" "}
                      {level.required_points.toLocaleString("id-ID")}
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
      </div>

      {businessProfile &&
        sortedLevels.length > 0 &&
        (() => {
          const currentXP = businessProfile.total_points || 0;
          const nextLevelIdx = sortedLevels.findIndex(
            (lvl) => lvl.required_points > currentXP
          );

          const nextLevel = sortedLevels[nextLevelIdx];

          if (!nextLevel)
            return (
              <div className="mt-4 text-center text-green-500 font-semibold">
                Kamu sudah mencapai level tertinggi!
              </div>
            );

          const progress = (currentXP / nextLevel.required_points) * 100;

          return (
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium">
                  XP: {currentXP} / {nextLevel.required_points}
                </span>
                <span>
                  Menuju <b className="text-accent">{nextLevel.name}</b>
                </span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${progress}%`, minWidth: 8 }}
                  title={`XP menuju level berikutnya: ${currentXP} / ${nextLevel.required_points}`}
                />
              </div>
            </div>
          );
        })()}
    </>
  );
}
