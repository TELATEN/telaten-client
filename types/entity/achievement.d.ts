export interface Achievement {
  id: string;
  title: string;
  description: string;
  required_points: number;
  badge_icon: string;
  is_unlocked?: boolean;
  created_at: string | Date;
}
