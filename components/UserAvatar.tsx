import { User } from "@/types";

interface Props {
  user?: User | null;
}

export default function UserAvatar({ user }: Props) {
  return (
    <div className="w-8 h-8 bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 text-white">
      {user?.name.slice(0, 2).toUpperCase()}
    </div>
  );
}
