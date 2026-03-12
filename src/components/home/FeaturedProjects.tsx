"use client";

import { useEffect, useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx: { revert: () => void } | null = null;

        async function initGSAP() {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                // Section heading
                const heading = sectionRef.current?.querySelector(".section-heading");
                if (heading) {
                    gsap.fromTo(
                        heading,
                        { y: 30, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.7,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top 80%",
                            },
                        }
                    );
                }

                // Cards stagger
                const cards = cardsRef.current?.querySelectorAll(".project-card");
                if (cards) {
                    gsap.fromTo(
                        cards,
                        { y: 40, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.7,
                            ease: "power3.out",
                            stagger: 0.12,
                            scrollTrigger: {
                                trigger: cardsRef.current,
                                start: "top 80%",
                            },
                        }
                    );
                }
            });
        }

        initGSAP();
        return () => ctx?.revert();
    }, []);

    const featured = projects.filter((p) => p.featured);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="py-24 bg-[hsl(var(--background))]"
            aria-label="Featured Projects"
        >
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="section-heading">
                    <SectionHeading
                        label="Work"
                        title="Featured Projects"
                        subtitle="A selection of things I've built. Side projects, open-source tools, and experiments."
                    />
                </div>

                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5"
                >
                    {featured.map((project) => (
                        <article
                            key={project.title}
                            className="project-card group flex flex-col p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-[hsl(var(--muted-foreground)/0.4)] transition-all duration-200"
                        >
                            <div className="flex-1">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2 group-hover:text-[hsl(var(--foreground))] transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {project.tech.map((t) => (
                                        <Tag key={t} label={t} />
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-4 border-t border-[hsl(var(--border))]">
                                {project.githubHref && (
                                    <a
                                        href={project.githubHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                                        aria-label={`${project.title} on GitHub`}
                                    >
                                        <Github size={13} />
                                        Source
                                    </a>
                                )}
                                {project.href && (
                                    <a
                                        href={project.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors ml-auto"
                                        aria-label={`${project.title} live demo`}
                                    >
                                        Live <ExternalLink size={12} />
                                    </a>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
