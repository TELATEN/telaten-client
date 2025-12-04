import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/lib/http';
import type { MilestoneDetail, UpdateMilestoneInput } from '@/types/entity';

export default function useUpdateMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ milestoneId, data }: { milestoneId: string; data: UpdateMilestoneInput }) => {
      const response = await http().put<MilestoneDetail>(`/milestones/${milestoneId}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
      queryClient.invalidateQueries({ queryKey: ['milestone', variables.milestoneId] });
    },
  });
}
