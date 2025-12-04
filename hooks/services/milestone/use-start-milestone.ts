import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/lib/http';
import type { MilestoneDetail } from '@/types/entity';

export default function useStartMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (milestoneId: string) => {
      const response = await http().post<MilestoneDetail>(`/milestones/${milestoneId}/start`);
      return response.data;
    },
    onSuccess: (_, milestoneId) => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
      queryClient.invalidateQueries({ queryKey: ['milestone', milestoneId] });
      queryClient.invalidateQueries({ queryKey: ['business-profile'] });
    },
  });
}
