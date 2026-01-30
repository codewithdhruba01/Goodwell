import { cn } from "@/lib/utils";
import Link from "next/link";

export function StorageOverview() {
    return (
        <div className="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-semibold text-card-foreground">Storage Overview</h3>
                <Link href="/plans" className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors">Upgrade</Link>
            </div>
            <div className="space-y-4">
                <div className="h-2.5 w-full bg-muted/50 rounded-full overflow-hidden flex">
                    <div className="h-full bg-purple-500 w-[27%]" />
                    <div className="h-full bg-pink-500 w-[36%]" />
                    <div className="h-full bg-orange-500 w-[17%]" />
                    <div className="h-full bg-emerald-500 w-[13%]" />
                    <div className="h-full bg-muted-foreground/30 w-[7%]" />
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground text-[13px]">8.9 GB of 15 GB used</span>
                    <span className="font-bold text-card-foreground text-[15px]">59%</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <LegendItem label="Images" size="2.4 GB" color="bg-purple-500" />
                <LegendItem label="Videos" size="3.2 GB" color="bg-pink-500" />
                <LegendItem label="Documents" size="1.5 GB" color="bg-orange-500" />
                <LegendItem label="Archives" size="1.2 GB" color="bg-emerald-500" />
                <LegendItem label="Other" size="0.6 GB" color="bg-muted-foreground/30" />
            </div>
        </div>
    );
}

function LegendItem({ label, size, color }: { label: string; size: string; color: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className={`size-2 rounded-full ${color}`} />
            <div className="flex flex-col">
                <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
                <span className="text-xs font-semibold text-card-foreground">{size}</span>
            </div>
        </div>
    );
}
