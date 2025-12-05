export interface Leaderboard {
  rank: number;
  business_id: string;
  business_name: string;
  total_points: number;
  level_name: string;
  achievements_count: number;
  user_id: string;
  user_name: string;
  is_current_user: boolean;
}
