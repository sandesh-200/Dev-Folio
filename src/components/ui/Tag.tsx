interface TagProps {
    label: string;
}

export function Tag({ label }: TagProps) {
    return (
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-mono text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))] rounded border border-[hsl(var(--border))]">
            {label}
        </span>
    );
}
