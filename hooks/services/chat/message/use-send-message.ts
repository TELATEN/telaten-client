import { httpStream } from "@/lib/http";
import { ChatMessage, ChatSession, SendMessageParams } from "@/types";
import { useState } from "react";

export function useSendMessage() {
  const [message, setMessage] = useState<ChatMessage | null>();
  const [session, setSession] = useState<ChatSession | null>();
  const [isStreaming, setIsStreaming] = useState(false);

  const mutate = async (data: SendMessageParams) => {
    setIsStreaming(true);
    setSession(null);
    setMessage({
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      created_at: new Date(),
    });

    try {
      const response = await httpStream("/chat/completion", {
        body: JSON.stringify(data),
        method: "POST",
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines.filter((l) => l)) {
            try {
              const data = JSON.parse(line.replace("data: ", ""));
              switch (data.type) {
                case "session_created":
                  setSession({
                    id: data.data as string,
                    title: data.message,
                    business_id: "",
                    created_at: new Date(),
                  });
                  break;
                case "token":
                  setMessage(
                    (prev) =>
                      ({
                        ...prev,
                        content: (prev?.content || "") + data.data.text,
                      }) as ChatMessage
                  );
                  break;
                default:
                  //
                  break;
              }
            } catch (_) {
              // json broken
            }
          }
        }
      }
    } catch (err) {
      setMessage(
        (prev) =>
          ({
            ...prev,
            is_error: true,
            content:
              (err as Error | undefined)?.message || "Assistant gagal merespon",
          }) as ChatMessage
      );
    }

    setMessage({
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "Baik, saya mengerti. TELATEN akan membantu Anda dengan sabar!",
      created_at: new Date(),
    });

    setIsStreaming(false);
  };

  return {
    message,
    session,
    mutate,
    isStreaming,
  };
}
