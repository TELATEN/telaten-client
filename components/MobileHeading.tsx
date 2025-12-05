import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface Props {
  title: string;
}

export default function MobileHeading({ title }: Props) {
  const router = useRouter();

  return (
    <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200/50 dark:border-gray-700/50 z-10 md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-semibold dark:text-white">{title}</h1>
        <div className="w-16" />
      </div>
    </div>
  );
}
