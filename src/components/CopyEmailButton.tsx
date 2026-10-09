"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon, MailIcon } from "@/components/icons";

export default function CopyEmailButton({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`group flex items-center gap-3 text-sm text-foreground transition-colors hover:text-accent ${className ?? ""}`}
    >
      {copied ? (
        <CheckIcon className="h-4 w-4 text-accent" />
      ) : (
        <MailIcon className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
      )}
      <span>{email}</span>
      <span
        className={`flex items-center gap-1 text-xs transition-opacity ${
          copied ? "text-accent opacity-100" : "text-muted opacity-60 sm:opacity-0 sm:group-hover:opacity-100"
        }`}
      >
        {copied ? (
          "Copied"
        ) : (
          <>
            <CopyIcon className="h-3 w-3" /> Copy
          </>
        )}
      </span>
    </button>
  );
}
