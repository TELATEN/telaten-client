import { http } from "@/lib/http";
import { LoginParams, LoginResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
  const mutationFn = async (params: LoginParams): Promise<LoginResponse> => {
    await new Promise((res) => setTimeout(() => res(true), 1500));

    const res = await http().post("/login", params);
    return res.data;
  };

  return useMutation({
    mutationKey: ["login"],
    mutationFn,
  });
}
