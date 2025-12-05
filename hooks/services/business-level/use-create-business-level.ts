import { http } from "@/lib/http";
import { BusinessLevel, CreateBusinessLevel } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateBusinessLevel() {
  const mutationFn = async (
    data: CreateBusinessLevel
  ): Promise<BusinessLevel> => {
    const res = await http().post("/admin/business/levels", data);
    return res.data as BusinessLevel;
  };

  return useMutation({
    mutationKey: ["create-business-level"],
    mutationFn,
  });
}
