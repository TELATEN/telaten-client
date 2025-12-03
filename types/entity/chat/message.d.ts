export type ChatMessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  content: string;
  role: ChatMessageRole;
  created_at: string | Date;
  is_error?: boolean;
}
