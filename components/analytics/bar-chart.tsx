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

    return (
        <div className="bg-[#1E1E1E] p-6 rounded-3xl flex flex-col min-h-[300px] col-span-1">
            <h3 className="text-zinc-400 text-sm font-medium mb-6 uppercase tracking-wider">Weekly Activity</h3>
            <div className="w-full h-[250px] -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#71717a"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#71717a"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#27272a', borderRadius: '8px', border: 'none', color: '#f4f4f5' }}
                            cursor={{ fill: '#2a2a2a' }}
                        />
                        <Bar dataKey="added" fill="#3b82f6" radius={[4, 4, 0, 0]} stackId="a" name="Added" />
                        <Bar dataKey="completed" fill="#8b5cf6" radius={[4, 4, 0, 0]} stackId="a" name="Completed" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
