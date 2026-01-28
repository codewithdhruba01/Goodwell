"use client";

import { useTodoStore } from "@/store/todo-store";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";

export function LineChartComponent() {
    const { todos } = useTodoStore();

    // Calculate monthly stats for the current year
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentYear = new Date().getFullYear();

    const data = months.map((month, index) => {
        const createdCount = todos.filter(t => {
            const date = new Date(t.createdAt);
            return date.getMonth() === index && date.getFullYear() === currentYear;
        }).length;

        const completedCount = todos.filter(t => {
            if (!t.completed || !t.completedAt) return false;
            const date = new Date(t.completedAt);
            return date.getMonth() === index && date.getFullYear() === currentYear;
        }).length;

        return {
            name: month,
            created: createdCount,
            completed: completedCount,
        };
    });

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-popover border border-border p-3 rounded-xl shadow-lg outline-none">
                    <p className="text-muted-foreground text-xs mb-1">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 mb-0.5">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.stroke }}></div>
                            <span className="text-popover-foreground text-sm font-medium">
                                {entry.name}: {entry.value}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-card border border-border p-6 rounded-3xl flex flex-col min-h-[300px] col-span-1 shadow-sm">
            <h3 className="text-muted-foreground text-sm font-medium mb-6 uppercase tracking-wider">Productivity Trends</h3>
            <div className="w-full h-[300px] -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <defs>
                            <linearGradient id="colorSeries1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
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
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="created"
                            name="Created"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, fill: "#fff", stroke: "#8b5cf6", strokeWidth: 2 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="completed"
                            name="Completed"
                            stroke="#22c55e"
                            strokeWidth={3}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
