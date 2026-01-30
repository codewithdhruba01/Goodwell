"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CalendarSidebar } from "@/components/calendar/calendar-sidebar";

export default function FilesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <CalendarSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
