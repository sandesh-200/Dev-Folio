import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
}

export function Input({ icon, className = "", ...props }: InputProps) {
    return (
        <div className="relative w-full group">
            {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] group-focus-within:text-[hsl(var(--foreground))] transition-colors">
                    {icon}
                </div>
            )}
            <input
                className={`
                    w-full bg-[hsl(var(--background))] border border-[hsl(var(--border))] 
                    rounded-md py-2.5 ${icon ? "pl-10" : "px-4"} pr-4 text-sm
                    placeholder:text-[hsl(var(--muted-foreground))]
                    focus:outline-none focus:ring-1 focus:ring-[hsl(var(--foreground))]
                    hover:border-[hsl(var(--muted-foreground))]
                    transition-all duration-200
                    ${className}
                `}
                {...props}
            />
        </div>
    );
}
