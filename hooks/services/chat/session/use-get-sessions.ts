import { http } from "@/lib/http";
import { ChatSession } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetChatSessions() {
  const queryFn = async (): Promise<ChatSession[]> => {
    const res = await http().get("/chat/sessions");

    return res.data;
  };

  return useQuery({
    queryKey: ["get-chat-sessions"],
    queryFn,
  });
}
