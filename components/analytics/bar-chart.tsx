"use client";

import { useTodoStore } from "@/store/todo-store";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export function BarChartComponent() {
    const { todos } = useTodoStore();

    // Calculate last 7 days
    const data = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i)); // Go back 6 days to today

        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const dateString = date.toLocaleDateString();

        // Count added and completed for this specific day
        const added = todos.filter(t => new Date(t.createdAt).toLocaleDateString() === dateString).length;
        const completed = todos.filter(t => t.completed && t.completedAt && new Date(t.completedAt).toLocaleDateString() === dateString).length;

        return {
            name: dayName,
            added,
            completed
        };
    });

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-popover border border-border p-2 rounded-lg shadow-md outline-none">
                    <p className="text-popover-foreground text-sm font-medium mb-1">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-xs" style={{ color: entry.fill }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-card border border-border p-6 rounded-3xl flex flex-col min-h-[300px] col-span-1 shadow-sm">
            <h3 className="text-muted-foreground text-sm font-medium mb-6 uppercase tracking-wider">Weekly Activity</h3>
            <div className="w-full h-[250px] -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#88888820" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                        <Bar dataKey="added" fill="#3b82f6" radius={[4, 4, 0, 0]} stackId="a" name="Added" />
                        <Bar dataKey="completed" fill="#8b5cf6" radius={[4, 4, 0, 0]} stackId="a" name="Completed" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
