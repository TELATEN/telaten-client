import { useQuery } from '@tanstack/react-query';
import { http } from '@/lib/http';
import type { MilestoneListItem } from '@/types/entity';

export default function useMilestones() {
  return useQuery({
    queryKey: ['milestones'],
    queryFn: async () => {
      const response = await http().get<MilestoneListItem[]>('/milestones/');
      return response.data;
    },
  });
}
