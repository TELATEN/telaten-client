"use client";

import useGetChatSessions from "@/hooks/services/chat/session/use-get-sessions";
import { ChatSession } from "@/types";
import { MoreHorizontal, PanelRightClose, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CollapseChatSessionPanel({
  show,
  setShow,
  selectedSession,
  setSelectedSession,
  newSession,
}: {
  show: boolean;
  setShow: (val: boolean) => void;
  selectedSession?: ChatSession | null;
  setSelectedSession?: (val?: ChatSession | null) => void;
  newSession?: ChatSession | null;
}) {
  const router = useRouter();
  const isDesktop = typeof window != "undefined" && window.innerWidth >= 1024;
  const { data } = useGetChatSessions();
  const [sessions, setSessions] = useState<ChatSession[]>([]);

  const handleSelect = (session: ChatSession) => {
    if (!setSelectedSession) return;

    if (selectedSession?.id === session.id) return;

    setSelectedSession(session);

    if (!isDesktop) {
      setShow(false);
    }

    router.replace(`/assistant#${session.id}`);
  };

  const createNewSession = () => {
    if (!setSelectedSession) return;

    setSelectedSession(null);

    router.replace(`/assistant`);
  };

  useEffect(() => {
    if (data) {
      setSessions(data);
    }
  }, [data]);

  useEffect(() => {
    if (!setSelectedSession || !sessions) return;

    // Only run on initial mount
    const hashId = window.location.hash.slice(1);

    if (!hashId) {
      setSelectedSession(null);
      return;
    }

    const sessionFromHash = sessions.find((s: ChatSession) => s.id === hashId);
    if (sessionFromHash && !selectedSession?.id) {
      setSelectedSession(sessionFromHash);
    }
  }, [setSelectedSession, sessions, selectedSession]);

  useEffect(() => {
    if (newSession) {
      setSessions((prev: ChatSession[]) => {
        return [newSession, ...prev];
      });
    }
  }, [newSession]);

  return (
    <>
      <div
        className={[
          "lg:!hidden fixed top-0 left-0 right-0 bottom-0 bg-black/25 z-[19]",
          show ? "block" : "hidden",
        ].join(" ")}
        onClick={() => setShow(false)}
      ></div>
      <div
        className={`w-64 lg:sticky fixed top-0 z-20 right-0 bottom-0 md:flex md:flex-col bg-white dark:bg-gray-800 border-l border-gray-200/50 dark:border-gray-700/50 h-screen transition-all duration-300 ${show ? "!translate-x-0" : "translate-x-full !w-0"}`}
      >
        <div className="border-b border-border-gray-200/50 dark:border-gray-700/50 p-3 flex items-center gap-3">
          <button
            onClick={() => setShow(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-gray-600 dark:text-gray-400 flex-shrink-0"
            title="Collapse sidebar"
          >
            <PanelRightClose className="w-5 h-5" />
          </button>
          <div className="font-semibold min-w-0 flex-1 truncate overflow-hidden">
            History Chat
          </div>
        </div>

        <div className="p-3 space-y-1">
          <button
            type="button"
            className={`p-3 hover:bg-muted py-1.5 rounded transition flex items-center gap-2 group cursor-pointer w-full text-sm overflow-hidden ${!selectedSession?.id ? "bg-muted" : ""}`}
            onClick={createNewSession}
          >
            <Plus className="h-4 w-4"></Plus>
            <div className="flex-1 min-w-0 overflow-hidden truncate text-left">
              Chat Baru
            </div>
          </button>
          {sessions?.map((session: ChatSession) => (
            <div
              key={session.id}
              className={[
                "p-3 hover:bg-muted py-1.5 rounded transition flex items-center justify-between group cursor-pointer overflow-hidden",
                selectedSession?.id == session.id ? "bg-muted" : "",
              ].join(" ")}
              onClick={() => handleSelect(session)}
            >
              <div
                className={[
                  "text-sm truncate flex-1 min-w-0 overflow-hidden text-muted-foreground",
                  selectedSession?.id == session.id ? "!text-primary" : "",
                ].join(" ")}
              >
                {session.title}
              </div>
              <button
                type="button"
                className="group-hover:opacity-100 opacity-0 transition"
              >
                <MoreHorizontal className="w-4 h-4"></MoreHorizontal>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
