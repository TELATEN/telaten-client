import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/lib/http';
import type { MilestoneDetail, CreateMilestoneInput } from '@/types/entity';

export default function useCreateMilestones() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (milestones: CreateMilestoneInput[]) => {
      const response = await http().post<MilestoneDetail[]>('/milestones/', milestones);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
    },
  });
}
