import { http } from "@/lib/http";
import { BusinessProfileResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useBusinessProfile() {
  const queryFn = async (): Promise<BusinessProfileResponse> => {
    const res = await http().get("/business/profile");
    return res.data as BusinessProfileResponse;
  };

  return useQuery({
    queryKey: ["business-profile"],
    queryFn,
  });
}
