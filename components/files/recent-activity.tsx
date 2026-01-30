import { HugeiconsIcon } from "@hugeicons/react";
import {
    Image01Icon,
    File02Icon,
    Folder01Icon,
} from "@hugeicons/core-free-icons";

// Mock Data for Recent Activity
const ACTIVITY_ITEMS = [
    { user: "Sarah W.", action: "Uploaded 3 files", time: "2m ago", icon: File02Icon, color: "text-blue-500", bg: "bg-blue-500/10" },
    { user: "Mike J.", action: "Created new folder", time: "15m ago", icon: Folder01Icon, color: "text-purple-500", bg: "bg-purple-500/10" },
    { user: "Anna K.", action: "Commented on design", time: "1h ago", icon: Image01Icon, color: "text-pink-500", bg: "bg-pink-500/10" },
    { user: "Tom H.", action: "Shared document", time: "2h ago", icon: File02Icon, color: "text-orange-500", bg: "bg-orange-500/10" },
    { user: "Sarah W.", action: "Uploaded 3 files", time: "2m ago", icon: File02Icon, color: "text-blue-500", bg: "bg-blue-500/10" },
    { user: "Mike J.", action: "Created new folder", time: "15m ago", icon: Folder01Icon, color: "text-purple-500", bg: "bg-purple-500/10" },
];


export function RecentActivity() {
    return (
        <div className="bg-card border border-border rounded-2xl p-4 space-y-4 shadow-sm flex-1">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-semibold text-card-foreground">Recent Activity</h3>
                <button className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">View All</button>
            </div>
            {/* List */}
            <div className="space-y-1">
                {ACTIVITY_ITEMS.map((item, i) => (
                    <ActivityItem key={i} {...item} />
                ))}
            </div>
        </div>
    );
}

function ActivityItem({ user, action, time, icon: Icon, color, bg }: any) {
    return (
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer">
            <div className={`size-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                <HugeiconsIcon icon={Icon} className={`size-4 ${color}`} />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-card-foreground truncate">
                    <span className="font-semibold text-foreground">{user}</span> {action}
                </p>
                <p className="text-[10px] text-muted-foreground">{time}</p>
            </div>
        </div>
    );
}
