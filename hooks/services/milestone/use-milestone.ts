import { useQuery } from '@tanstack/react-query';
import { http } from '@/lib/http';
import type { MilestoneDetail } from '@/types/entity';

export default function useMilestone(milestoneId: string | null) {
  return useQuery({
    queryKey: ['milestone', milestoneId],
    queryFn: async () => {
      if (!milestoneId) throw new Error('Milestone ID is required');
      const response = await http().get<MilestoneDetail>(`/milestones/${milestoneId}`);
      return response.data;
    },
    enabled: !!milestoneId,
  });
}
