"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Navbar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // const isLightUnscrolled = mounted && theme === "light" && !scrolled;
    const isLightUnscrolled = mounted && theme === "light" && !scrolled && pathname === "/";

    const logoClass = isLightUnscrolled
        ? "text-white hover:opacity-70"
        : "text-[hsl(var(--foreground))] hover:opacity-70";

    const navLinkActive = isLightUnscrolled
        ? "text-white"
        : "text-[hsl(var(--foreground))]";

    const navLinkInactive = isLightUnscrolled
        ? "text-white/70 hover:text-white"
        : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]";

    const iconClass = isLightUnscrolled
        ? "text-white/70 hover:text-white hover:bg-white/10"
        : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]";

    return (
        <header
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-[hsl(var(--background)/0.85)] backdrop-blur-md border-b border-[hsl(var(--border))]"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        href="/"
                        className={`text-sm font-semibold tracking-tight transition-all duration-300 ${logoClass}`}
                    >
                        {siteConfig.name}
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {siteConfig.nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative px-3 py-1.5 text-sm transition-all duration-300 group ${
                                    pathname === item.href ? navLinkActive : navLinkInactive
                                }`}
                            >
                                {item.label}
                                <span
                                    className={`absolute bottom-0 left-3 right-3 h-px transition-all duration-300 ${
                                        isLightUnscrolled ? "bg-white" : "bg-[hsl(var(--foreground))]"
                                    } ${
                                        pathname === item.href
                                            ? "opacity-100 scale-x-100"
                                            : "opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100"
                                    }`}
                                />
                            </Link>
                        ))}

                        {/* Theme toggle */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className={`ml-2 p-2 rounded-md transition-all duration-300 ${iconClass}`}
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                            </button>
                        )}
                    </nav>

                    {/* Mobile controls */}
                    <div className="flex md:hidden items-center gap-2">
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className={`p-2 rounded-md transition-all duration-300 ${iconClass}`}
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                            </button>
                        )}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`p-2 rounded-md transition-all duration-300 ${iconClass}`}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${
                    mobileOpen ? "max-h-64 border-b border-[hsl(var(--border))]" : "max-h-0"
                } bg-[hsl(var(--background)/0.95)] backdrop-blur-md`}
            >
                <nav className="px-6 py-4 flex flex-col gap-1">
                    {siteConfig.nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`py-2 text-sm transition-colors ${
                                pathname === item.href
                                    ? "text-[hsl(var(--foreground))] font-medium"
                                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}