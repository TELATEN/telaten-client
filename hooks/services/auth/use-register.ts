import { http } from "@/lib/http";
import { RegisterParams, User } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
  const mutationFn = async (params: RegisterParams): Promise<User> => {
    const res = await http().post("/auth/register", params);
    return res.data;
  };

  return useMutation({
    mutationKey: ["login"],
    mutationFn,
  });
}
