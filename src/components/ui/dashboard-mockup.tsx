"use client";

import { cn } from "@/lib/utils";

const TABS = ["Analytics", "Products", "Customers", "Campaigns", "Settings"];
const SIDEBAR_ITEMS = ["Dashboard", "Reports", "Users", "Inventory", "Finance", "Messages"];

export function DashboardMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface overflow-hidden",
        className
      )}
    >
      {/* ─── Browser chrome bar ─── */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface border-b border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 mx-3">
          <div className="h-6 rounded-md bg-surface-elevated flex items-center px-3">
            <span className="text-[10px] text-muted/50 font-mono">https://app.raabyt.com/dashboard</span>
          </div>
        </div>
      </div>

      {/* ─── App body ─── */}
      <div className="flex min-h-[280px] md:min-h-[360px]">
        {/* Sidebar */}
        <div className="hidden sm:flex flex-col w-40 shrink-0 border-r border-border bg-surface px-3 py-4">
          <div className="flex items-center gap-2 px-2 mb-5">
            <div className="w-5 h-5 rounded gradient-brand" />
            <span className="text-xs font-semibold text-foreground">Raabyt</span>
          </div>
          <div className="space-y-0.5">
            {SIDEBAR_ITEMS.map((item, i) => (
              <div
                key={item}
                className={cn(
                  "flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px]",
                  i === 0 ? "bg-brand-purple/10 text-brand-purple font-medium" : "text-muted/50"
                )}
              >
                <div className={cn("w-3 h-3 rounded", i === 0 ? "bg-brand-purple/30" : "bg-white/5")} />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4">
          {/* Tabs */}
          <div className="flex items-center gap-1 mb-4 border-b border-border pb-2">
            {TABS.map((tab, i) => (
              <div
                key={tab}
                className={cn(
                  "px-2.5 py-1 rounded-md text-[11px] font-medium",
                  i === 0 ? "bg-brand-purple/10 text-brand-purple" : "text-muted/35"
                )}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-2.5 mb-4">
            {[
              { label: "Revenue", value: "$1.2M", change: "+12.5%" },
              { label: "Users", value: "8,429", change: "+4.2%" },
              { label: "Orders", value: "1,847", change: "+8.1%" },
              { label: "Uptime", value: "99.9%", change: "+0.1%" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-surface-elevated p-2.5 border border-border/50">
                <p className="text-[9px] text-muted/40 mb-0.5">{stat.label}</p>
                <p className="text-xs font-bold text-foreground">{stat.value}</p>
                <p className="text-[9px] text-emerald-400 mt-0.5">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Chart + sidebar */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="col-span-2 rounded-lg bg-surface-elevated border border-border/50 p-3 h-28 md:h-36 flex flex-col justify-end">
              <div className="flex items-end gap-1 h-full">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 50].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t"
                    style={{
                      height: `${h}%`,
                      background: i >= 9
                        ? "linear-gradient(to top, var(--color-brand-purple), var(--color-brand-magenta))"
                        : "rgba(139, 92, 246, 0.12)",
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-surface-elevated border border-border/50 p-2.5 flex flex-col gap-2">
              <p className="text-[9px] text-muted/40">Recent Activity</p>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-brand-purple/10 shrink-0" />
                  <div className="flex-1">
                    <div className="h-1.5 rounded bg-white/5 w-full" />
                    <div className="h-1 rounded bg-white/[0.03] w-3/4 mt-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
