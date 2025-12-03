import { User as Auth } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LogOut, User } from "lucide-react";

interface Props {
  user: Auth;
}

export default function NavProfile({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <User className="h-4 w-4 mr-2"></User> Profil
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">
          <LogOut className="h-4 w-4 mr-2"></LogOut> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
