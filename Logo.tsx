import { Activity } from "lucide-react";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = size === "lg" ? "h-12 w-12" : size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const text = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-xl";
  return (
    <div className="flex items-center gap-2.5">
      <div className={`${dims} gradient-primary rounded-xl flex items-center justify-center shadow-elevated`}>
        <Activity className="text-primary-foreground" strokeWidth={2.5} />
      </div>
      <span className={`${text} font-display font-bold tracking-tight`}>
        Fit<span className="text-primary">Track</span>
      </span>
    </div>
  );
}
