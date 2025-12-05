import { http } from "@/lib/http";
import { BusinessLevel } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetBusinessLevels() {
  const queryFn = async (): Promise<BusinessLevel[]> => {
    const res = await http().get("/admin/business/levels");
    return res.data as BusinessLevel[];
  };

  return useQuery({
    queryKey: ["get-business-levels"],
    queryFn,
  });
}
