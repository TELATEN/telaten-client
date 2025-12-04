export type MilestoneStatus = 'pending' | 'in_progress' | 'completed';

export interface MilestoneTask {
  title: string;
  is_completed: boolean;
  order: number;
  reward_points: number;
  id: string;
  milestone_id: string;
  completed_at: string | null;
}

// Base milestone interface for list endpoint (without tasks)
export interface MilestoneBase {
  title: string;
  description: string;
  status: MilestoneStatus;
  order: number;
  is_generated: boolean;
  level: number;
  reward_points: number;
  id: string;
  business_id: string;
  created_at: string;
  updated_at: string;
  started_at: string | null;
  completed_at: string | null;
}

// Milestone list item (from GET /milestones)
export interface MilestoneListItem extends MilestoneBase {
  tasks?: never; // Explicitly no tasks in list
}

// Milestone detail (from GET /milestones/{id})
export interface MilestoneDetail extends MilestoneBase {
  tasks: MilestoneTask[];
}

// Union type for flexibility
export type Milestone = MilestoneBase & {
  tasks?: MilestoneTask[];
};

export interface CreateMilestoneInput {
  title: string;
  description: string;
  status?: MilestoneStatus;
  order: number;
  is_generated?: boolean;
  level?: number;
  reward_points?: number;
  tasks?: Omit<MilestoneTask, 'id' | 'milestone_id' | 'completed_at'>[];
}

export interface UpdateMilestoneInput {
  title?: string;
  description?: string;
  status?: string;
  order?: number;
  level?: number;
  reward_points?: number;
}
