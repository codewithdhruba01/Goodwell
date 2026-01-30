"use client";

import { AppHeader } from "@/components/app-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CalendarSidebar } from "@/components/calendar/calendar-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search01Icon,
    GridViewIcon,
    FilterHorizontalIcon,
    Upload02Icon,
    Image01Icon,
    File02Icon,
    MoreVerticalIcon,
    FavouriteIcon,
    ArrowLeft01Icon,
    Link01Icon,
    Home01Icon,
    ArrowRight01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function FolderPage() {
    const params = useParams();
    // Decode folder name if needed, or just use it roughly title-cased
    const folderName = typeof params.folder === 'string'
        ? params.folder.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : "Folder";

    return (
        <SidebarProvider>
            <CalendarSidebar />
            <SidebarInset>
                <div className="flex flex-col h-svh overflow-hidden bg-zinc-950 text-zinc-100 font-sans">
                    {/* Header - Full Width */}
                    <AppHeader
                        showNotifications={false}
                        showSignIn={false}
                        className="py-5 md:py-5"
                        breadcrumbs={
                            <div className="flex items-center gap-1.5 text-zinc-400 text-sm font-medium">
                                <Link href="/files" className="flex items-center gap-1.5 hover:text-zinc-100 transition-colors">
                                    <HugeiconsIcon icon={Home01Icon} className="size-4" />
                                    <span>My Files</span>
                                </Link>
                                <HugeiconsIcon icon={ArrowRight01Icon} className="size-3 text-zinc-600" />
                                <span className="text-zinc-100">{folderName}</span>
                            </div>
                        }
                    >
                        <div className="flex items-center gap-4">
                            <div className="relative hidden md:block group">
                                <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
                                <Input
                                    placeholder={`Search in ${folderName}...`}
                                    className="pl-9 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 w-64 focus-visible:ring-zinc-700 h-9 transition-colors group-hover:border-zinc-700"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1 gap-1">
                                <Button variant="ghost" size="icon" className="size-7 rounded-md hover:bg-zinc-800 text-zinc-100 bg-zinc-800">
                                    <HugeiconsIcon icon={GridViewIcon} className="size-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="size-7 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100">
                                    <HugeiconsIcon icon={FilterHorizontalIcon} className="size-4" />
                                </Button>
                            </div>
                            <Button size="sm" className="hidden md:flex gap-2">
                                <HugeiconsIcon icon={Upload02Icon} className="size-4" />
                                Upload
                            </Button>
                        </div>
                    </AppHeader>

                    {/* Main Container */}
                    <div className="flex flex-1 overflow-hidden">
                        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto p-6 md:p-8 space-y-8">

                            {/* Page Title */}
                            <div className="px-1">
                                <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">{folderName}</h1>
                            </div>

                            {/* Files Table matching Screenshot */}
                            <section>
                                <div className="bg-zinc-950 rounded-xl overflow-hidden">
                                    {/* Table Header */}
                                    <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 p-4 text-xs font-medium text-zinc-500 border-b border-zinc-800/50">
                                        <div className="w-8"></div> {/* Icon column */}
                                        <div>Name</div>
                                        <div className="w-24">Size</div>
                                        <div className="w-32">Modified</div>
                                        <div className="w-32">Created</div>
                                        <div className="w-8"></div> {/* Heart */}
                                        <div className="w-8"></div> {/* More */}
                                    </div>

                                    {/* Table Body */}
                                    <div className="divide-y divide-zinc-800/20">
                                        <FileRow
                                            name="Dashboard Mockup.fig"
                                            size="12.4 MB"
                                            modified="2 hours ago"
                                            created="Dec 15, 2024"
                                            icon={Image01Icon}
                                            isLiked={true}
                                        />
                                        <FileRow
                                            name="UI Components.sketch"
                                            size="34.5 MB"
                                            modified="4 days ago"
                                            created="Dec 5, 2024"
                                            icon={Image01Icon}
                                            isLiked={true}
                                        />
                                        <FileRow
                                            name="App Icon.png"
                                            size="1.2 MB"
                                            modified="6 days ago"
                                            created="Dec 3, 2024"
                                            icon={Image01Icon}
                                            isLiked={true}
                                        />
                                        <FileRow
                                            name="Logo Design.ai"
                                            size="18.2 MB"
                                            modified="4 hours ago"
                                            created="Dec 22, 2024"
                                            icon={Image01Icon}
                                            isLiked={true}
                                        />
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

function FileRow({ name, size, modified, created, icon: Icon, isLiked }: any) {
    return (
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 p-4 items-center hover:bg-zinc-900/50 transition-colors group cursor-pointer">
            <div className="w-8 flex justify-center">
                <HugeiconsIcon icon={Icon} className="size-5 text-purple-500" />
            </div>
            <div className="flex items-center gap-2 min-w-0">
                <span className="font-medium text-sm text-zinc-200 truncate">{name}</span>
                <HugeiconsIcon icon={Link01Icon} className="size-3 text-zinc-600" />
            </div>
            <div className="w-24 text-sm text-zinc-500">{size}</div>
            <div className="w-32 text-sm text-zinc-500">{modified}</div>
            <div className="w-32 text-sm text-zinc-500">{created}</div>
            <div className="w-8 flex justify-center">
                <button className={cn("transition-colors", isLiked ? "text-yellow-500" : "text-zinc-600 hover:text-zinc-400")}>
                    <HugeiconsIcon icon={FavouriteIcon} className="size-4" />
                </button>
            </div>
            <div className="w-8 flex justify-center">
                <button className="text-zinc-500 hover:text-zinc-300">
                    <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
                </button>
            </div>
        </div>
    );
}
