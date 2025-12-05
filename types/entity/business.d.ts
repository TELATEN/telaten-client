export interface BusinessAddress {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface BusinessProfile {
  id: string;
  user_id: string;
  business_name: string;
  business_category: string;
  business_description: string;
  address: BusinessAddress;
  business_stage: string;
  target_market: string;
  primary_goal: string;
  total_points: number;
  level_name: string;
  level_icon?: string;
  created_at: string;
  updated_at: string;
}

export interface BusinessProfileResponse {
  business_name: string;
  business_category: string;
  business_description: string;
  address: BusinessAddress;
  business_stage: string;
  target_market: string;
  primary_goal: string;
  total_points: number;
  level_name: string;
  level_icon?: string;
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}
