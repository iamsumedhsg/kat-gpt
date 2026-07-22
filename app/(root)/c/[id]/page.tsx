import { loadChatMessages as loadConversationMessages } from "@/features/ai/actions/chat-store";
import { ConversationView } from "@/features/conversations/components/conversation-view";
import { requireUser } from "@/features/auth/action/require-user";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

type ConversationPageProps = {
  params: Promise<{ id: string }>;
};

async function getConversation(id: string) {
  const user = await requireUser();
  const conversation = await prisma.conversation.findFirst({
    where: { id, userId: user.id },
    include: { message: { orderBy: { createAt: "asc" } } },
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  return conversation;
}

const page = async ({ params }: ConversationPageProps) => {
  const { id } = await params;

  try {
    await getConversation(id);
  } catch {
    notFound();
  }

  const initialMessages = await loadConversationMessages(id);

  return (
    <ConversationView
      key={id}
      conversationId={id}
      initialMessages={initialMessages}
    />
  );
};

export default page;