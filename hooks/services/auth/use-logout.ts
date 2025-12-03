import { http } from "@/lib/http";
import { ActionResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useLogout() {
  const mutationFn = async (): Promise<ActionResponse> => {
    const result = await http().post("/auth/logout");

    return result.data;
  };

  return useMutation({
    mutationKey: ["logout"],
    mutationFn,
  });
}
