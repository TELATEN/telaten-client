export interface BusinessLevel {
  id: string;
  name: string;
  required_points: number;
  icon: string;
  created_at: string | Date;
}

export interface CreateBusinessLevel {
  name: string;
  required_points: number;
  icon: string;
}

export interface UpdateCreateBusinessLevel extends CreateBusinessLevel {
  id: string;
}
