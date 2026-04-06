"use client";
import { useState, useRef } from "react";

export function CodeBlock({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const copyCode = async () => {
    const code = preRef.current?.innerText ?? "";
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={copyCode}
        className="absolute right-3 top-3 z-10 text-xs px-2 py-1 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] opacity-0 group-hover:opacity-100 transition"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre
        ref={preRef}
        className="w-full overflow-x-auto rounded-xl border border-[hsl(var(--border))] p-5 leading-relaxed font-mono"
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
