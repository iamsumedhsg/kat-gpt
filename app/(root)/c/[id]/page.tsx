import { prisma } from "@/lib/db";
import { requireUser } from "@/features/auth/action/require-user";
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

async function loadChatMessages(id: string) {
  const conversation = await getConversation(id);

  return conversation.message.map((message) => ({
    id: message.id,
    role: message.role,
    content: message.content,
  }));
}

function ConversationView({
  conversationId,
  initialMessages,
}: {
  conversationId: string;
  initialMessages: Array<{ id: string; role: string; content: string }>;
}) {
  return (
    <div className="flex h-full flex-col p-6">
      <h1 className="text-lg font-semibold">Conversation {conversationId}</h1>
      <pre className="mt-4 whitespace-pre-wrap text-sm">
        {JSON.stringify(initialMessages, null, 2)}
      </pre>
    </div>
  );
}

const page = async ({ params }: ConversationPageProps) => {
  const { id } = await params;

  try {
    await getConversation(id);
  } catch {
    notFound();
  }

  const initialMessages = await loadChatMessages(id);

  return (
    <ConversationView
      key={id}
      conversationId={id}
      initialMessages={initialMessages}
    />
  );
};

export default page;