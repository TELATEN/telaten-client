import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function FinancialSummarySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="p-4">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-32 mb-1" />
          <Skeleton className="h-3 w-20" />
        </Card>
      ))}
    </div>
  );
}

export function TransactionListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <div className="flex-1">
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="text-right">
              <Skeleton className="h-6 w-24 mb-1" />
              <Skeleton className="h-3 w-16 ml-auto" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
