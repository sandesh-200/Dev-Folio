"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx: { revert: () => void } | null = null;

        async function initGSAP() {
            const { gsap } = await import("gsap");

            ctx = gsap.context(() => {
                const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

                // Fade in overlay
                tl.fromTo(
                    containerRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.6 }
                );

                // Headline slide up
                tl.fromTo(
                    headlineRef.current,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    "-=0.2"
                );

                // Subtext
                tl.fromTo(
                    subtextRef.current,
                    { y: 24, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7 },
                    "-=0.4"
                );

                // CTA buttons
                tl.fromTo(
                    ctaRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6 },
                    "-=0.4"
                );
            });
        }

        initGSAP();
        return () => ctx?.revert();
    }, []);

    return (
        <section
            className="relative min-h-screen flex items-center overflow-hidden"
            aria-label="Hero"
        >
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
                aria-hidden="true"
            />

            {/* Dark overlay */}
            <div
                className="absolute inset-0 bg-black/60"
                aria-hidden="true"
            />

            {/* Subtle noise texture */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
                aria-hidden="true"
            />

            {/* Content */}
            <div
                ref={containerRef}
                className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16"
                style={{ opacity: 0 }}
            >
                <div className="max-w-2xl">
                    {/* Eyebrow */}
                    <p className="text-xs font-mono tracking-widest uppercase text-white/50 mb-6">
                        Fullstack Developer
                    </p>

                    {/* Headline */}
                    <h1
                        ref={headlineRef}
                        className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.1] mb-6"
                        style={{ opacity: 0 }}
                    >
                        Building useful{" "}
                        <span className="text-white/70">digital tools.</span>
                    </h1>

                    {/* Subtext */}
                    <p
                        ref={subtextRef}
                        className="text-base sm:text-lg text-white/60 leading-relaxed mb-10 max-w-lg"
                        style={{ opacity: 0 }}
                    >
                        I design and build software, experiments, and ideas on the internet.
                        Focused on craft, clarity, and code that lasts.
                    </p>

                    {/* CTA buttons */}
                    <div
                        ref={ctaRef}
                        className="flex flex-wrap items-center gap-4"
                        style={{ opacity: 0 }}
                    >
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-white text-black rounded-md hover:bg-white/90 transition-all"
                        >
                            View Projects <ArrowRight size={14} />
                        </a>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-white/30 text-white rounded-md hover:bg-white/10 transition-all"
                        >
                            Read Blog
                        </Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
                    <span className="text-xs font-mono tracking-widest uppercase">
                        Scroll
                    </span>
                    <div className="w-px h-12 bg-linear-to-b from-white/30 to-transparent" />
                </div>
            </div>
        </section>
    );
}
