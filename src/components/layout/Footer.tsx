import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

const socialLinks = [
    { icon: Github, href: siteConfig.links.github, label: "GitHub" },
    { icon: Linkedin, href: siteConfig.links.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: siteConfig.links.twitter, label: "Twitter" },
    { icon: Mail, href: `mailto:${siteConfig.links.email}`, label: "Email" },
];

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        © {year}{" "}
                        <Link
                            href="/"
                            className="hover:text-[hsl(var(--foreground))] transition-colors"
                        >
                            {siteConfig.name}
                        </Link>
                        . All rights reserved.
                    </p>

                    <div className="flex items-center gap-3">
                        {socialLinks.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                            >
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
