import { User } from "@/types";

interface Props {
  user?: User | null;
}

export default function UserAvatar({ user }: Props) {
  const titleName = () => {
    const names = (user?.name || "").split(" ");

    if (names.length > 1) {
      return names[0][0].toUpperCase() + names[1][0].toUpperCase();
    }

    return names[0].slice(0, 2) || "Te";
  };

  return (
    <div className="w-8 h-8 bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 text-white">
      {titleName()}
    </div>
  );
}
