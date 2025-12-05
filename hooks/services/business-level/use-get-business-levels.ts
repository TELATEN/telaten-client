import { useAuthStore } from "@/hooks/stores/use-auth.store";
import { http } from "@/lib/http";
import { BusinessLevel } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetBusinessLevels() {
  const user = useAuthStore((state) => state.user);

  const queryFn = async (): Promise<BusinessLevel[]> => {
    const res = await http().get(
      user?.role == "admin" ? "/admin/business/levels" : "/business/levels"
    );
    return res.data as BusinessLevel[];
  };

  return useQuery({
    queryKey: ["get-business-levels"],
    queryFn,
  });
}
