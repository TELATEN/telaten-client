import { User as Auth } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Globe, Home, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/stores/use-auth.store";

interface Props {
  children?: React.ReactNode;
}

export default function NavProfile({ children }: Props) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    // logout logic here
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children || (
          <Avatar>
            <AvatarFallback>
              {user?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/profil"
            className="flex items-center gap-2 cursor-pointer"
          >
            <User className="w-4 h-4" />
            <span>Profil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Globe className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
