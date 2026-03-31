"use client";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  filters: string[];
}

export default function FilterBar({ activeFilter, onFilterChange, filters }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`text-[11px] px-4 py-2 tracking-[0.08em] uppercase transition-all duration-200 font-mono rounded-[3px] ${
            activeFilter === filter
              ? "bg-accent text-background"
              : "border border-border2 text-fg3 hover:border-accent hover:text-fg"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
