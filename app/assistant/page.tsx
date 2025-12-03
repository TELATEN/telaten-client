"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mic,
  Send,
  Sparkles,
  MessageSquare,
  ArrowLeft,
  History,
  PanelRightClose,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useGetChatSessions from "@/hooks/services/chat/session/use-get-sessions";
import CollapseChatSessionPanel from "@/components/chat/CollapseChatSessionPanel";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AssistantPage() {
  const { data: sessions, isLoading, error } = useGetChatSessions();

  const [showSession, setShowSession] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Halo! Saya TELATEN, asisten digital Anda. Ceritakan apa yang ingin Anda lakukan hari ini?",
      timestamp: new Date(),
    },
  ]);

  const handleVoiceInput = () => {
    toast({
      title: "Fitur Voice-to-Text",
      description: "Tekan dan tahan untuk mulai berbicara...",
    });
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: messageInput,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);

      setTimeout(() => {
        const assistantReply: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content:
            "Baik, saya mengerti. TELATEN akan membantu Anda dengan sabar!",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantReply]);
      }, 1000);

      setMessageInput("");
    }
  };

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

              {!showSession && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSession(!showSession)}
                  className="flex items-center gap-2 ml-auto"
                >
                  <History className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="max-w-2xl mx-auto px-4 py-6 md:py-8 min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-0px)] flex flex-col">
            <header className="mb-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    TELATEN Assistant
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Maju Pelan-pelan, Usaha Jadi Mapapan
                  </p>
                </div>
              </div>
            </header>

            <div className="space-y-4 mb-6 max-w-2xl mx-auto flex-1">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.type === "user"
                        ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white"
                        : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700/30 text-gray-900 dark:text-white"
                    }`}
                  >
                    {message.type === "assistant" && (
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-pink-500" />
                        <span className="text-xs font-semibold text-pink-600">
                          TELATEN
                        </span>
                      </div>
                    )}
                    <p className="text-base leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Input at Bottom */}
            <div className="sticky bottom-0 pb-6 mt-auto">
              <Card className="shadow-lg border-2 border-pink-200 dark:border-pink-800/30 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleVoiceInput}
                      size="icon"
                      className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 flex-shrink-0 shadow-lg"
                    >
                      <Mic className="w-5 h-5" />
                    </Button>
                    <Input
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Ketik transaksi atau gunakan voice..."
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
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    Contoh: &quot;Tadi jual 10 nasi goreng @ 15rb&quot;
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <CollapseChatSessionPanel
          show={showSession}
          setShow={(val) => setShowSession(val)}
        />
      </div>
    </div>
  );
}
