"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendMessage } from "@/lib/actions";

function Submit() {
  const { pending } = useFormStatus();
  return <button disabled={pending} className="btn-a w-full">{pending ? "Sending…" : "Send message →"}</button>;
}

// contact — isolated form
export function ContactForm() {
  const [state, action] = useActionState(sendMessage, null);
  return (
    <div className="iso-card p-6 md:p-7">
      <div className="flex items-center justify-between mb-2">
        <span className="iso-tab">Contact</span>
        <span className="section-label">Let’s talk</span>
      </div>
      <h2 className="card-h-sm mb-1">Say hello.</h2>
      <p className="text-[13px] leading-relaxed text-[var(--muted-2)] mb-5">A brief note is enough — I’ll reply within a day.</p>

      {state?.success && <div className="alert-ok mb-4">{state.success}</div>}
      {state?.error && <div className="alert-err mb-4">{state.error}</div>}

      <form action={action} className="space-y-3.5">
        <div className="grid sm:grid-cols-2 gap-3.5">
          <label><span className="i-label">Name *</span><input name="name" required placeholder="Ada Lovelace" className="i-field-sm" /></label>
          <label><span className="i-label">Email *</span><input name="email" type="email" required placeholder="ada@mail.com" className="i-field-sm" /></label>
        </div>
        <label><span className="i-label">Subject</span><input name="subject" placeholder="Project inquiry" className="i-field-sm" /></label>
        <label><span className="i-label">Message *</span><textarea name="message" required rows={4} placeholder="Tell me a bit about your idea…" className="i-field-sm resize-none" /></label>
        <Submit />
        <p className="font-mono text-[11px] tracking-wide text-muted text-center">No spam — just a direct message.</p>
      </form>
    </div>
  );
}
