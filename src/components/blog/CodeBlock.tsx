"use client";

import { useState, ReactNode, isValidElement } from "react";

// Helper to extract text from nested React children
const extractText = (node: ReactNode): string => {
    if (!node) return "";
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (isValidElement(node)) {
        return extractText((node as React.ReactElement<any>).props.children);
    }
    return "";
};

export function CodeBlock({
    children,
    ...props
}: React.HTMLAttributes<HTMLPreElement>) {
    const [copied, setCopied] = useState(false);

    const copyCode = async () => {
        // Use the extractor instead of .toString()
        const code = extractText(children);
        await navigator.clipboard.writeText(code);

        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            <button
                onClick={copyCode}
                className="absolute right-3 top-3 z-10 text-xs px-2 py-1 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] opacity-0 group-hover:opacity-100 transition"
            >
                {copied ? "Copied" : "Copy"}
            </button>

            <pre {...props}>{children}</pre>
        </div>
    );
}