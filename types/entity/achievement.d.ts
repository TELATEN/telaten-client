export interface Achievement {
  id: string;
  title: string;
  description: string;
  required_points: number;
  badge_icon: string;
  is_unlocked?: boolean | null;
  created_at: string | Date | null;
  unlocked_at?: string | Date | null;
}
