interface SectionHeadingProps {
    label?: string;
    title: string;
    subtitle?: string;
}

export function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
    return (
        <div className="mb-12">
            {label && (
                <p className="text-xs font-mono font-medium tracking-widest uppercase text-[hsl(var(--muted-foreground))] mb-3">
                    {label}
                </p>
            )}
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))] leading-snug">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-3 text-[hsl(var(--muted-foreground))] text-base max-w-xl">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
