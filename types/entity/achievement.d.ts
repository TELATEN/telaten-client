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

export interface CreateAchievement {
  title: string;
  description: string;
  description: string;
  required_points: string;
  badge_icon: string;
}

export interface UpdateAchievement extends CreateAchievement {
  id: string;
}
