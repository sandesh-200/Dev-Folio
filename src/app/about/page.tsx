"use client";

import { useEffect, useRef } from "react";
import { Code2, Layers, Wrench } from "lucide-react";

const skills = {
    Languages: ["Python", "JavaScript", "C", "C++", "SQL", "NoSQL"],
    Frameworks: ["Django", "Django REST Framework", "Node.js", "Express", "React", "Tailwind CSS"],
    Tools: ["Docker", "NGINX", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Celery", "Git", "Linux"],
};

const timeline = [
    {
        year: "2025",
        title: "Software Engineer",
        place: "Technimus · Kathmandu, Nepal",
        description:
            "Worked as a backend developer on AI-powered production apps like Delli Drop and OSOM. Built scalable APIs, scraped and processed 500k+ university records for AI recommendation systems, and contributed to frontend features including 3D canvas rendering using Three.js.",
    },
    {
        year: "2024",
        title: "Fullstack Developer",
        place: "Buy2Rent · Budapest, Hungary",
        description:
            "Developed a property search and recommendation system using Django, React, and PostgreSQL. Also contributed to automated trading bots using Python with Polytrading and MACD strategies on Binance.",
    },
    {
        year: "2023",
        title: "Backend Developer",
        place: "Fishpalace Limited · Antwerp, Belgium",
        description:
            "Structured complex nested JSON data into relational databases using Django and PostgreSQL. Built REST APIs, implemented webhooks for real-time updates, and added logging and validation systems for reliability.",
    },
];

const education = [
    {
        year: "2023 – 2027",
        title: "BSc in Computer Science and Information Technology",
        place: "Mahendra Morang Adarsha Multiple Campus",
        description:
            "Currently pursuing a degree in Computer Science and Information Technology.",
    },
];

const skillIcons = {
    Languages: Code2,
    Frameworks: Layers,
    Tools: Wrench,
};

export default function AboutPage() {
    const sectionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx: { revert: () => void } | null = null;

        async function initGSAP() {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                const sections = sectionsRef.current?.querySelectorAll(".animate-section");
                sections?.forEach((section) => {
                    gsap.fromTo(
                        section,
                        { y: 30, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.7,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: section,
                                start: "top 82%",
                            },
                        }
                    );
                });
            });
        }

        initGSAP();
        return () => ctx?.revert();
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-2xl mx-auto px-6 lg:px-8" ref={sectionsRef}>
                {/* Header */}
                <div className="mb-16 animate-section">
                    <p className="text-xs font-mono tracking-widest uppercase text-[hsl(var(--muted-foreground))] mb-3">
                        About
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[hsl(var(--foreground))] mb-6">
                        Sandesh Dhakal
                    </h1>
                    <div className="space-y-4 text-[hsl(var(--muted-foreground))] leading-relaxed">
                        <p>
                            I’m a software engineer from Nepal focused on building scalable
                            backend systems and full-stack applications. My work spans APIs,
                            data pipelines, real-time systems, and modern web interfaces.
                        </p>
                        <p>
                            I have worked on AI-powered applications, recommendation systems,
                            real-time platforms, and data-driven products using technologies
                            like Django, Node.js, React, PostgreSQL, and Redis.
                        </p>
                        <p>
                            Recently, I’ve worked on projects involving voice-based AI systems,
                            university recommendation engines powered by large datasets,
                            and real-time web applications designed for reliability and scale.
                        </p>
                    </div>
                </div>

                {/* Skills */}
                <div className="mb-16 animate-section">
                    <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-8">
                        Skills
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {(Object.entries(skills) as [keyof typeof skillIcons, string[]][]).map(
                            ([category, items]) => {
                                const Icon = skillIcons[category];
                                return (
                                    <div key={category}>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Icon
                                                size={14}
                                                className="text-[hsl(var(--muted-foreground))]"
                                            />
                                            <h3 className="text-xs font-mono font-medium tracking-wider uppercase text-[hsl(var(--muted-foreground))]">
                                                {category}
                                            </h3>
                                        </div>
                                        <ul className="space-y-1.5">
                                            {items.map((skill) => (
                                                <li
                                                    key={skill}
                                                    className="text-sm text-[hsl(var(--foreground)/0.8)]"
                                                >
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>

                {/* Timeline */}
                <div className="animate-section">
                    <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-8">
                        Experience
                    </h2>
                    <div className="relative">
                        <div className="absolute left-13 top-2 bottom-2 w-px bg-[hsl(var(--border))]" />

                        <div className="space-y-8">
                            {timeline.map((item) => (
                                <div key={item.title} className="flex gap-6">
                                    <div className="w-13 shrink-0 pt-0.5">
                                        <span className="text-xs font-mono text-[hsl(var(--muted-foreground))] tabular-nums">
                                            {item.year}
                                        </span>
                                    </div>
                                    <div className="relative pb-0">
                                        <div className="absolute -left-6.25 top-1.5 w-2 h-2 rounded-full bg-[hsl(var(--muted-foreground)/0.5)] border border-[hsl(var(--border))]" />
                                        <h3 className="font-medium text-[hsl(var(--foreground))] text-sm mb-0.5">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1.5 font-mono">
                                            {item.place}
                                        </p>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                {/* Education */}
<div className="mt-16 animate-section">
    <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-8">
        Education
    </h2>

    <div className="space-y-6">
        {education.map((item) => (
            <div key={item.title}>
                <h3 className="font-medium text-[hsl(var(--foreground))] text-sm mb-1">
                    {item.title}
                </h3>

                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2 font-mono">
                    {item.place} · {item.year}
                </p>

                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {item.description}
                </p>
            </div>
        ))}
    </div>
</div>
            </div>
        </div>
    );
}