import { useAuthStore } from "@/hooks/stores/use-auth.store";
import { http } from "@/lib/http";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useMe() {
  const updateUser = useAuthStore((state) => state.updateUser);

  const queryFn = async (): Promise<User> => {
    const res = await http().get("/auth/me");
    const user = res.data as User;

    updateUser(user);

    return user;
  };

  return useQuery({
    queryKey: ["me"],
    queryFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
