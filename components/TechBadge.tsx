export default function TechBadge({ label }: { label: string }) {
  return (
    <span className="text-[10px] font-mono px-[9px] py-[3px] border border-border2 text-fg3 tracking-[0.06em] uppercase">
      {label}
    </span>
  );
}
