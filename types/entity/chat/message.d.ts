export type ChatMessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  content: string;
  role: string;
  created_at: string;
  is_error?: boolean;
}
