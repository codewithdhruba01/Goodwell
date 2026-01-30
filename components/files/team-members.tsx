import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface TeamMember {
    id: string;
    name: string;
    gradient: string;
}

interface TeamMembersProps {
    members: TeamMember[];
    onAddMember: () => void;
}

export function TeamMembers({ members, onAddMember }: TeamMembersProps) {
    return (
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-semibold text-foreground">Team Members</h3>
                <span className="text-xs font-medium text-muted-foreground">{members.length} people</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                    {members.length === 0 ? (
                        <div className="size-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs text-muted-foreground">
                            0
                        </div>
                    ) : (
                        <>
                            {members.slice(0, 4).map((member) => (
                                <Tooltip key={member.id}>
                                    <TooltipTrigger>
                                        <div className={cn("size-10 rounded-full border-2 border-background cursor-pointer shadow-sm transition-transform hover:scale-105 hover:z-10", member.gradient)} />
                                    </TooltipTrigger>
                                    <TooltipContent>{member.name}</TooltipContent>
                                </Tooltip>
                            ))}
                            {members.length > 4 && (
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="size-10 rounded-full border-2 border-background bg-zinc-800 text-zinc-400 flex items-center justify-center text-xs font-semibold cursor-pointer shadow-sm z-0">
                                            +{members.length - 4}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>And {members.length - 4} more</TooltipContent>
                                </Tooltip>
                            )}
                        </>
                    )}
                </div>
                <button
                    onClick={onAddMember}
                    className="size-10 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 border-2 border-transparent hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-zinc-200 transition-all active:scale-95 cursor-pointer"
                >
                    <HugeiconsIcon icon={Add01Icon} className="size-5" />
                </button>
            </div>
        </div>
    );
}
