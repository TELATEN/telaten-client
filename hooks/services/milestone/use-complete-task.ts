import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/lib/http';
import type { MilestoneTask } from '@/types/entity';
import type { Achievement } from '@/types/entity/achievement';

interface CompleteTaskResponse extends MilestoneTask {
  unlocked_achievement?: Achievement;
}

export default function useCompleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      const response = await http().post<CompleteTaskResponse>(`/milestones/tasks/${taskId}/complete`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
      queryClient.invalidateQueries({ queryKey: ['milestone'] });
      queryClient.invalidateQueries({ queryKey: ['business-profile'] });
      queryClient.invalidateQueries({ queryKey: ['get-achievements'] });
    },
  });
}
