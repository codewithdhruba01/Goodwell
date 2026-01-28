"use client";

import { useTodoStore } from "@/store/todo-store";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export function PieChartComponent() {
    const { todos } = useTodoStore();

    const active = todos.filter(t => !t.completed).length;
    const completed = todos.filter(t => t.completed).length;

    const data = [
        { name: "Active", value: active, color: "#3b82f6" }, // Blue-500
        { name: "Completed", value: completed, color: "#22c55e" }, // Green-500
    ];

    // Handle empty state
    if (active === 0 && completed === 0) {
        data.push({ name: "No Data", value: 1, color: "#3f3f46" }); // Zinc-700
    }

    return (
        <div className="bg-[#1E1E1E] p-6 rounded-3xl flex flex-col items-center justify-center min-h-[300px]">
            <h3 className="text-zinc-400 text-sm font-medium mb-4 uppercase tracking-wider">Status Overview</h3>
            <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#27272a', borderRadius: '8px', border: 'none', color: '#f4f4f5' }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            formatter={(value) => <span className="text-zinc-400 text-sm font-medium ml-1">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
