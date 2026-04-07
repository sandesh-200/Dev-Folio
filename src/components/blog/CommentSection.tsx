"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function CommentSection() {
    const { theme, resolvedTheme } = useTheme();

    // Choose Giscus theme based on your site's theme
    const giscusTheme =
        resolvedTheme === "dark" || theme === "dark"
            ? "transparent_dark"
            : "light";

    return (
        <div className="mt-16 pt-8 border-t border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold mb-8">Comments</h2>
            <Giscus
                id="comments"
                repo="sandesh-200/Dev-Folio" // e.g., "sandesh-200/Dev-Folio"
                repoId="R_kgDORk9eTA"
                category="Announcements"
                categoryId="DIC_kwDORk9eTM4C6Skf"
                mapping="pathname"
                term="Welcome to Giscus!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={giscusTheme}
                lang="en"
                loading="lazy"
            />
        </div>
    );
}
