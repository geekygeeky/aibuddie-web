import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { Send, Loader2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { buddyApi, chatApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/navbar";

type SendMessage = {
  message: string;
  messageConversationId?: string;
};

export function Chat() {
  const { buddySlug } = useParams();
  const location = useLocation();
  const conversationIdProps = location.state;

  const [message, setMessage] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(
    conversationIdProps,
  );
  const [messages, setMessages] = useState<any[]>([]);

  const { data: buddy } = useQuery({
    queryKey: ["buddy", buddySlug],
    queryFn: async () => {
      const { data } = await buddyApi.getBySlug(buddySlug!);
      return data;
    },
  });

//   const { data: conversations } = useQuery({
//     queryKey: ["buddy", buddySlug],
//     queryFn: async () => {
//       const { data } = await chatApi.getConversations(buddySlug!);
//       return data;
//     },
//   });

  const createConversation = useMutation({
    mutationFn: async (buddyId: string) => {
      const { data } = await chatApi.createConversation(buddyId);
      return data;
    },
    onSuccess: (data) => {
      setConversationId(data.id);
    },
  });

  const sendMessage = useMutation({
    mutationFn: async ({ message, messageConversationId }: SendMessage) => {
      const id = messageConversationId || conversationId!;
      const { data } = await chatApi.sendMessage(id, message);
      return data;
    },
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message, tier: data.tier },
      ]);
      setMessage("");
    },
  });

  //   useEffect(() => {
  //     if (conversationIdProps) {
  //       setConversationId(conversationIdProps);
  //     }
  //   });

//   useEffect(() => {
//     //   if (buddy && !conversationId) {
//     //       createConversation.mutate(buddy.id);
//     //   }
//     if (conversationId) {
//     }
//   }, [buddy, conversationId, createConversation]);

  const handleSend = async () => {
    if (!message.trim()) return;

    if (!conversationId) {
      const conversation = await createConversation.mutateAsync(buddy.id);

      setMessages((prev) => [...prev, { role: "user", content: message }]);
      sendMessage.mutate({
        messageConversationId: conversation.id,
        message,
      });
      return;
    }

    alert("not new");

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    sendMessage.mutate({ message });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <div className="border-b p-4 bg-white dark:bg-gray-950">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{buddy?.icon}</span>
            <div>
              <h1 className="text-xl font-bold">{buddy?.name}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {buddy?.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-4xl space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.tier && (
                  <span className="text-xs opacity-70 mt-2 block">
                    Model: {msg.tier}
                  </span>
                )}
              </div>
            </div>
          ))}
          {sendMessage.isPending && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t p-4 bg-white dark:bg-gray-950">
        <div className="container mx-auto max-w-4xl flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-md bg-white dark:bg-gray-900"
            disabled={sendMessage.isPending}
          />
          <Button
            onClick={handleSend}
            disabled={createConversation.isPending || sendMessage.isPending}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
