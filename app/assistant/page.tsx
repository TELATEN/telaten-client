"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Sparkles,
  ArrowLeft,
  History,
  Loader2,
  Plus,
  ArrowDown,
  Bot,
} from "lucide-react";
import CollapseChatSessionPanel from "@/components/chat/CollapseChatSessionPanel";
import { ChatMessage, ChatSession } from "@/types";
import Spinner from "@/components/Spinner";
import useGetChatMessages from "@/hooks/services/chat/message/use-get-messages";
import { useSendMessage } from "@/hooks/services/chat/message/use-send-message";
import { AppConfig } from "@/lib/constants/app";

export default function AssistantPage() {
  const router = useRouter();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [messageInput, setMessageInput] = useState("");
  const [showSession, setShowSession] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>();
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: chatMessages, isFetching: isLoading } = useGetChatMessages(
    selectedSession?.id
  );

  const {
    mutate: sendMessage,
    message: assistantMessage,
    session: newSession,
    isStreaming,
  } = useSendMessage();

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  };

  // Handle keyboard appearance on mobile
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && window.visualViewport) {
        const viewport = window.visualViewport;
        const windowHeight = window.innerHeight;
        const viewportHeight = viewport.height;
        const diff = windowHeight - viewportHeight;

        if (diff > 150) {
          setKeyboardHeight(diff);
        } else {
          setKeyboardHeight(0);
        }
      }
    };

    if (typeof window !== "undefined" && window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
      window.visualViewport.addEventListener("scroll", handleResize);

      return () => {
        window.visualViewport?.removeEventListener("resize", handleResize);
        window.visualViewport?.removeEventListener("scroll", handleResize);
      };
    }
  }, []);

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

      await new Promise((res) => setTimeout(res, 100));
      await sendMessage({
        content: messageInput,
        session_id: selectedSession?.id,
      });

      setMessageInput("");
      setIsChatLoading(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  useEffect(() => {
    if (!isChatLoading) {
      setMessages(chatMessages || []);
    }

    if (!isLoading && chatMessages && chatMessages?.length > 0) {
      setTimeout(scrollToBottom, 400);
    }
  }, [chatMessages, isLoading]);

  useEffect(() => {
    if (isStreaming && assistantMessage) {
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];

        if (lastMessage?.role == "user") {
          return [...prevMessages, assistantMessage!];
        } else {
          return [
            ...prevMessages.slice(0, prevMessages.length - 1),
            assistantMessage,
          ];
        }
      });

      setTimeout(scrollToBottom, 100);
    }
  }, [isStreaming, assistantMessage, setMessages]);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();

    const handleScrolling = () => {
      setTimeout(() => {
        if (chatContainerRef.current) {
          const { scrollHeight } = chatContainerRef.current;
          chatContainerRef.current.scrollTo({
            top: scrollHeight - 200,
          });
        }
      }, 400);
    };

    inputRef.current.addEventListener("focus", handleScrolling);

    return () => {
      inputRef.current?.removeEventListener("focus", handleScrolling);
    };
  }, []);

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 min-w-0 flex flex-col relative">
          {/* Fixed Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200/50 dark:border-gray-700/50 z-50 flex-shrink-0">
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
                <h1 className="text-lg font-semibold">
                  {AppConfig.appName} Assistant
                </h1>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedSession(null);
                  router.replace("/assistant");
                }}
                className="ml-auto"
              >
                <Plus className="h-4 w-4"></Plus>
              </Button>

              {!showSession && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSession(!showSession)}
                >
                  <History className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Scrollable Chat Area */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto scroll-smooth relative pb-20 md:pb-0"
            onScroll={handleScroll}
          >
            <div className="max-w-3xl mx-auto px-4 py-6 md:py-8 w-full">
              {isLoading && !isChatLoading ? (
                <div
                  className="flex w-full justify-center"
                  style={{ marginTop: "15vh" }}
                >
                  <Spinner></Spinner>
                </div>
              ) : (
                <>
                  {messages.length == 0 && (
                    <header className="mb-6 max-w-3xl mx-auto w-full">
                      <div
                        className="flex justify-center"
                        style={{ marginTop: "15vh" }}
                      >
                        <div className="w-14 h-14 bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 rounded-xl flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1 md:gap-3 mb-4 text-center mt-5 w-full">
                        <div>
                          <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            {AppConfig.appName} Assistant
                          </h1>
                          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                            {AppConfig.appSlogan}
                          </p>
                        </div>
                      </div>
                    </header>
                  )}

                  <div className="space-y-4 mb-6 max-w-2xl mx-auto w-full min-w-0">
                    {messages.map((message, i) => (
                      <div
                        key={message.id}
                        className="last:min-h-[70vh] w-full"
                      >
                        <div
                          className={`w-full flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`rounded-2xl md:p-4 p-3 ${
                              message.role === "user"
                                ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white max-w-[80%]"
                                : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700/30 text-gray-900 dark:text-white max-w-[95%]"
                            }`}
                          >
                            {message.role === "assistant" && (
                              <div className="flex items-center gap-2 mb-2">
                                <Bot className="w-4 h-4 text-pink-500" />
                                <span className="text-xs font-semibold text-pink-600">
                                  ASSISTANT
                                </span>
                              </div>
                            )}
                            <div className="md:text-base text-sm leading-relaxed markdown prose prose-sm max-w-none dark:prose-invert">
                              {message.is_error ||
                              (!message.content.trim() && !isChatLoading) ? (
                                <p className="text-destructive">
                                  Sistem gagal merespon permintaan Anda.
                                  Silahkan tunggu beberapa saat sebelum mencoba
                                  mengirim ulang.
                                </p>
                              ) : (
                                <Markdown remarkPlugins={[remarkGfm]}>
                                  {message.content}
                                </Markdown>
                              )}
                            </div>
                            {message.role == "assistant" &&
                              isChatLoading &&
                              i == messages.length - 1 && (
                                <div className="w-full flex justify-start text-primary mt-5">
                                  <Spinner />
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Scroll to Bottom Button - Floating above input */}
          {showScrollButton && (
            <div className="absolute bottom-32 md:bottom-24 left-0 right-0 flex justify-center pointer-events-none z-20">
              <Button
                onClick={scrollToBottom}
                size="icon"
                className="pointer-events-auto rounded-full shadow-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 h-10 w-10 transition-all hover:scale-110"
              >
                <ArrowDown className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Fixed Input at Bottom - Desktop Only */}
          <div className="hidden md:block flex-shrink-0">
            <div className="max-w-3xl mx-auto px-4 py-4 w-full">
              <Card className="shadow-lg border-2 border-pink-200 dark:border-pink-800/30 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Input
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Tanyakan sesuatu..."
                      className="flex-1 h-12 text-base bg-white dark:bg-gray-800 focus:outline-none"
                      disabled={isChatLoading}
                      ref={inputRef}
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
                      disabled={isChatLoading}
                    >
                      {isChatLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Fixed Input at Bottom - Mobile Only (Like BottomNav) */}
          <div
            className="fixed left-0 right-0 z-10 md:hidden transition-all duration-150"
            style={{
              bottom: keyboardHeight > 0 ? `${keyboardHeight}px` : "0px",
            }}
          >
            <div className="px-4 pb-4">
              <Card className="shadow-lg border-2 border-pink-200 dark:border-pink-800/30 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <Input
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      ref={inputRef}
                      placeholder="Tanyakan sesuatu..."
                      className="flex-1 h-11 text-base bg-white dark:bg-gray-800 focus:outline-none"
                      disabled={isChatLoading}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="h-11 w-11 rounded-full bg-pink-500 hover:bg-pink-600 flex-shrink-0 shadow-lg"
                      disabled={isChatLoading}
                    >
                      {isChatLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
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
          newSession={newSession}
        />
      </div>
    </div>
  );
}
