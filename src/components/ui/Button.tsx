import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary";
    href?: string;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export function Button({
    children,
    variant = "primary",
    href,
    onClick,
    className = "",
    type = "button",
    disabled,
}: ButtonProps) {
    const base =
        "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] disabled:opacity-50";
    const variants = {
        primary:
            "bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:opacity-80",
        secondary:
            "border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]",
    };

    const classes = `${base} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <a href={href} className={classes}>
                {children}
            </a>
        );
    }

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={classes}>
            {children}
        </button>
    );
}
