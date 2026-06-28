"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendMessage } from "@/lib/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="btn-primary w-full">
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(sendMessage, null);

  return (
    <div className="card p-6">
      <h2 className="section-title">Contact Me</h2>

      {state?.success && (
        <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-700 text-sm">
          {state.success}
        </div>
      )}

      {state?.error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700 text-sm">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="label">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="input"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="label">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="input"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="label">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="input"
            placeholder="What is this about?"
          />
        </div>

        <div>
          <label htmlFor="message" className="label">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="input resize-none"
            placeholder="Your message..."
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
