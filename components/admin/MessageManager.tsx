"use client";

import { markMessageRead, deleteMessage } from "@/lib/actions";

type Message = {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  read: boolean;
  createdAt: Date;
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function MessageManager({ messages }: { messages: Message[] }) {
  return (
    <div className="card p-6">
      <h2 className="section-title">Messages</h2>

      <div className="space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-lg border p-4 ${
              msg.read
                ? "border-card-border bg-card"
                : "border-accent bg-blue-50/50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{msg.name}</p>
                  {!msg.read && (
                    <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                  )}
                </div>
                <p className="text-sm text-text-secondary">{msg.email}</p>
                {msg.subject && (
                  <p className="text-sm font-medium mt-1">{msg.subject}</p>
                )}
                <p className="mt-2 text-sm text-foreground whitespace-pre-wrap">
                  {msg.message}
                </p>
                <p className="mt-2 text-xs text-text-muted">
                  {formatDate(msg.createdAt)}
                </p>
              </div>

              <div className="flex gap-2 ml-4">
                {!msg.read && (
                  <form action={() => markMessageRead(msg.id)}>
                    <button type="submit" className="btn-secondary text-sm">
                      Mark Read
                    </button>
                  </form>
                )}
                <form action={() => deleteMessage(msg.id)}>
                  <button type="submit" className="btn-danger text-sm">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-text-secondary text-sm">No messages yet.</p>
        )}
      </div>
    </div>
  );
}
