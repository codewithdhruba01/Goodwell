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

    return (
        <div className="bg-[#1E1E1E] p-6 rounded-3xl flex flex-col min-h-[300px] col-span-1">
            <h3 className="text-zinc-400 text-sm font-medium mb-6 uppercase tracking-wider">Productivity Trends</h3>
            <div className="w-full h-[300px] -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <defs>
                            <linearGradient id="colorSeries1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
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
                            contentStyle={{
                                backgroundColor: '#18181b',
                                borderRadius: '12px',
                                border: '1px solid #27272a',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                color: '#f4f4f5'
                            }}
                            itemStyle={{ fontSize: '12px' }}
                            labelStyle={{ color: '#a1a1aa', marginBottom: '4px' }}
                        />
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
