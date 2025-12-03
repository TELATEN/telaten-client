import useGetChatSessions from "@/hooks/services/chat/session/use-get-sessions";
import { ChatSession } from "@/types";
import { MoreHorizontal, PanelRightClose, Plus } from "lucide-react";

export default function CollapseChatSessionPanel({
  show,
  setShow,
  selectedSession,
  setSelectedSession,
}: {
  show: boolean;
  setShow: (val: boolean) => void;
  selectedSession?: ChatSession | null;
  setSelectedSession?: (val: ChatSession) => void;
}) {
  const { data: sessions } = useGetChatSessions();

  return (
    <div
      className={`w-64 sticky top-0 z-20 right-0 bottom-0 hidden md:flex md:flex-col bg-white dark:bg-gray-800 border-l border-gray-200/50 dark:border-gray-700/50 h-screen transition-all duration-300 ${show ? "!translate-x-0" : "translate-x-full !w-0"}`}
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
          className="p-3 hover:bg-muted py-1.5 rounded transition flex items-center gap-1 group cursor-pointer w-full text-sm"
        >
          <Plus className="h-4 w-4"></Plus>
          Chat Baru
        </button>
        {sessions?.map((session) => (
          <div
            key={session.id}
            className={[
              "p-3 hover:bg-muted py-1.5 rounded transition flex items-center justify-between group cursor-pointer",
              selectedSession?.id == session.id ? "bg-muted" : "",
            ].join(" ")}
            onClick={() =>
              setSelectedSession ? setSelectedSession(session) : null
            }
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
  );
}
