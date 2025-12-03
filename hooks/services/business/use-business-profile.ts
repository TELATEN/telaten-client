import { http } from "@/lib/http";
import { BusinessProfileResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

interface UseBusinessProfileOptions {
  enabled?: boolean;
}

export default function useBusinessProfile(options?: UseBusinessProfileOptions) {
  const queryFn = async (): Promise<BusinessProfileResponse> => {
    const res = await http().get("/business/profile");
    return res.data as BusinessProfileResponse;
  };

  return useQuery({
    queryKey: ["business-profile"],
    queryFn,
    enabled: options?.enabled !== false, // Default to true if not specified
    retry: (failureCount, error: any) => {
      // Don't retry if 404 (business profile not found)
      if (error?.response?.status === 404) {
        return false;
      }
      // Retry other errors up to 2 times
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}
