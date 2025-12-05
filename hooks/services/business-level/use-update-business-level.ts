import { http } from "@/lib/http";
import { BusinessLevel, UpdateCreateBusinessLevel } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateBusinessLevel() {
  const mutationFn = async (
    data: UpdateCreateBusinessLevel
  ): Promise<BusinessLevel> => {
    const { id, ...updateData } = data;
    const res = await http().put(`/admin/business/levels/${id}`, updateData);
    return res.data as BusinessLevel;
  };

  return useMutation({
    mutationKey: ["update-business-level"],
    mutationFn,
  });
}
