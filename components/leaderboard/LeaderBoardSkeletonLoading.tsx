import { Skeleton } from "../ui/skeleton";

export default function LeaderBoardSkeletonLoading() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          className="grid grid-cols-10 bg-card border border-border items-center rounded-lg p-4"
          key={i}
        >
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="flex items-center gap-2 col-span-7">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 flex-1 min-w-0"></Skeleton>
          </div>
          <div></div>
          <Skeleton className="h-4 min-w-0"></Skeleton>
        </div>
      ))}{" "}
    </>
  );
}
