"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  createConversation,
  deleteConversation,
  listConversations,
  updateConversation,
} from "@/features/conversations/actions/conversation-action";

import { queryKeys } from "@/features/conversations/utils/query-keys";

export function useConversations() {
  return useQuery({
    queryKey: queryKeys.conversations.all,
    queryFn: () => listConversations(),
  });
}

export function useCreateConversation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (title?: string) => createConversation(title),
    onSuccess: (conversation) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.conversations.all });
      router.push(`/c/${conversation.id}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "could not create chat");
    },
  });
}

export function useUpdateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      ...data
    }: {
      id: string;
      title?: string;
      isPinned?: boolean;
      isArchived?: boolean;
    }) => updateConversation(id, data),
    onSuccess: (conversation) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.conversations.all });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.conversations.detail(conversation.id),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "could not update chat");
    },
  });
}

export function useDeleteConversation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const activeId = pathname.startsWith("/c/") ? pathname.split("/")[2] : undefined;

  return useMutation({
    mutationFn: (id: string) => deleteConversation(id),
    onSuccess: ({ id }) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.conversations.all });
      queryClient.removeQueries({ queryKey: queryKeys.messages.byConversation(id) });
      if (activeId === id) {
        router.push("/");
      }
      toast.success("Chat deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message || "could not delete chat");
    },
  });
}
