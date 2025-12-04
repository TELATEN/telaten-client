import { useMutation } from '@tanstack/react-query';
import { http } from '@/lib/http';

interface BusinessAddress {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

interface CreateBusinessProfilePayload {
  business_name: string;
  business_category: string;
  business_description: string;
  address: BusinessAddress;
  business_stage: string;
  target_market: string;
  primary_goal: string;
}

interface BusinessProfileResponse {
  id: string;
  user_id: string;
  business_name: string;
  business_category: string;
  business_description: string;
  address: BusinessAddress;
  business_stage: string;
  target_market: string;
  primary_goal: string;
  created_at: string;
  updated_at: string;
}

const createBusinessProfile = async (
  payload: CreateBusinessProfilePayload
): Promise<BusinessProfileResponse> => {
  console.log("[CREATE_BUSINESS] Sending request with payload:", payload);
  const httpClient = http();
  console.log("[CREATE_BUSINESS] HTTP client headers:", httpClient.defaults.headers);
  const response = await httpClient.post<BusinessProfileResponse>('/business/profile', payload);
  console.log("[CREATE_BUSINESS] Response received:", response.data);
  return response.data;
};

export default function useCreateBusinessProfile() {
  return useMutation({
    mutationFn: createBusinessProfile,
  });
}
