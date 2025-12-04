import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/lib/http';
import type { MilestoneTask } from '@/types/entity';

export default function useCompleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      const response = await http().post<MilestoneTask>(`/milestones/tasks/${taskId}/complete`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
      queryClient.invalidateQueries({ queryKey: ['milestone'] });
      queryClient.invalidateQueries({ queryKey: ['business-profile'] });
    },
  });
}
