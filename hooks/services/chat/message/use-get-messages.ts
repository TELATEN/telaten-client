import { http } from "@/lib/http";
import { ChatMessage } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetChatMessages(sessionId?: string) {
  const queryFn = async (): Promise<ChatMessage[]> => {
    const res = await http().get(`/chat/sessions/${sessionId}`);

    return res.data;
  };

  return useQuery({
    queryKey: ["get-chat-messages", sessionId],
    queryFn,
    enabled: !!sessionId,
    staleTime: 0,
    refetchOnMount: false,
  });
}
