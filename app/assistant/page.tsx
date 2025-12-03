"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Sparkles,
  MessageSquare,
  ArrowLeft,
  History,
} from "lucide-react";
import CollapseChatSessionPanel from "@/components/chat/CollapseChatSessionPanel";
import { ChatMessage, ChatSession } from "@/types";
import Spinner from "@/components/Spinner";
import useGetChatMessages from "@/hooks/services/chat/message/use-get-messages";
import { useSendMessage } from "@/hooks/services/chat/message/use-send-message";

export default function AssistantPage() {
  const router = useRouter();

  const [messageInput, setMessageInput] = useState("");
  const [showSession, setShowSession] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>();
  const [isChatLoading, setIsChatLoading] = useState(false);

  const {
    data: chatMessages,
    refetch: reloadMessages,
    isLoading,
  } = useGetChatMessages(selectedSession?.id);

  const {
    mutate: sendMessage,
    message: assistantMessage,
    isStreaming,
  } = useSendMessage();

  const handleSendMessage = async () => {
    if (messageInput.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: messageInput,
        created_at: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);
      setIsChatLoading(true);

      await sendMessage({
        content: messageInput,
        session_id: selectedSession?.id,
      });

      setMessageInput("");
      setIsChatLoading(false);
    }
  };

  useEffect(() => {
    if (chatMessages && chatMessages.length > 0) {
      setMessages(chatMessages);
    }
  }, [chatMessages]);

  useEffect(() => {
    if (selectedSession && !isLoading) {
      reloadMessages();
    }
  }, [reloadMessages, selectedSession, isLoading]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (isStreaming && assistantMessage) {
      if (lastMessage?.role == "user") {
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        setMessages((prev) => [
          ...prev.slice(0, prev.length - 1),
          assistantMessage,
        ]);
      }
    }
  }, [isStreaming, assistantMessage, messages, setMessages]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <div className="flex-1 min-w-0">
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200/50 dark:border-gray-700/50 z-10">
            <div className="flex items-center justify-between px-4 py-3 gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-2 md:hidden"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>

              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-lg font-semibold">TELATEN Assistant</h1>
              </div>

              {!showSession ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSession(!showSession)}
                  className="flex items-center gap-2 ml-auto"
                >
                  <History className="w-4 h-4" />
                </Button>
              ) : (
                <div className="ml-auto"></div>
              )}
            </div>
          </div>

          <div className="max-w-2xl mx-auto px-4 py-6 md:py-8 min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-0px)] flex flex-col w-full">
            {isLoading ? (
              <div
                className="flex w-full justify-center"
                style={{ marginTop: "15vh" }}
              >
                <Spinner></Spinner>
              </div>
            ) : (
              <>
                {messages.length == 0 && (
                  <header className="mb-6 max-w-2xl mx-auto">
                    <div
                      className="flex justify-center"
                      style={{ marginTop: "15vh" }}
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4 text-center mt-5">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                          TELATEN Assistant
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                          Maju pelan-pelan, usaha jadi mapan!
                        </p>
                      </div>
                    </div>
                  </header>
                )}

                <div className="space-y-4 mb-6 max-w-2xl mx-auto flex-1 w-full min-w-0">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`w-full flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 ${
                          message.role === "user"
                            ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white"
                            : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700/30 text-gray-900 dark:text-white"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="w-4 h-4 text-pink-500" />
                            <span className="text-xs font-semibold text-pink-600">
                              ASSISTANT
                            </span>
                          </div>
                        )}
                        <p className="text-base leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="w-full flex justify-start pl-2 text-primary mt-3">
                      <Spinner />
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Sticky Input at Bottom */}
            <div className="sticky bottom-0 pb-4 mt-auto">
              <Card className="shadow-lg border-2 border-pink-200 dark:border-pink-800/30 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Input
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Tanyakan sesuatu..."
                      className="flex-1 h-12 text-base bg-white dark:bg-gray-800"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="h-12 w-12 rounded-full bg-pink-500 hover:bg-pink-600 flex-shrink-0 shadow-lg"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <CollapseChatSessionPanel
          show={showSession}
          setShow={(val) => setShowSession(val)}
          selectedSession={selectedSession}
          setSelectedSession={(val) => setSelectedSession(val)}
        />
      </div>
    </div>
  );
}
