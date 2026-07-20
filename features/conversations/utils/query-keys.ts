export const queryKeys = {
  conversations: {
    all: ["conversations"] as const,
    detail: (conversationId: string) => ["conversations", conversationId] as const,
    },
    messages: {
        byConversation: (conversationId: string) => ["messages", conversationId] as const,
    },
};
