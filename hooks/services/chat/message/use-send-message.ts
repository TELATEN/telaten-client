import { httpStream } from "@/lib/http";
import { ChatMessage, SendMessageParams } from "@/types";
import { useState } from "react";

export function useSendMessage() {
  const [message, setMessage] = useState<ChatMessage | null>();
  const [isStreaming, setIsStreaming] = useState(false);

  const mutate = async (data: SendMessageParams) => {
    setIsStreaming(true);

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
        console.log("chunk", chunk);
      }
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
    mutate,
    isStreaming,
  };
}
